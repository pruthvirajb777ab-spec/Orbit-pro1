(function(){
var cv=document.getElementById('cv'),cx=cv.getContext('2d'),hero=document.getElementById('top'),copy=document.getElementById('copy'),dbEl=document.getElementById('db');
var W,H,dpr,col='#f2f2f0',p=0,want=0;
function size(){dpr=Math.min(window.devicePixelRatio||1,2);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);draw()}
function ss(a,b,x){x=Math.max(0,Math.min(1,(x-a)/(b-a)));return x*x*(3-2*x)}
function shade(hex,k){var n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;function f(v){return Math.max(0,Math.min(255,Math.round(v+k*(k>0?255-v:v))))}return 'rgb('+f(r)+','+f(g)+','+f(b)+')'}
function bud(x,y,s,rot){
 cx.save();cx.translate(x,y);cx.rotate(rot);cx.scale(s,s);
 var g=cx.createLinearGradient(-60,-80,60,80);g.addColorStop(0,shade(col,.25));g.addColorStop(1,shade(col,-.22));
 cx.fillStyle=g;cx.shadowColor='rgba(20,20,30,.22)';cx.shadowBlur=40;cx.shadowOffsetY=26;
 cx.beginPath();cx.moveTo(-26,10);cx.bezierCurveTo(-34,150,-14,230,0,232);cx.bezierCurveTo(14,230,34,150,26,10);cx.closePath();cx.fill();
 cx.beginPath();cx.ellipse(0,-12,64,60,0,0,7);cx.fill();
 cx.shadowColor='transparent';
 cx.fillStyle='rgba(0,0,0,.18)';cx.beginPath();cx.ellipse(-20,-8,18,20,0,0,7);cx.fill();
 cx.fillStyle='rgba(0,0,0,.35)';cx.beginPath();cx.arc(-20,-8,5,0,7);cx.fill();
 cx.restore();
}
function draw(){
 cx.clearRect(0,0,W,H);
 var bg=cx.createRadialGradient(W/2,H*.4,10,W/2,H*.4,Math.max(W,H)*.8);bg.addColorStop(0,'#fbfbf9');bg.addColorStop(1,'#efefea');
 cx.fillStyle=bg;cx.fillRect(0,0,W,H);
 var calm=ss(.08,.8,p),cxm=W/2,cym=H*.38,u=Math.min(W,H),s=u/760+.12;
 for(var i=0;i<9;i++){
  var base=(.14+i*.085)*Math.max(W,H)*(1.15-.35*calm);
  var amp=(1-calm)*(10+i*3);
  var a=(1-ss(.55,1,p))*(.5-i*.04);
  cx.beginPath();
  for(var k=0;k<=160;k++){
   var t=k/160*Math.PI*2;
   var n=Math.sin(t*7+i*1.7+p*18)*amp+Math.sin(t*13-i+p*11)*amp*.6+Math.sin(t*3+p*6+i)*amp*.8;
   var r=base+n;
   var X=cxm+Math.cos(t)*r,Y=cym+Math.sin(t)*r*.62;
   k?cx.lineTo(X,Y):cx.moveTo(X,Y);
  }
  cx.strokeStyle=calm>.7?'rgba(58,85,255,'+(a*(.6+calm*.4)).toFixed(3)+')':'rgba(23,24,27,'+(Math.max(a,0)*.7).toFixed(3)+')';
  cx.lineWidth=1.4;cx.stroke();
 }
 bud(cxm,cym-s*60,s*(1+calm*.12),-.42+calm*.5);
 dbEl.textContent=Math.round(72-calm*58)+' dB';
}
function onScroll(){
 var r=hero.getBoundingClientRect(),tot=hero.offsetHeight-innerHeight;
 want=Math.max(0,Math.min(1,-r.top/tot));
}
function loop(){p+=(want-p)*.14;if(Math.abs(want-p)<.0005)p=want;draw();requestAnimationFrame(loop)}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',function(){size();onScroll()});
size();onScroll();
if(matchMedia('(prefers-reduced-motion:reduce)').matches){p=.9;draw();addEventListener('scroll',function(){p=want;draw()},{passive:true})}else{loop()}

/* swatches */
var sw=document.getElementById('sw'),cn=document.getElementById('cn');
sw.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
 [].forEach.call(sw.children,function(x){x.setAttribute('aria-pressed',x===b)});
 col=b.dataset.c;cn.textContent=b.dataset.n;draw()});

/* delivery chip */
var d=new Date();d.setDate(d.getDate()+7);
var d2=new Date();d2.setDate(d2.getDate()+10);
var f=function(x){return x.toLocaleDateString(undefined,{month:'short',day:'numeric'})};
document.getElementById('eta').textContent='Delivers '+f(d)+' to '+f(d2);

/* quotes */
var tr=document.getElementById('track'),n=tr.children.length,i=0,dots=document.getElementById('dots');
for(var j=0;j<n;j++)dots.appendChild(document.createElement('i'));
function go(k){i=(k+n)%n;tr.style.transform='translateX(-'+i*100+'%)';[].forEach.call(dots.children,function(x,m){x.className=m===i?'on':''})}
document.getElementById('prev').onclick=function(){go(i-1)};
document.getElementById('next').onclick=function(){go(i+1)};
go(0);
document.getElementById('go').onclick=function(){this.textContent='Added';var b=this;setTimeout(function(){b.textContent='Pre-order'},1600)};
})();
