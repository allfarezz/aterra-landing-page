(function(){
  const cfg=window.ATERRA_CONFIG;
  const wa=window.AterraWhatsApp;

  // Centralized links
  document.querySelectorAll('.js-order-link').forEach(a=>a.href=cfg.links.order || '#form-order');
  document.querySelectorAll('.js-promo-link').forEach(a=>a.href=cfg.links.promo || '#form-order');
  ['instagram','tiktok','shopee','tokopedia'].forEach(key=>{
    const el=document.querySelector(`[data-link="${key}"]`);
    const href=cfg.links[key];
    if(el && href){
      const a=document.createElement('a'); a.className='social-link'; a.dataset.link=key; a.href=href; a.target='_blank'; a.rel='noopener noreferrer';
      while(el.firstChild)a.appendChild(el.firstChild); el.replaceWith(a);
    }
  });

  // Scroll reveal
  const animated=[...document.querySelectorAll('.reveal-text,.reveal-card,.reveal-media')];
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -6%'});
    animated.forEach(el=>io.observe(el));
  } else animated.forEach(el=>el.classList.add('is-visible'));

  // FAQ
  document.querySelectorAll('.faq-trigger').forEach(btn=>btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item'); const open=item.classList.toggle('open'); btn.setAttribute('aria-expanded',String(open));
  }));

  // Video
const video = document.getElementById('sealVideo');
const play = document.getElementById('videoPlay');

if (video && play) {

  video.controls = false;

  // Klik tombol play
  play.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    video.play();
  });

  // Saat video mulai → tombol hilang total
  video.addEventListener('play', () => {
    play.style.display = 'none';
  });

  // Klik video → pause / play
  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  // Saat pause → tombol muncul lagi
  video.addEventListener('pause', () => {
    if (!video.ended) {
      play.style.display = 'grid';
    }
  });

  // Saat selesai → balik ke awal + tombol muncul
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    play.style.display = 'grid';
  });

}

  // Quantity + total
  let qty=1; const min=1,max=99;
  const qtyOut=document.getElementById('qtyValue'), totalOut=document.getElementById('totalValue');
  const sync=()=>{qtyOut.textContent=qty;totalOut.textContent=wa.formatIDR(cfg.movaPrice*qty);document.getElementById('qtyMinus').disabled=qty<=min;document.getElementById('qtyPlus').disabled=qty>=max};
  document.getElementById('qtyMinus')?.addEventListener('click',()=>{qty=Math.max(min,qty-1);sync()});
  document.getElementById('qtyPlus')?.addEventListener('click',()=>{qty=Math.min(max,qty+1);sync()}); sync();

  // WhatsApp order form
  document.getElementById('orderForm')?.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('customerName').value.trim();
    const phone=document.getElementById('customerPhone').value.trim();
    const address=document.getElementById('shippingAddress').value.trim();
    const error=document.getElementById('formError');
    if(!name || !phone || !address){error.textContent='Lengkapi nama, no. WhatsApp, dan alamat pengiriman terlebih dahulu.';return}
    error.textContent='';
    const message=wa.buildMessage({name,phone,address,quantity:qty,total:cfg.movaPrice*qty,refill:document.getElementById('refillOption').checked,alta:document.getElementById('altaOption').checked});
    window.open(wa.link(message),'_blank','noopener,noreferrer');
  });
})();
