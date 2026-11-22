const SITE_NAME = "Переменная облачность";
(function(){
var root=document.documentElement;root.classList.add('js');
var KEY='site-name',name=SITE_NAME;
try{var s=localStorage.getItem(KEY);if(s&&s.trim())name=s.trim()}catch(e){}
var $=function(q){return document.querySelector(q)},$$=function(q){return document.querySelectorAll(q)};
var h1=$('#h1');
function render(n){
  document.title=n;
  $$('[data-name]').forEach(function(e){e.textContent=n});
  h1.textContent='';h1.setAttribute('aria-label',n);
  n.split(/\s+/).forEach(function(w,i){var sp=document.createElement('span');sp.className='l l'+Math.min(i,2);sp.textContent=w;sp.setAttribute('aria-hidden','true');h1.appendChild(sp)});
}
render(name);
var mq=$('#mq');mq.innerHTML+=mq.innerHTML;
var dlg=$('#dlg'),inp=$('#nm'),saved=false;
function open(){saved=false;inp.value=name===SITE_NAME?'':name;root.classList.remove('on');dlg.showModal();inp.focus()}
$('#edit').addEventListener('click',open);
$$('[data-open]').forEach(function(b){b.addEventListener('click',open)});
inp.addEventListener('input',function(){render(inp.value.trim()||SITE_NAME)});
$('#frm').addEventListener('submit',function(){
  var v=inp.value.trim();name=v||SITE_NAME;saved=true;
  try{v?localStorage.setItem(KEY,v):localStorage.removeItem(KEY)}catch(e){}
});
$('#rst').addEventListener('click',function(){inp.value='';$('#frm').requestSubmit();dlg.close()});
$('#cancel').addEventListener('click',function(){dlg.close()});
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
dlg.addEventListener('close',function(){render(name);if(cursorOk)root.classList.add('on')});
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var cursorOk=matchMedia('(hover:hover) and (pointer:fine)').matches&&!reduce;
if(cursorOk){
  root.classList.add('on');
  var dot=$('.dot'),ring=$('.ring'),x=-100,y=-100,rx=-100,ry=-100;
  addEventListener('pointermove',function(e){x=e.clientX;y=e.clientY});
  document.addEventListener('pointerover',function(e){ring.classList.toggle('h',!!e.target.closest('a,button,[data-mag],[data-tilt],.rail'))});
  (function loop(){rx+=(x-rx)*.16;ry+=(y-ry)*.16;
    dot.style.transform='translate3d('+x+'px,'+y+'px,0)';
    ring.style.transform='translate3d('+rx+'px,'+ry+'px,0)';requestAnimationFrame(loop)})();
}
if(!reduce&&matchMedia('(hover:hover)').matches){
  $$('[data-mag]').forEach(function(el){
    el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();
      el.style.transform='translate3d('+(e.clientX-r.left-r.width/2)*.3+'px,'+(e.clientY-r.top-r.height/2)*.3+'px,0)'});
    el.addEventListener('pointerleave',function(){el.style.transform=''});
  });
  $$('[data-tilt]').forEach(function(el){
    el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();
      var px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
      el.style.setProperty('--ry',(px*12)+'deg');el.style.setProperty('--rx',(-py*12)+'deg')});
    el.addEventListener('pointerleave',function(){el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')});
  });
}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.15});
$$('.rv').forEach(function(el,i){el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});
})();
