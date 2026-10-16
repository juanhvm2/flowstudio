/* =========================================================
   ARCHIVO: interactions.js
   CONTENIDO: Layout del grafo, pan/zoom, pines, conexiones,
              menú contextual y popovers de edición.
   DEPENDENCIAS: core.js, tree.js, data.js
   ========================================================= */

import { state, $, $$, uid, esc, toast, emitDirty, emitRender } from './core.js';
import {
  findNode, findParent, walk, typeOf, getTemplate,
  addChild, renameNode, dupNode, delNode
} from './tree.js';
import { EMOJIS } from './data.js';

export const NODE_W = 220;
export const NODE_H = 52;
export const GX = 60;
export const GY = 22;

let lastLayout = null;

export function computeLayout(){
  const positions=new Map();
  let cursorY=0;
  function place(node,depth){
    const kids=node.children.filter(c=>!state.collapsed.has(node.id));
    if(!kids.length){
      const y=cursorY;
      cursorY+=NODE_H+GY;
      positions.set(node.id,{x:depth*(NODE_W+GX),y});
      return y;
    }
    const ys=kids.map(k=>place(k,depth+1));
    const y=(ys[0]+ys[ys.length-1])/2;
    positions.set(node.id,{x:depth*(NODE_W+GX),y});
    return y;
  }
  place(state.root,0);
  let maxX=0,maxY=0;
  positions.forEach(p=>{maxX=Math.max(maxX,p.x+NODE_W);maxY=Math.max(maxY,p.y+NODE_H);});
  lastLayout={positions,width:maxX,height:maxY};
  return lastLayout;
}

export function applyGraphTransform(){
  const canvas=document.querySelector('.graph-canvas');
  if(canvas)canvas.style.transform=`translate(${state.zoomX}px, ${state.zoomY}px) scale(${state.zoom})`;
  const zv=document.querySelector('#zVal');
  if(zv)zv.textContent=Math.round(state.zoom*100)+'%';
}
export function zoomAt(clientX,clientY,factor){
  const sc=document.querySelector('.graph-scroll'); if(!sc)return;
  const r=sc.getBoundingClientRect();
  const px=clientX-r.left, py=clientY-r.top;
  const oldZ=state.zoom, newZ=Math.max(0.2,Math.min(3,oldZ*factor));
  state.zoomX=px-(px-state.zoomX)*(newZ/oldZ);
  state.zoomY=py-(py-state.zoomY)*(newZ/oldZ);
  state.zoom=newZ;
  applyGraphTransform();
}
export function fitZoom(){
  if(!lastLayout)return;
  const b=$('#viewBody');
  const w=b.clientWidth-60,h=b.clientHeight-60;
  const z=Math.min(w/lastLayout.width,h/lastLayout.height,1.5);
  state.zoom=Math.max(.3,Math.round(z*100)/100);
  state.zoomX=(b.clientWidth-lastLayout.width*state.zoom)/2;
  state.zoomY=(b.clientHeight-lastLayout.height*state.zoom)/2;
  emitRender();
}

export function getNodeBox(nodeId){
  const el=document.querySelector(`.gnode[data-id="${nodeId}"]`);
  if(!el)return null;
  const nw=parseFloat(el.style.width)||NODE_W;
  const nh=el.offsetHeight||NODE_H;
  const nx=parseFloat(el.style.left)||0;
  const ny=parseFloat(el.style.top)||0;
  return {
    x:nx, y:ny, w:nw, h:nh,
    inX:nx, inY:ny+nh/2,
    outX:nx+nw, outY:ny+nh/2
  };
}

