from pathlib import Path
import json
from PIL import Image
root=Path(__file__).resolve().parent
cats=json.loads((root/'categories.json').read_text(encoding='utf-8'))
out={}
for cat in cats:
    folder=root/'categories'/cat['slug']
    photos=[]
    for p in sorted(folder.iterdir()):
        if p.suffix.lower() not in {'.jpg','.jpeg','.png','.webp'}: continue
        dest=p.with_suffix('.webp')
        if p.suffix.lower()!='.webp':
            with Image.open(p) as im:
                im=im.convert('RGB'); im.thumbnail((1600,1600),Image.Resampling.LANCZOS)
                im.save(dest,'WEBP',quality=82,method=6)
        if p.suffix.lower() != '.webp':
            p.unlink()
        photos.append({'src':'categories/'+cat['slug']+'/'+dest.name,'title':p.stem.replace('_',' ').replace('-',' ').title()})
    out[cat['slug']]=photos
(root/'gallery-data.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print('Updated gallery-data.json')
