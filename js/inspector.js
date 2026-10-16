/* =========================================================
   ARCHIVO: inspector.js
   CONTENIDO: Panel de descripción del proyecto (panel derecho).
              Muestra narrativa en vivo + botones de copiar/cerrar
              + resizer.
   DEPENDENCIAS: core.js, tree.js
   ========================================================= */

import { state, $, esc, toast } from './core.js';
import { walk, countAll, typeOf, getTemplate } from './tree.js';

export function toggleInspector(force){
  state.inspectorOpen = force===undefined ? !state.inspectorOpen : !!force;
  $('#inspectorPanel').classList.toggle('hidden',!state.inspectorOpen);
  $('#resizerInspector').classList.toggle('hidden',!state.inspectorOpen);
  localStorage.setItem('fs-inspector',state.inspectorOpen?'1':'0');
  if(state.inspectorOpen)renderInspector();
}
export function renderInspector(){
  if(!state.inspectorOpen)return;
  const body=$('#inspectorBody');if(!body)return;
  body.innerHTML=buildNarrativeHTML();
}
function buildNarrativeHTML(){
  const tpl=getTemplate();
  if(!state.root)return '<div class="insp-desc">Sin contenido</div>';
  const parts=[];
  parts.push(`<div class="insp-cat">${esc(tpl.group)}</div>
    <h2 class="insp-title">${esc(state.projectName)}</h2>
    <div class="insp-tpl">${tpl.icon} ${esc(tpl.name)}</div>
    <p class="insp-desc">${esc(tpl.desc)}</p>`);
  const total=countAll(state.root), depth=getMaxDepth(state.root);
  const typeCount={};walk(state.root,n=>{typeCount[n.type]=(typeCount[n.type]||0)+1;});
  parts.push(`<div class="insp-sec"><div class="insp-h">📊 Resumen</div>
    <div class="insp-stats">
      <div class="insp-stat"><span>Elementos</span><b>${total}</b></div>
      <div class="insp-stat"><span>Niveles</span><b>${depth+1}</b></div>
      <div class="insp-stat"><span>Tipos</span><b>${Object.keys(typeCount).length}</b></div>
    </div></div>`);
  parts.push(`<div class="insp-sec"><div class="insp-h">📖 Descripción</div>
    <ul class="insp-ul">${narrProse(state.root,true)}</ul></div>`);
  return parts.join('');
}
function narrProse(node,isRoot){
  const tp=typeOf(node.type);
  const icon=node.icon||tp.icon;
  const desc=node.description?` <span class="insp-desc-txt">— ${esc(node.description)}</span>`:'';
  const kids=node.children;
  if(isRoot){
    let s=`<li><b>${esc(node.name)}</b> <span style="color:var(--text-3)">(${esc(tp.label)})</span>${desc}`;
    if(kids.length){
      s+=`<ul>${kids.map(k=>narrProse(k,false)).join('')}</ul>`;
    }
    return s+`</li>`;
  }
  let s=`<li>${icon} <b>${esc(node.name)}</b> <span style="color:var(--text-3)">(${esc(tp.label)})</span>${desc}`;
  if(kids.length){
    s+=`<ul>${kids.map(k=>narrProse(k,false)).join('')}</ul>`;
  }
  return s+`</li>`;
}
function getMaxDepth(node,d=0){
  if(!node.children.length)return d;
  return Math.max(...node.children.map(c=>getMaxDepth(c,d+1)));
}

$('#btnToggleInspector').addEventListener('click',()=>toggleInspector());
$('#btnCloseInspector').addEventListener('click',()=>toggleInspector(false));
$('#btnCopyInspector').addEventListener('click',()=>{
  const txt=$('#inspectorBody').innerText.trim();
  if(!txt)return toast('Nada que copiar','⚠️');
  navigator.clipboard.writeText(txt).then(()=>toast('Descripción copiada','📋'))
    .catch(()=>toast('Error al copiar','⚠️'));
});

(function(){
  const rz=$('#resizerInspector');
  const ip=$('#inspectorPanel');
  let dragging=false,sx=0,sw=0;
  rz.addEventListener('mousedown',e=>{
    dragging=true;sx=e.clientX;sw=ip.offsetWidth;
    rz.classList.add('active');
    document.body.style.userSelect='none';
  });
  window.addEventListener('mousemove',e=>{
    if(!dragging)return;
    const w=Math.max(260,Math.min(620,sw-(e.clientX-sx)));
    ip.style.width=w+'px';
  });
  window.addEventListener('mouseup',()=>{
    dragging=false;
    rz.classList.remove('active');
    document.body.style.userSelect='';
  });
})();