export function drawConnections(svg){
  svg.querySelectorAll('.conn-path,.conn-hit').forEach(e=>e.remove());
  walk(state.root,(node)=>{
    if(state.collapsed.has(node.id))return;
    const from=getNodeBox(node.id);
    if(!from)return;
    (node.links||[]).forEach(targetId=>{
      const target=findNode(targetId);
      if(!target)return;
      if(state.collapsed.has(target.id))return;
      const to=getNodeBox(targetId);
      if(!to)return;
      const mid=(from.outX+to.inX)/2;
      const d=`M ${from.outX} ${from.outY} C ${mid} ${from.outY}, ${mid} ${to.inY}, ${to.inX} ${to.inY}`;
      const p=document.createElementNS('http://www.w3.org/2000/svg','path');
      p.setAttribute('d',d);p.setAttribute('class','conn-path');
      p.dataset.from=node.id;p.dataset.to=targetId;
      svg.appendChild(p);
      const hit=document.createElementNS('http://www.w3.org/2000/svg','path');
      hit.setAttribute('d',d);hit.setAttribute('class','conn-hit');
      hit.dataset.from=node.id;hit.dataset.to=targetId;
      hit.addEventListener('click',e=>{
        e.stopPropagation();
        if(!confirm('¿Eliminar esta conexión?'))return;
        const n=findNode(hit.dataset.from);
        if(n)n.links=n.links.filter(x=>x!==hit.dataset.to);
        emitDirty();emitRender();
        toast('Conexión eliminada','✂️');
      });
      svg.appendChild(hit);
    });
  });
}

export function startPinDrag(e,fromId){
  e.preventDefault();e.stopPropagation();
  const scroll=document.querySelector('.graph-scroll');
  if(!scroll)return;
  const rect=scroll.getBoundingClientRect();
  const dragSvg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  dragSvg.setAttribute('class','conn-drag-line');
  dragSvg.style.width='100%';dragSvg.style.height='100%';
  const path=document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('fill','none');
  path.setAttribute('stroke','#0a84ff');
  path.setAttribute('stroke-width','2.5');
  path.setAttribute('stroke-dasharray','6 4');
  dragSvg.appendChild(path);
  scroll.appendChild(dragSvg);

  const from=getNodeBox(fromId);
  const startX=from.outX, startY=from.outY;

  function move(ev){
    const cx=ev.clientX-rect.left;
    const cy=ev.clientY-rect.top;
    const mid=(startX+cx)/2;
    path.setAttribute('d',`M ${startX} ${startY} C ${mid} ${startY}, ${mid} ${cy}, ${cx} ${cy}`);
    document.querySelectorAll('.gnode').forEach(n=>n.classList.remove('pin-target'));
    const el=document.elementFromPoint(ev.clientX,ev.clientY);
    const target=el?.closest?.('.gnode');
    if(target&&target.dataset.id!==fromId)target.style.boxShadow='0 0 0 3px #0a84ff';
  }
  function up(ev){
    document.removeEventListener('mousemove',move);
    document.removeEventListener('mouseup',up);
    dragSvg.remove();
    document.querySelectorAll('.gnode').forEach(n=>{n.style.boxShadow='';});
    const el=document.elementFromPoint(ev.clientX,ev.clientY);
    const target=el?.closest?.('.gnode');
    if(target&&target.dataset.id!==fromId){
      const tId=target.dataset.id;
      const fromNode=findNode(fromId);
      if(fromNode){
        if(!fromNode.links)fromNode.links=[];
        if(!fromNode.links.includes(tId)){
          fromNode.links.push(tId);
          emitDirty();emitRender();
          toast('Conexión creada','🔗');
        }
      }
    }
  }
  document.addEventListener('mousemove',move);
  document.addEventListener('mouseup',up);
}

