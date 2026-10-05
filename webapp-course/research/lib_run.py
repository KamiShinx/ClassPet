import json, time, yt_dlp, runpy
vs=json.load(open('videos.json',encoding='utf-8'))
for v in vs:
    if v['title'] is None:
        for client in (None,'android'):
            try:
                o={'quiet':True,'no_warnings':True,'skip_download':True}
                if client: o['extractor_args']={'youtube':{'player_client':[client]}}
                with yt_dlp.YoutubeDL(o) as y: i=y.extract_info('https://www.youtube.com/watch?v='+v['id'],download=False)
                v.update(title=i['title'],dur=i.get('duration'),ch=i.get('channel')); break
            except Exception: time.sleep(5)
        print('meta', v['id'], v['title'], flush=True)
json.dump(vs,open('videos.json','w',encoding='utf-8'),indent=1,ensure_ascii=False)
runpy.run_path('fix_run.py', run_name='__main__')
