# Builds hub/ru.js (the Russian help) and hub/niqqud.js (the lessons' Hebrew with niqqud) from the translation files
# in setup/ru/. Run after a lesson changes: python setup/make-ru.py
# Niqqud needs the free DictaBERT model (dicta-il/dictabert-large-char-menaked) on this computer; with --no-niqqud the
# old niqqud.js stays as it is.
import json, os, re, subprocess, sys
sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
HUB = os.path.join(HERE, '..', 'hub')
RU = os.path.join(HERE, 'ru')
load = lambda f: json.load(open(os.path.join(RU, f), encoding='utf-8'))

# The interface: every Hebrew string en.js translates, through its English, into Russian; then the new ones.
pairs = load('ui_keys.json')            # [[hebrew, english], ...] from en.js
en_list, ru_list = load('ui_en.json'), load('ui_ru.json')
assert len(en_list) == len(ru_list), (len(en_list), len(ru_list))
by_en = dict(zip(en_list, ru_list))
D = {he: by_en[en] for he, en in pairs if en in by_en}
D.update({"נפוצים": "Популярные", "רגיל": "Обычный"})   # one English word, two meanings
for he, en, r in load('ui_new.json'): D[he] = r

S = {}
for f in sorted(os.listdir(RU)):
    if f.startswith('lessons'): S.update(load(f))
B = load('blocks.json')

tpl = open(os.path.join(RU, 'ru_template.js'), encoding='utf-8').read()
js = tpl.replace('__D__', json.dumps(D, ensure_ascii=False, indent=0)).replace('__S__', json.dumps(S, ensure_ascii=False, indent=0)).replace('__B__', json.dumps(B, ensure_ascii=False))
open(os.path.join(HUB, 'ru.js'), 'w', encoding='utf-8', newline='\n').write(js)
print('ru.js:', len(D), 'interface strings,', len(S), 'lesson strings')