function hideCtxMenu(){ $('#ctxMenu').classList.add('hidden'); }
export function showCanvasMenu(x,y){
  const tpl=getTemplate();
  const m=$('#ctxMenu');
  m.style.left=Math.min(x,window.innerWidth-250)+'px';
  m.style.top=Math.min(y,window.innerHeight-450)+'px';
  m.innerHTML=`
    <div class="ctx-title">Crear nodo aquí</div>
    <div class="ctx-list">
      ${Object.entries(tpl.types).map(([k,v])=>`
        <button class="ctx-item" data-new="${k}">
          <span class="ci-ic">${v.icon}</span>
          <span>${esc(v.label)}</span>
        </button>`).join('')}
    </div>
    <div class="ctx-sep"></div>
    <div class="ctx-list">
      <button class="ctx-item" data-reset="1"><span class="ci-ic">🎯</span><span>Recentrar vista</span></button>
      <button class="ctx-item" data-fit="1"><span class="ci-ic">⤢</span><span>Ajustar al ancho</span></button>
    </div>`;
  m.classList.remove('hidden');
}
export function showNodeMenu(x,y,nodeId){
  const m=$('#ctxMenu');
  m.style.left=Math.min(x,window.innerWidth-250)+'px';
  m.style.top=Math.min(y,window.innerHeight-260)+'px';
  m.innerHTML=`
    <div class="ctx-title">${esc(findNode(nodeId)?.name||'Nodo')}</div>
    <div class="ctx-list">
      <button class="ctx-item" data-edit="icon"><span class="ci-ic">🎨</span><span>Cambiar icono / tipo…</span></button>
      <button class="ctx-item" data-edit="desc"><span class="ci-ic">📝</span><span>Editar descripción…</span></button>
      <button class="ctx-item" data-edit="name"><span class="ci-ic">✏️</span><span>Renombrar</span></button>
      <div class="ctx-sep"></div>
      <button class="ctx-item" data-act="add"><span class="ci-ic">＋</span><span>Añadir hijo</span></button>
      <button class="ctx-item" data-act="dup"><span class="ci-ic">⧉</span><span>Duplicar</span></button>
      ${(findNode(nodeId)?.links?.length)?`<button class="ctx-item" data-act="clear-links"><span class="ci-ic">✂️</span><span>Quitar conexiones (${findNode(nodeId).links.length})</span></button>`:''}
      <div class="ctx-sep"></div>
      <button class="ctx-item danger" data-act="del"><span class="ci-ic">✕</span><span>Eliminar</span></button>
    </div>`;
  m.dataset.nodeId=nodeId;
  m.classList.remove('hidden');
}

$('#ctxMenu').addEventListener('click',e=>{
  const b=e.target.closest('.ctx-item');if(!b)return;
  const m=$('#ctxMenu');
  if(b.dataset.new){
    const n=findNode(m.dataset.nodeId)||state.root;
    const child={name:'Nuevo '+typeOf(b.dataset.new).label,type:b.dataset.new,children:[],links:[],id:uid()};
    n.children.push(child);
    state.selectedId=child.id;state.collapsed.delete(n.id);
    emitDirty();hideCtxMenu();emitRender();
    toast('Nodo creado','✨');
  } else if(b.dataset.reset){
    state._centered=false;state.zoom=1;hideCtxMenu();emitRender();
  } else if(b.dataset.fit){
    hideCtxMenu();fitZoom();
  } else if(b.dataset.edit){
    const id=m.dataset.nodeId;
    hideCtxMenu();
    if(b.dataset.edit==='icon')showIconPopover(id,null,null);
    else if(b.dataset.edit==='desc')showDescPopover(id,null,null);
    else if(b.dataset.edit==='name'){
      state.selectedId=id;emitRender();
      const row=document.querySelector(`.trow[data-id="${id}"]`);
      if(row)renameNode(findNode(id),row);
    }
  } else if(b.dataset.act){
    const n=findNode(m.dataset.nodeId);hideCtxMenu();
    if(!n)return;
    if(b.dataset.act==='add')addChild(n);
    else if(b.dataset.act==='dup')dupNode(n);
    else if(b.dataset.act==='del')delNode(n);
    else if(b.dataset.act==='clear-links'){n.links=[];emitDirty();emitRender();toast('Conexiones eliminadas','✂️');}
  }
});

