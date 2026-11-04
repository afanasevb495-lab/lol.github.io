(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var sh=$('#shapka');$('#burger').onclick=function(){var o=sh.classList.toggle('open');this.setAttribute('aria-expanded',o)};
$$('#nav a').forEach(function(a){a.onclick=function(){sh.classList.remove('open')}});
addEventListener('scroll',function(){sh.classList.toggle('sdvig',scrollY>4)});
/* Таблица Шульте с таймером */
var set=$('#psSetka'),need=1,t0=0,tm=0,best=null;
try{best=parseFloat(localStorage.getItem('shulte-best'))||null}catch(e){}
function fmt(s){return s.toFixed(1).replace('.',',')+' с'}
function shulte(){clearInterval(tm);need=1;t0=0;$('#psNado').textContent=1;$('#psVr').textContent='0,0 с';$('#psItog').innerHTML=best?'Ваш рекорд: <b>'+fmt(best)+'</b>':'';
 var a=[];for(var i=1;i<=25;i++)a.push(i);for(i=24;i>0;i--){var j=Math.floor(Math.random()*(i+1)),x=a[i];a[i]=a[j];a[j]=x}
 set.innerHTML=a.map(function(n){return'<button type="button" class="ps-k" data-x="'+n+'">'+n+'</button>'}).join('')}
set.onclick=function(e){var b=e.target.closest('.ps-k');if(!b||need>25)return;
 if(+b.dataset.x!==need){b.classList.remove('ne');void b.offsetWidth;b.classList.add('ne');return}
 if(need===1){t0=Date.now();tm=setInterval(function(){$('#psVr').textContent=fmt((Date.now()-t0)/1000)},100)}
 b.classList.add('da');need++;if(need<=25){$('#psNado').textContent=need;return}
 clearInterval(tm);var s=(Date.now()-t0)/1000;$('#psVr').textContent=fmt(s);$('#psNado').textContent='✓';
 var rec=!best||s<best;if(rec){best=s;try{localStorage.setItem('shulte-best',s)}catch(e){}}
 $('#psItog').innerHTML='Пройдено за <b>'+fmt(s)+'</b>'+(rec?' — новый рекорд! 🎉':'. Рекорд: <b>'+fmt(best)+'</b>')};
$('#psSnova').onclick=shulte;shulte();
/* Курсы: фильтр и счётчики */
function counts(){var n={};$$('.us').forEach(function(u){n[u.dataset.g]=(n[u.dataset.g]||0)+1});
 $$('#usTabs .tab').forEach(function(t){var g=t.dataset.g,c=g?(n[g]||0):$$('.us').length;t.textContent=t.textContent.replace(/\s*\d+$/,'')+' '+c});
 var e=$('#otEsche');if(e)e.textContent='Показать все отзывы · '+$$('.ot').length}
$('#usTabs').onclick=function(e){var t=e.target.closest('.tab');if(!t)return;$$('#usTabs .tab').forEach(function(x){x.classList.toggle('on',x===t)});
 $$('.us').forEach(function(u){u.hidden=!!t.dataset.g&&u.dataset.g!==t.dataset.g})};
counts();
var es=$('#otEsche');if(es)es.onclick=function(){$('#otLenta').classList.remove('svernuto');es.hidden=true};
/* Лайтбокс */
document.addEventListener('click',function(e){var f=e.target.closest('.z');if(!f||document.body.classList.contains('adm'))return;
 var o=document.createElement('div');o.className='lb';o.innerHTML='<figure><img src="'+$('img',f).src+'" alt=""><p>'+($('figcaption',f)||{}).textContent+'</p></figure><button type="button" aria-label="Закрыть">×</button>';
 o.onclick=function(){o.remove()};document.body.appendChild(o)});
/* Кнопка записи не перекрывает контакты и подвал */
var zp=$('.sh-zap'),fl={};if(zp&&window.IntersectionObserver){var io=new IntersectionObserver(function(a){a.forEach(function(x){fl[x.target.id]=x.isIntersecting});zp.classList.toggle('skryt',!!(fl.kontakty||fl.podval))});['kontakty','podval'].forEach(function(i){io.observe($('#'+i))})}
/* Режим администратора: логин и пароль, сервер — папка admin (PHP) */
var csrf='',bar,ck=0,ct;
function api(p,body,h){var o={method:body?'POST':'GET',credentials:'same-origin',headers:Object.assign({'X-CSRF':csrf},h||{})};if(body)o.body=body;return fetch('admin/'+p,o).then(function(r){return r.json()})}
function loginForm(){return new Promise(function(res){var d=document.createElement('div');d.className='adm-modal';d.dataset.adm='1';
 d.innerHTML='<form><h3>Вход для администратора</h3><input name="l" placeholder="Логин" autocomplete="username"><input name="p" type="password" placeholder="Пароль" autocomplete="current-password"><p class="adm-err"></p><button class="btn btn-main">Войти</button><button type="button" class="btn btn-alt">Отмена</button></form>';
 document.body.appendChild(d);var f=$('form',d);f.l.focus();$('.btn-alt',d).onclick=function(){d.remove();res(false)};
 f.onsubmit=function(e){e.preventDefault();api('login.php',JSON.stringify({login:f.l.value,password:f.p.value}),{'Content-Type':'application/json'}).then(function(r){if(r.ok){csrf=r.csrf;d.remove();res(true)}else $('.adm-err',d).textContent='Неверный логин или пароль'}).catch(function(){$('.adm-err',d).textContent='Нет связи с сервером: нужен хостинг с PHP'})}})}
async function adm(ask){if(document.body.classList.contains('adm'))return true;var s=null;try{s=await api('check.php')}catch(e){}
 if(s&&s.ok)csrf=s.csrf;else{if(!ask)return false;if(!await loginForm())return false}start();return true}
function start(){document.body.classList.add('adm');
 $$('.us h3,.us-o,.us-c,.us-voz,.ot blockquote,.ot figcaption b,.ot figcaption span,.z figcaption,.lead,h2,.hero h1').forEach(function(x){x.contentEditable='true'});
 $$('.us,.ot').forEach(function(c){var x=document.createElement('button');x.className='adm-x';x.dataset.adm='1';x.textContent='×';x.onclick=function(){if(confirm('Удалить?')){c.remove();counts()}};c.appendChild(x)});
 bar=document.createElement('div');bar.id='admBar';bar.dataset.adm='1';
 bar.innerHTML='<button class="go" data-a="save">Сохранить на сайт</button><button data-a="course">+ Курс</button><button data-a="review">+ Отзыв</button><button data-a="course-">− Курс</button><button data-a="review-">− Отзыв</button><button data-a="vk">Ссылка VK</button><button data-a="pass">Сменить пароль</button><button data-a="out">Выйти</button><span style="color:#fff;font-size:13px;align-self:center">Клик по фото — заменить</span>';
 document.body.appendChild(bar);bar.onclick=act}
$('#logo').addEventListener('click',function(e){e.preventDefault();ck++;clearTimeout(ct);if(ck>=3){ck=0;adm(true);return}
 ct=setTimeout(function(){var one=ck===1;ck=0;if(one)adm(false).then(function(ok){if(!ok)scrollTo({top:0,behavior:'smooth'})})},450)});
function hh(){if(location.hash==='#admin')adm(true)}hh();addEventListener('hashchange',hh);
document.addEventListener('click',function(e){var i=e.target;if(!document.body.classList.contains('adm')||!i.matches('.us-f img,.z img,.hero img'))return;
 var f=document.createElement('input');f.type='file';f.accept='image/*';f.onchange=function(){var fd=new FormData();fd.append('f',f.files[0]);api('upload.php',fd).then(function(r){if(r.url)i.src=r.url;else alert(r.err||'Не удалось загрузить')}).catch(function(){alert('Нет связи с сервером')})};f.click()});
async function act(e){var a=e.target.dataset.a;if(!a)return;
 if(a==='out'){await api('logout.php',' ').catch(function(){});return location.reload()}
 if(a==='vk'){var v=prompt('Ссылка на группу ВКонтакте',$('[data-vk]').href);if(v)$$('[data-vk]').forEach(function(x){x.href=v});return}
 if(a==='pass'){var o=prompt('Текущий пароль'),n=o&&prompt('Новый пароль (не короче 8 символов)');if(n)api('passwd.php',JSON.stringify({old:o,new:n}),{'Content-Type':'application/json'}).then(function(r){alert(r.ok?'Пароль изменён':r.err)});return}
 if(a==='course'){var c=$('.us').cloneNode(true);c.id='';$('h3',c).textContent='Новый курс';$('#usSetka').appendChild(c);counts();return}
 if(a==='course-'||a==='review-'){var l=$$(a==='course-'?'.us':'.ot').pop();if(l&&confirm('Убрать последний: «'+(a==='course-'?$('h3',l):$('figcaption b',l)).textContent+'»?')){l.remove();counts()}return}
 if(a==='review'){var r=$$('.ot').pop().cloneNode(true);$('blockquote',r).textContent='Текст отзыва';$('#otLenta').appendChild(r);counts();return}
 if(a==='save'){var d=document.documentElement.cloneNode(true);
  $$('[data-adm]',d).forEach(function(x){x.remove()});$$('[contenteditable]',d).forEach(function(x){x.removeAttribute('contenteditable')});
  $$('.us',d).forEach(function(x){x.hidden=false});$('#psSetka',d).innerHTML='';$('.sh-zap',d).classList.remove('skryt');$('body',d).classList.remove('adm');$$('.lb',d).forEach(function(x){x.remove()});
  api('save.php','<!DOCTYPE html>\n'+d.outerHTML,{'Content-Type':'text/html'}).then(function(r){alert(r.ok?'Сохранено на сайте':(r.err||'Ошибка'))}).catch(function(){alert('Нет связи с сервером')})}}
})();
