from pathlib import Path
from PIL import Image,ImageOps
from html.parser import HTMLParser
import re,json
root=Path(__file__).resolve().parent.parent
public=root/'public'
sources={'kezeles':'23 1.jpg','borfiatalitas':'22 1.jpg','hidratalas':'19 1.jpg','borallapot':'28 1.jpg','eliza':'Eliza 2.jpg','arctervezes':'35 1.jpg'}
def variants(stem,shape,ratio,y=.64):
 image=ImageOps.exif_transpose(Image.open(root/'eliza-alapanyag/Új_képek'/sources[stem])).convert('RGB')
 for width in [480,768]:
  size=(width,round(width/ratio));out=ImageOps.fit(image,size,Image.Resampling.LANCZOS,centering=(.5,y))
  out.save(public/'images/nyugalom'/f'{stem}-{shape}-{width}.webp',format='WEBP',quality=78,method=6)
for stem in ['kezeles','borfiatalitas','eliza','borallapot','arctervezes']:variants(stem,'square',1)
for stem in ['borfiatalitas','hidratalas','borallapot']:variants(stem,'card',1.5)
for stem in ['arctervezes','kezeles','hidratalas']:variants(stem,'wide',4/3,.58)
cssfile=public/'assets/site.css';css=cssfile.read_text(encoding='utf-8')
if '/* LOCAL FONTS */' not in css:css='/* LOCAL FONTS */\n'+(root/'.webprojekt/local-fonts.css').read_text(encoding='utf-8')+'\n'+css
cssfile.write_text(css,encoding='utf-8')
inline=re.sub(r'/\*.*?\*/','',css,flags=re.S);inline=re.sub(r'\s+',' ',inline).strip();inline=inline.replace('../fonts/','fonts/')
for p in public.glob('*.html'):
 s=p.read_text(encoding='utf-8')
 s=re.sub(r'<link[^>]*(?:fonts.googleapis.com|fonts.gstatic.com)[^>]*>','',s)
 s=re.sub(r'<style id="site-styles">.*?</style>','',s,flags=re.S)
 s=s.replace('<link rel="stylesheet" href="assets/site.css">','')
 s=re.sub(r'<link[^>]*data-performance-preload[^>]*>','',s)
 preload=''.join(f'<link data-performance-preload rel="preload" href="fonts/{font}-latin.woff2" as="font" type="font/woff2" crossorigin>' for font in ['cormorant-garamond','jost'])
 s=s.replace('</head>',preload+'<style id="site-styles">'+inline+'</style></head>')
 def picture(m,shape,ratio,media,sizes):
  tag=m.group();stem=re.search(r'src="images/nyugalom/([^"/]+)\.webp"',tag).group(1)
  source=f'<source media="{media}" srcset="images/nyugalom/{stem}-{shape}-480.webp 480w, images/nyugalom/{stem}-{shape}-768.webp 768w" sizes="{sizes}" width="768" height="{round(768/ratio)}">'
  return '<picture>'+source+tag+'</picture>'
 # Only wrap once, so rebuilding is safe.
 s=re.sub(r'<picture><source[^>]*>(<img[^>]*>)</picture>',r'\1',s)
 s=re.sub(r'(?<=<figure class="hero-single-photo">)<img[^>]*>',lambda m:picture(m,'square',1,'(max-width:800px)','(max-width:640px) calc(100vw - 40px), calc(100vw - 64px)'),s)
 s=re.sub(r'<img[^>]*class="page-photo[^"]*"[^>]*>',lambda m:picture(m,'wide',4/3,'(max-width:640px)','calc(100vw - 40px)'),s)
 if p.name=='index.html':
  s=re.sub(r'<img[^>]*class="treatment-media"[^>]*>',lambda m:picture(m,'card',1.5,'(max-width:640px)','calc(100vw - 40px)'),s)
  s=re.sub(r'<img[^>]*class="benefit-image"[^>]*>',lambda m:picture(m,'wide',4/3,'(max-width:640px)','calc(100vw - 40px)'),s)
 # Preload exactly the candidate used by the mobile Hero; desktop remains fetchpriority=high.
 hero=re.search(r'<figure class="hero-single-photo">.*?src="images/nyugalom/([^"/]+)\.webp"',s,re.S)
 if hero:
  stem=hero.group(1);pre=f'<link data-performance-preload rel="preload" as="image" type="image/webp" media="(max-width:800px)" imagesrcset="images/nyugalom/{stem}-square-480.webp 480w, images/nyugalom/{stem}-square-768.webp 768w" imagesizes="(max-width:640px) calc(100vw - 40px), calc(100vw - 64px)" fetchpriority="high">'
  s=s.replace('</head>',pre+'</head>')
 p.write_text(s,encoding='utf-8')
# Avoid reading scroll position after changing a layout-affecting class on each event.
p=public/'assets/site.js';s=p.read_text(encoding='utf-8');s=s.replace("function updateHeaderBackground(){stickyHeader.classList.toggle('is-scrolled',window.scrollY>12);}","let headerScrolled;\n    function updateHeaderBackground(){const next=window.scrollY>12;if(next!==headerScrolled){headerScrolled=next;stickyHeader.classList.toggle('is-scrolled',next);}}")
p.write_text(s,encoding='utf-8')
(public/'_headers').write_text('''/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/images/*
  Cache-Control: public, max-age=604800
/assets/*
  Cache-Control: public, max-age=3600, must-revalidate
/*.html
  Cache-Control: public, max-age=0, must-revalidate
''',encoding='utf-8')
print('Local fonts, inline styles, mobile art direction and cache headers ready.')