function hideIconPopover(){ $('#iconPopover').classList.add('hidden'); }
export function showIconPopover(nodeId,x,y){
  const node=findNode(nodeId);if(!node)return;
  const tpl=getTemplate();
  const cur=typeOf(node.type);
  const curIcon=node.icon||cur.icon;
  const p=$('#iconPopover');
  if (x !== null) p.style.left = Math.max(10, Math.min(x, window.innerWidth - 700)) + 'px';
  if (y !== null) p.style.top  = Math.max(10, Math.min(y, window.innerHeight - 560)) + 'px';
  p.innerHTML=`
    <div class="pop-title">Icono y tipo del nodo</div>
    <div class="popover-icons">
      <div class="popover-col">
        <div class="popover-col-title">Icono</div>
        <div class="pop-grid" id="iconGrid">
          ${EMOJIS.map(e => `<button class="pop-emoji ${e === curIcon ? 'sel' : ''}" data-emoji="${e}">${e}</button>`).join('')}
        </div>
      </div>
      <div class="popover-col">
        <div class="popover-col-title">Tipo de elemento</div>
        <div class="pop-types" id="typeList">
          ${Object.entries(tpl.types).map(([k, v]) => `
            <button class="pop-type ${k === node.type ? 'sel' : ''}" data-type="${k}">
              <span class="pt-ic">${v.icon}</span>
              <span>${esc(v.label)}</span>
            </button>`).join('')}
        </div>
      </div>
    </div>
    <div class="pop-actions">
      <button class="btn-cancel" id="closeIconPop">Cerrar</button>
    </div>`;
  p.classList.remove('hidden');
  p.dataset.nodeId=nodeId;

  p.querySelector('#iconGrid').addEventListener('click',e=>{
    const b=e.target.closest('[data-emoji]');if(!b)return;
    const n=findNode(p.dataset.nodeId);if(!n)return;
    n.icon=b.dataset.emoji;
    p.querySelectorAll('.pop-emoji').forEach(x=>x.classList.remove('sel'));
    b.classList.add('sel');
    emitDirty();emitRender();
  });
  p.querySelector('#typeList').addEventListener('click',e=>{
    const b=e.target.closest('[data-type]');if(!b)return;
    const n=findNode(p.dataset.nodeId);if(!n)return;
    n.type=b.dataset.type;
    n.icon=typeOf(b.dataset.type).icon;
    p.querySelectorAll('.pop-type').forEach(x=>x.classList.remove('sel'));
    b.classList.add('sel');
    p.querySelectorAll('.pop-emoji').forEach(x=>{
      x.classList.toggle('sel',x.dataset.emoji===n.icon);
    });
    emitDirty();emitRender();
  });
  p.querySelector('#closeIconPop').onclick=()=>hideIconPopover();
}

function hideDescPopover(){ $('#descPopover').classList.add('hidden'); }
export function showDescPopover(nodeId,x,y){
  const node=findNode(nodeId);if(!node)return;
  const p=$('#descPopover');
  if(x!==null)p.style.left=Math.min(x,window.innerWidth-380)+'px';
  if(y!==null)p.style.top=Math.min(y,window.innerHeight-320)+'px';
  p.innerHTML=`
    <div class="pop-title">${esc(node.name)}</div>
    <div class="pop-field">
      <label>Descripción</label>
      <textarea id="descInput" placeholder="Escribe una descripción o nota sobre este elemento…">${esc(node.description||'')}</textarea>
    </div>
    <div class="pop-actions">
      <button class="btn-cancel" id="closeDescPop">Cancelar</button>
      <button class="btn-ok" id="saveDescPop">Guardar</button>
    </div>`;
  p.classList.remove('hidden');
  p.dataset.nodeId=nodeId;
  const ta=p.querySelector('#descInput');
  setTimeout(()=>{ta.focus();ta.select();},50);
  p.querySelector('#saveDescPop').onclick=()=>{
    const n=findNode(p.dataset.nodeId);if(!n)return;
    n.description=ta.value.trim();
    emitDirty();hideDescPopover();emitRender();
    toast('Descripción guardada','📝');
  };
  p.querySelector('#closeDescPop').onclick=()=>hideDescPopover();
  ta.addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();hideDescPopover();}
    if(e.key==='Enter'&&(e.metaKey||e.ctrlKey)){p.querySelector('#saveDescPop').click();}
  });
}

document.addEventListener('click',e=>{
  if(!e.target.closest('#ctxMenu'))hideCtxMenu();
  if(!e.target.closest('#iconPopover'))hideIconPopover();
  if(!e.target.closest('#descPopover'))hideDescPopover();
});
