from pathlib import Path
import re,json,html,sys
from xml.sax.saxutils import escape
root=Path(__file__).resolve().parent.parent
base=(sys.argv[1] if len(sys.argv)>1 else 'https://elizahomework.netlify.app/').rstrip('/')+'/'
assert base.startswith('https://'), 'HTTPS site URL required'
pages={
'index.html':('Kozmetika Budapesten | Eliza Beauty Salon','Személyre szabott arckezelések Sipos Eliza mesterkozmetikussal Budapesten. Bőrfiatalítás, hidratálás és nyugodt énidő, előre egyeztetett időpontban.'),
'kezelesek.html':('Arckezelések és csomagok | Eliza Beauty Salon Budapest','Belico és Mesotica arckezelések, mélyhidratálás, bőrfiatalítás és anti-akné ápolás Budapesten. Ismerd meg a kezeléseket és az öt alkalmas csomagokat.'),
'rolunk.html':('Sipos Eliza mesterkozmetikus | Eliza Beauty Salon','Ismerd meg Sipos Eliza mesterkozmetikust és az Eliza Beauty Salon történetét. Szakértelem, személyes figyelem és a bőröd igényeire hangolt gondoskodás.'),
'kapcsolat.html':('Kapcsolat és időpontkérés | Eliza Beauty Salon Budapest','Eliza Beauty Salon: 1092 Budapest, Ráday utca 1. Nyitvatartás hétfőtől péntekig 9–16 óráig, előzetes egyeztetéssel. Elérhetőségek és gyakori kérdések.'),
'adatkezeles.html':('Adatkezelési információk | Eliza Beauty Salon','Tájékoztatás az Eliza Beauty Salon bemutató weboldalának űrlapjairól és külső betűkészleteiről. A végleges adatkezelési tájékoztató előkészületben.')}
business={'@context':'https://schema.org','@type':'BeautySalon','@id':base+'#vallalkozas','name':'Eliza Beauty Salon','url':base,'image':base+'images/og-eliza.jpg','logo':base+'images/logo.svg','description':'Személyre szabott kozmetikai arckezelések Sipos Eliza mesterkozmetikussal, előre egyeztetett időpontban.','address':{'@type':'PostalAddress','streetAddress':'Ráday utca 1.','postalCode':'1092','addressLocality':'Budapest','addressCountry':'HU'},'openingHoursSpecification':[{'@type':'OpeningHoursSpecification','dayOfWeek':['https://schema.org/'+d for d in ['Monday','Tuesday','Wednesday','Thursday','Friday']],'opens':'09:00','closes':'16:00'}],'areaServed':{'@type':'City','name':'Budapest'},'hasOfferCatalog':{'@type':'OfferCatalog','name':'Kozmetikai kezelések','itemListElement':[{'@type':'OfferCatalog','name':name} for name in ['Belico arckezelések','Mesotica kezelések','Anti-akné ápolás']]}}
for file,(title,desc) in pages.items():
 p=root/'public'/file;s=p.read_text(encoding='utf-8');url=base+('' if file=='index.html' else file)
 s=re.sub(r'<title>.*?</title>','<title>'+html.escape(title)+'</title>',s,count=1)
 s=re.sub(r'<meta name="description" content="[^"]*">','<meta name="description" content="'+html.escape(desc,quote=True)+'">',s,count=1)
 # Idempotent block for future domain updates.
 s=re.sub(r'\n?<!-- SEO:START -->.*?<!-- SEO:END -->\n?','',s,flags=re.S)
 tags=[f'<link rel="canonical" href="{url}">','<meta name="theme-color" content="#8E4A5A">']
 for key,value in {'og:type':'website','og:locale':'hu_HU','og:site_name':'Eliza Beauty Salon','og:title':title,'og:description':desc,'og:url':url,'og:image':base+'images/og-eliza.jpg','og:image:type':'image/jpeg','og:image:width':'1200','og:image:height':'630','og:image:alt':'Eliza Beauty Salon – Bőrödnek törődés. Neked énidő. Sipos Eliza portréjával.'}.items():tags.append(f'<meta property="{key}" content="{html.escape(value,quote=True)}">')
 for key,value in {'twitter:card':'summary_large_image','twitter:title':title,'twitter:description':desc,'twitter:image':base+'images/og-eliza.jpg','twitter:image:alt':'Eliza Beauty Salon, Sipos Eliza mesterkozmetikus'}.items():tags.append(f'<meta name="{key}" content="{html.escape(value,quote=True)}">')
 tags.append('<script type="application/ld+json">'+json.dumps(business,ensure_ascii=False,indent=2)+'</script>')
 if file=='rolunk.html':
  person={'@context':'https://schema.org','@type':'Person','@id':base+'rolunk.html#sipos-eliza','name':'Sipos Eliza','jobTitle':'Mesterkozmetikus','url':base+'rolunk.html','image':base+'images/nyugalom/eliza.webp','worksFor':{'@id':base+'#vallalkozas'}}
  tags.append('<script type="application/ld+json">'+json.dumps(person,ensure_ascii=False,indent=2)+'</script>')
 faq=re.search(r'<section[^>]*id="gyik".*?</section>',s,re.S)
 if faq:
  def plain(text):return re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',text))).strip()
  questions=[]
  for item in re.findall(r'<details>(.*?)</details>',faq.group(),re.S):
   question=re.search(r'<summary>(.*?)</summary>',item,re.S).group(1)
   answer=re.search(r'</summary>(.*?)$',item,re.S).group(1)
   questions.append({'@type':'Question','name':plain(question),'acceptedAnswer':{'@type':'Answer','text':plain(answer)}})
  faq_data={'@context':'https://schema.org','@type':'FAQPage','@id':url+'#gyik','mainEntity':questions}
  tags.append('<script type="application/ld+json">'+json.dumps(faq_data,ensure_ascii=False,indent=2)+'</script>')
 tags.insert(0,'<!-- TODO: a vegleges domain megadasakor frissitsd az URL-eket a .webprojekt/update-seo.py szkripttel; jelenleg a Netlify-cimet hasznaljuk. -->')

 s=s.replace('</head>','\n<!-- SEO:START -->\n'+'\n'.join(tags)+'\n<!-- SEO:END -->\n</head>')
 footer=re.search(r'<footer\b.*?</footer>',s,re.S)
 if footer:s=s[:footer.start()]+footer.group().replace('<h3>','<h2>').replace('</h3>','</h2>')+s[footer.end():]
 p.write_text(s,encoding='utf-8')
sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join('  <url><loc>'+escape(base+('' if file=='index.html' else file))+'</loc></url>\n' for file in pages)+'</urlset>\n'
(root/'public/sitemap.xml').write_text(sitemap,encoding='utf-8')
(root/'public/robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: '+base+'sitemap.xml\n',encoding='utf-8')
css=root/'public/assets/site.css';s=css.read_text(encoding='utf-8');s=s.replace('.footer h3{','.footer h3,.footer h2{');css.write_text(s,encoding='utf-8')
print('SEO updated for '+str(len(pages))+' pages; sitemap, robots, OG card generated.')
