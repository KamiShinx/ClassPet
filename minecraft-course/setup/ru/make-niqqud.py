# The lessons' Hebrew with niqqud, for the Russian help: hub/niqqud.js. Free and local: DictaBERT
# (dicta-il/dictabert-large-char-menaked from Hugging Face, about 1.2 GB, downloaded once). HTML tags keep as they are.
# Run from anywhere: python setup/ru/make-niqqud.py   (needs node, torch and transformers). Then have the result checked.
import glob, json, os, re, subprocess, sys, unicodedata
sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
from transformers import AutoModel, PreTrainedTokenizerFast
from huggingface_hub import snapshot_download
NAME = 'dicta-il/dictabert-large-char-menaked'
P = snapshot_download(NAME)
# The model's own tokenizer class reads letters as words in new transformers versions; its tokenizer.json is per letter.
tok = PreTrainedTokenizerFast(tokenizer_file=os.path.join(P, 'tokenizer.json'), unk_token='[UNK]', cls_token='[CLS]', sep_token='[SEP]', pad_token='[PAD]', mask_token='[MASK]')
tok.model_max_length = 2046
model = AutoModel.from_pretrained(NAME, trust_remote_code=True); model.eval()

tmp = os.path.join(HERE, 'strings.tmp.json')
subprocess.run(['node', os.path.join(HERE, 'extract-strings.js'), tmp], check=True)
texts = sorted({x['s'] for x in json.load(open(tmp, encoding='utf-8'))}); os.remove(tmp)
parts = [seg for s in texts for seg in re.split(r'(<[^>]+>)', s) if seg and not seg.startswith('<') and re.search('[\u05d0-\u05ea]', seg)]
parts = list(dict.fromkeys(parts))
done = {}
for i in range(0, len(parts), 16): done.update(zip(parts[i:i+16], model.predict(parts[i:i+16], tok)))
out = {s: unicodedata.normalize('NFC', ''.join(done.get(seg, seg) for seg in re.split(r'(<[^>]+>)', s))) for s in texts}   # NFC: one order for vowel and dagesh
# Minecraft stays unpointed (the model drops its letters and reads the pe as "p"); a prefix keeps its vowel.
HEB = 'א-תְ-ׇ'
P = '[ְ-ׇ]*'
mc = re.compile('(?<![' + HEB + '])((?:[ובלהשכמ]' + P + ')?)' + P.join('מינקרפט') + P + '(?![' + HEB + '])')
out = {k: mc.sub(lambda m: m.group(1) + 'מיינקראפט', v) for k, v in out.items()}
# The reviewers' fixes (setup/ru/niqqud-fixes.json): "all" = [wrong, right] for whole words anywhere, "keys" = only in that text.
fixes = os.path.join(HERE, 'niqqud-fixes.json')
if os.path.exists(fixes):
    fx = json.loads(unicodedata.normalize('NFC', open(fixes, encoding='utf-8').read()))
    # A whole word, also after the one-letter prefixes ו ש מ ב ל כ (וְהֶחֵפֶץ is the same mistake as הֶחֵפֶץ).
    word = lambda w: re.compile('(?<![' + HEB + '])((?:[ושמבלכ]' + P + ')?)' + re.escape(w) + '(?![' + HEB + '])')
    for a, b in fx.get('all', []): out = {k: word(a).sub(lambda m: m.group(1) + b, v) for k, v in out.items()}
    for key, pairs in fx.get('keys', {}).items():
        if key in out:
            for a, b in pairs: out[key] = word(a).sub(lambda m: m.group(1) + b, out[key])
head = "/* The lessons' Hebrew with niqqud, for the Russian help (ru.js). Made by setup/ru/make-niqqud.py with DictaBERT\n   (dicta-il/dictabert-large-char-menaked), then checked by two reviewers. Key = the text as in content.js. */\n"
open(os.path.join(HERE, '..', '..', 'hub', 'niqqud.js'), 'w', encoding='utf-8', newline='\n').write(head + 'window.HUB_NIQ = ' + json.dumps(out, ensure_ascii=False, indent=0) + ';\n')
print(len(out), 'texts')
