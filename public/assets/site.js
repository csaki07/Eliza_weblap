



    const stickyHeader=document.querySelector('.site-header');
    let headerScrolled;
    function updateHeaderBackground(){const next=window.scrollY>12;if(next!==headerScrolled){headerScrolled=next;stickyHeader.classList.toggle('is-scrolled',next);}}
    window.addEventListener('scroll',updateHeaderBackground,{passive:true});
    updateHeaderBackground();
    const menuButton=document.querySelector('.menu-toggle');
    const mobileMenu=document.getElementById('mobile-menu');
    function closeMenu(){mobileMenu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.querySelector('.menu-label').textContent='Menü';}
    menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';mobileMenu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.querySelector('.menu-label').textContent=open?'Bezárás':'Menü';});
    mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileMenu.hidden){closeMenu();menuButton.focus();}});
    window.matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
    document.querySelectorAll('.treatment-choice').forEach(link=>link.addEventListener('click',()=>{const field=document.getElementById('appointment-message');if(field&&!field.value.trim())field.value='A következő kezelésről szeretnék egyeztetni: '+link.dataset.treatment+'.';}));
    function setupDemoForm(formId,statusId,message){const form=document.getElementById(formId);const status=document.getElementById(statusId);if(!form||!status)return;form.addEventListener('input',()=>{status.textContent='';form.querySelectorAll('input[type=text],textarea').forEach(field=>field.setCustomValidity(''));});form.addEventListener('submit',event=>{event.preventDefault();const fields=[...form.querySelectorAll('input[type=text],textarea')];fields.forEach(field=>{const minimum=field.minLength>0?field.minLength:1;field.setCustomValidity(field.value.trim().length<minimum?'Kérlek, legalább '+minimum+' karaktert adj meg; a szóközök önmagukban nem elegendők.':'');});if(!form.reportValidity())return;status.textContent=message;});}
    setupDemoForm('appointment-form','appointment-status','A bemutató ellenőrzése rendben. Az üzenet nem lett elküldve, és nem jött létre időpontkérés. Az adatok csak ezen az oldalon láthatók.');
    setupDemoForm('newsletter-form','newsletter-status','A bemutató ellenőrzése rendben. Nem történt feliratkozás vagy adatküldés. Az Arcápolási Kisokos még készül, ezért letöltés sem indult.');
  
// A számlálás egyszer indul, amikor a kártyák láthatóvá válnak.
(() => {
  const grid = document.querySelector('#eliza .salon-number-grid');
  if (!grid || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    const counters = [...grid.querySelectorAll('dd')].map(element => {
      const final = element.textContent.trim();
      const span = document.createElement('span');
      span.setAttribute('aria-hidden', 'true');
      span.textContent = '0+';
      element.setAttribute('aria-label', final);
      element.replaceChildren(span);
      return { span, target: Number(final.replace(/\D/g, '')), final };
    });
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counters.forEach(({ span, target, final }) => { span.textContent = progress === 1 ? final : Math.floor(target * eased) + '+'; });
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }, { threshold: 0.5 });
  observer.observe(grid);
})();

// Finom, egyszeri megjelenés; a tartalom JavaScript nélkül is látható marad.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const active = new Map();
  const selector = '#folyamat .steps li, .page-kezelesek #kezelesvalaszto .feature-grid article, .page-kezelesek #tovabbi-kezelesek .feature-grid article, .page-rolunk #ertekek .feature-grid article';
  const targets = [...document.querySelectorAll(selector)];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (preference.matches) return;
      const siblings = [...entry.target.parentElement.children].filter(element => targets.includes(element));
      const delay = siblings.length > 1 ? Math.min(siblings.indexOf(entry.target), 3) * 140 : 0;
      const animation = entry.target.animate([
        { opacity: 0, transform: 'translateY(28px) scale(.985)', filter: 'blur(6px)' },
        { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0)' }
      ], { duration: 1200, delay, easing: 'cubic-bezier(.16,1,.3,1)', iterations: 1, fill: 'backwards' });
      active.set(entry.target, animation);
      animation.onfinish = () => active.delete(entry.target);
    });
  }, { threshold: 0.08 });
  // Egy belépő animáció ne ismétlődjön egymásba ágyazott elemeken.
  const textTargets = targets.filter(element => element.tagName !== 'IMG' && !element.querySelector('img'));
  textTargets.filter(element => !textTargets.some(parent => parent !== element && parent.contains(element))).forEach(element => observer.observe(element));
  document.addEventListener('focusin', event => {
    active.forEach((animation, element) => { if (element.contains(event.target)) { animation.cancel(); active.delete(element); } });
  });
  preference.addEventListener('change', event => {
    if (event.matches) { observer.disconnect(); active.forEach(animation => animation.cancel()); active.clear(); }
  });
})();
