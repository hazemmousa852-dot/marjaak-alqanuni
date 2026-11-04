(() => {
  'use strict';
  const albums={group:{ar:'صور جماعية',en:'Group photos'},training:{ar:'التدريب وورش العمل',en:'Training and workshops'},certificates:{ar:'الشهادات والتكريم',en:'Certificates and recognition'},people:{ar:'مع المشاركين',en:'With participants'}};
  const cards=[...document.querySelectorAll('[data-photo]')],albumGrid=document.querySelector('#albumGrid'),photoGrid=document.querySelector('#photoGrid'),toolbar=document.querySelector('#albumToolbar'),dialog=document.querySelector('.photo-dialog'),image=document.querySelector('#fullPhoto');
  let activeAlbum=null,currentCard=null,opener=null,touchX=0;
  const language=()=>document.documentElement.lang==='en'?'en':'ar';
  const visibleCards=()=>cards.filter(card=>!card.hidden);
  function updateLabels(){
    const lang=language();
    if(activeAlbum){document.querySelector('#activeAlbumTitle').textContent=albums[activeAlbum][lang];document.querySelector('#galleryCount').textContent=visibleCards().length+(lang==='ar'?' صورة':' photos');}
    if(currentCard&&dialog.open)document.querySelector('.photo-caption').textContent=currentCard.querySelector('span').textContent;
    document.querySelector('[data-prev]').textContent=lang==='ar'?'السابق':'Previous';
    document.querySelector('[data-next]').textContent=lang==='ar'?'التالي':'Next';
    document.querySelector('[data-close]').textContent=lang==='ar'?'إغلاق ×':'Close ×';
    dialog.setAttribute('aria-label',lang==='ar'?'عارض صور الألبوم':'Album photo viewer');
  }
  function renderAlbum(){
    const key=location.hash.replace('#album-','');activeAlbum=Object.hasOwn(albums,key)?key:null;
    albumGrid.hidden=Boolean(activeAlbum);photoGrid.hidden=!activeAlbum;toolbar.hidden=!activeAlbum;document.querySelector('#gallerySummary').hidden=Boolean(activeAlbum);
    cards.forEach(card=>{card.hidden=!activeAlbum||card.dataset.category!==activeAlbum;});
    updateLabels();if(activeAlbum)toolbar.scrollIntoView({block:'start',behavior:'auto'});
  }
  function show(card){currentCard=card;image.src=card.href;image.alt=card.querySelector('img').alt;document.querySelector('.photo-caption').textContent=card.querySelector('span').textContent;document.querySelector('#photoCount').textContent=(visibleCards().indexOf(card)+1)+' / '+visibleCards().length;}
  function move(direction){const list=visibleCards();if(list.length)show(list[(list.indexOf(currentCard)+direction+list.length)%list.length]);}
  cards.forEach(card=>card.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||!dialog.showModal)return;event.preventDefault();opener=card;show(card);dialog.showModal();}));
  document.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
  document.querySelector('[data-prev]').addEventListener('click',()=>move(-1));document.querySelector('[data-next]').addEventListener('click',()=>move(1));
  dialog.addEventListener('close',()=>opener?.focus());
  dialog.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();const next=language()==='ar'?event.key==='ArrowLeft':event.key==='ArrowRight';move(next?1:-1);});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
  image.addEventListener('touchstart',event=>{touchX=event.changedTouches[0].clientX;},{passive:true});image.addEventListener('touchend',event=>{const delta=event.changedTouches[0].clientX-touchX;if(Math.abs(delta)>45)move(delta>0?-1:1);},{passive:true});
  addEventListener('hashchange',renderAlbum);new MutationObserver(updateLabels).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});renderAlbum();
})();
