



    const stickyHeader=document.querySelector('.site-header');
    function updateHeaderBackground(){stickyHeader.classList.toggle('is-scrolled',window.scrollY>12);}
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
  