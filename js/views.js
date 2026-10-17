/* =========================================================
   ARCHIVO: views.js
   CONTENIDO: Router de vistas y render de las 6 vistas
              (nodos, pantallas, lista, esquema, json, markdown).
   DEPENDENCIAS: core.js, tree.js, data.js, interactions.js,
                 inspector.js
   ========================================================= */

import { state, $, $$, esc, emitDirty, emitRender, toast } from './core.js';
import {
  typeOf, walk, findNode, findParent, getTemplate, countAll
} from './tree.js';
import { DEV } from './data.js';
import {
  NODE_W, NODE_H, GX, GY,
  computeLayout, applyGraphTransform, zoomAt, fitZoom,
  showIconPopover, showDescPopover, showNodeMenu, showCanvasMenu,
  startPinDrag, drawConnections
} from './interactions.js';
import { renderInspector } from './inspector.js';
import { toMarkdown } from './export.js';

$$('#viewTabs .tab').forEach(t => {
  t.addEventListener('click', () => {
    $$('#viewTabs .tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    state.view = t.dataset.view;
    renderView();
  });
});

export function renderExtra(){
  const host=$('#viewExtra');
  host.innerHTML='';
  if(state.view==='nodes'){
    host.innerHTML=`
      <div class="zoom">
        <button id="zOut">−</button>
        <span id="zVal">${Math.round(state.zoom*100)}%</span>
        <button id="zIn">＋</button>
        <button class="mini" id="zFit">Ajustar</button>
        <button class="mini" id="zReset">100%</button>
      </div>`;
    $('#zOut').onclick=()=>{
      const r=document.querySelector('.graph-scroll')?.getBoundingClientRect();
      if(r)zoomAt(r.left+r.width/2,r.top+r.height/2,1/1.15);
    };
    $('#zIn').onclick=()=>{
      const r=document.querySelector('.graph-scroll')?.getBoundingClientRect();
      if(r)zoomAt(r.left+r.width/2,r.top+r.height/2,1.15);
    };
    $('#zFit').onclick=fitZoom;
    $('#zReset').onclick=()=>{state.zoom=1;state._centered=false;renderView();};
  }
  if(state.view==='screens'){
    host.innerHTML=`
      <div class="seg" id="devSeg">
        <button data-dev="phone" class="${state.device==='phone'?'on':''}">📱 iPhone</button>
        <button data-dev="tablet" class="${state.device==='tablet'?'on':''}">📲 iPad</button>
        <button data-dev="desktop" class="${state.device==='desktop'?'on':''}">🖥️ Desktop</button>
      </div>`;
    $$('#devSeg button').forEach(b=>{
      b.onclick=()=>{state.device=b.dataset.dev;renderView();};
    });
  }
}

export function renderView(){
  renderExtra();
  const body=$('#viewBody');
  body.innerHTML='';
  const r=state.root;
  if(!r)body.innerHTML='<div class="empty-state"><div class="big">📭</div>Sin contenido</div>';
  else if(state.view==='nodes')renderNodes(body);
  else if(state.view==='screens')renderScreens(body);
  else if(state.view==='list')renderList(body);
  else if(state.view==='outline')renderOutline(body);
  else if(state.view==='json')renderCode(body,'json');
  else if(state.view==='markdown')renderCode(body,'markdown');
  renderInspector();
}

function renderNodes(host){
  const layout=computeLayout();

  if(!state._centered){
    const b=$('#viewBody');
    const w=b.clientWidth||800, h=b.clientHeight||600;
    state.zoom=1;
    state.zoomX=Math.max(40,(w-layout.width)/2);
    state.zoomY=Math.max(40,(h-layout.height)/2);
    state._centered=true;
  }

  const scroll=document.createElement('div');
  scroll.className='graph-scroll';
  scroll.innerHTML=`
    <div class="graph-zoom">
      <div class="graph-canvas" style="width:${layout.width+40}px;height:${layout.height+40}px;transform:translate(${state.zoomX}px, ${state.zoomY}px) scale(${state.zoom})">
        <svg class="conn-layer" width="${layout.width+40}" height="${layout.height+40}"></svg>
        ${renderNodeHTML(state.root,layout)}
      </div>
    </div>
    <div class="pan-hint">🖱️ Arrastra para mover · Rueda para desplazar · Ctrl+Rueda zoom · Clic derecho para crear nodo</div>`;
  host.appendChild(scroll);

  const connLayer=scroll.querySelector('.conn-layer');
  walk(state.root,(node)=>{
    if(state.collapsed.has(node.id))return;
    const p=layout.positions.get(node.id);if(!p)return;
    node.children.forEach(c=>{
      const cp=layout.positions.get(c.id);if(!cp)return;
      const elP=document.querySelector(`.gnode[data-id="${node.id}"]`);
      const elC=document.querySelector(`.gnode[data-id="${c.id}"]`);
      const hp=elP?elP.offsetHeight:NODE_H, hc=elC?elC.offsetHeight:NODE_H;
      const x1=p.x+NODE_W, y1=p.y+hp/2;
      const x2=cp.x,        y2=cp.y+hc/2;
      const mid=(x1+x2)/2;
      const path=document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d',`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`);
      path.setAttribute('fill','none');
      path.setAttribute('stroke','currentColor');
      path.setAttribute('stroke-width','1.5');
      path.setAttribute('opacity',c.id===state.selectedId||node.id===state.selectedId?'1':'0.4');
      connLayer.appendChild(path);
    });
  });

  requestAnimationFrame(()=>{drawConnections(connLayer);});

  scroll.querySelectorAll('.gnode').forEach(el=>{
    const id=el.dataset.id;

    el.querySelector('.g-tog')?.addEventListener('click',e=>{
      e.stopPropagation();
      if(state.collapsed.has(id))state.collapsed.delete(id);else state.collapsed.add(id);
      emitRender();
    });

    el.querySelector('.g-ic')?.addEventListener('click',e=>{
      e.stopPropagation();
      showIconPopover(id,e.clientX+10,e.clientY+10);
    });

    el.querySelector('.g-pin-out')?.addEventListener('mousedown',e=>{
      startPinDrag(e,id);
    });

    el.querySelector('.g-name')?.addEventListener('dblclick',e=>{
      e.stopPropagation();
      const n=findNode(id);if(!n)return;
      const b=e.target;
      const old=n.name;
      b.contentEditable=true;b.textContent=old;
      b.focus();
      const range=document.createRange();range.selectNodeContents(b);
      const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);
      const finish=()=>{
        b.contentEditable=false;
        const v=(b.textContent||'').trim()||old;
        n.name=v;
        if(n===state.root){state.projectName=v;$('#projName').value=v;}
        emitDirty();emitRender();
      };
      b.addEventListener('blur',finish,{once:true});
      b.addEventListener('keydown',ev=>{
        if(ev.key==='Enter'){ev.preventDefault();b.blur();}
        if(ev.key==='Escape'){b.textContent=old;b.blur();}
      });
    });

    el.querySelector('.g-type')?.addEventListener('dblclick',e=>{
      e.stopPropagation();
      showDescPopover(id,e.clientX+10,e.clientY+10);
    });
    el.querySelector('.g-desc')?.addEventListener('dblclick',e=>{
      e.stopPropagation();
      showDescPopover(id,e.clientX+10,e.clientY+10);
    });

    el.addEventListener('contextmenu',e=>{
      e.preventDefault();e.stopPropagation();
      state.selectedId=id;emitRender();
      showNodeMenu(e.clientX,e.clientY,id);
    });

    el.addEventListener('click',e=>{
      if(e.target.closest('.g-tog,.g-pin,.g-ic,.g-name[contenteditable],.g-desc,.g-type'))return;
      state.selectedId=id;emitRender();
    });
  });

  scroll.addEventListener('mousedown',e=>{
    if(e.target.closest('.gnode'))return;
    if(e.button!==0)return;
    e.preventDefault();
    scroll.classList.add('panning');
    const sx=e.clientX,sy=e.clientY;
    const ox=state.zoomX,oy=state.zoomY;
    const canvas=scroll.querySelector('.graph-canvas');
    const move=ev=>{
      state.zoomX=ox+(ev.clientX-sx);
      state.zoomY=oy+(ev.clientY-sy);
      if(canvas)canvas.style.transform=`translate(${state.zoomX}px, ${state.zoomY}px) scale(${state.zoom})`;
    };
    const up=()=>{
      scroll.classList.remove('panning');
      window.removeEventListener('mousemove',move);
      window.removeEventListener('mouseup',up);
    };
    window.addEventListener('mousemove',move);
    window.addEventListener('mouseup',up);
  });

  scroll.addEventListener('wheel',e=>{
    if(!e.ctrlKey && !e.metaKey){
      e.preventDefault();
      state.zoomX-=e.deltaX;
      state.zoomY-=e.deltaY;
      applyGraphTransform();
    }else{
      e.preventDefault();
      zoomAt(e.clientX,e.clientY,e.deltaY<0?1.12:1/1.12);
    }
  },{passive:false});

  scroll.addEventListener('contextmenu',e=>{
    if(e.target.closest('.gnode'))return;
    e.preventDefault();
    showCanvasMenu(e.clientX,e.clientY);
  });

  scroll.addEventListener('dblclick',e=>{
    if(e.target.closest('.gnode'))return;
    state._centered=false;renderView();
  });
}

function renderNodeHTML(node,layout){
  const p=layout.positions.get(node.id);
  if(!p)return '';
  const tp=typeOf(node.type);
  const icon=node.icon||tp.icon;
  const collapsed=state.collapsed.has(node.id);
  const hasKids=node.children.length>0;
  const sel=node.id===state.selectedId?'sel':'';
  const hasDesc=!!node.description;
  const nLinks=(node.links||[]).length;
  let html=`
    <div class="gnode ${sel} ${hasDesc?'has-desc':''}" data-id="${node.id}" style="left:${p.x}px;top:${p.y}px;width:${NODE_W}px;--c:${tp.color}">
      <span class="g-pin g-pin-in" data-pin="in" data-id="${node.id}" title="Pin de entrada"></span>
      <span class="g-ic" title="Clic para cambiar icono / tipo">${icon}</span>
      <span class="g-tx">
        <b class="g-name" title="Doble clic para renombrar">${esc(node.name)}</b>
        <small class="g-type" title="Doble clic para editar descripción">${esc(tp.label)}${hasKids?' · '+node.children.length:''}${nLinks?' · 🔗'+nLinks:''}</small>
        ${hasDesc?`<span class="g-desc" title="Doble clic para editar">${esc(node.description)}</span>`:''}
      </span>
      ${hasKids?`<button class="g-tog" title="${collapsed?'Expandir':'Contraer'}">${collapsed?'+':'−'}</button>`:''}
      <span class="g-pin g-pin-out" data-pin="out" data-id="${node.id}" title="Arrastra para conectar"></span>
    </div>`;
  if(!collapsed){
    node.children.forEach(c=>{html+=renderNodeHTML(c,layout);});
  }
  return html;
}

function renderScreens(host){
  const d=DEV[state.device];
  const stage=document.createElement('div');
  stage.className='screens-stage';
  const scale=Math.min(1,(window.innerHeight-160)/d.h,(window.innerWidth-500)/d.w);
  stage.innerHTML=`
    <div class="device ${d.cls}" style="width:${d.w}px;height:${d.h}px;transform:scale(${scale})">
      <div class="device-screen">
        <div class="scr-top">
          <button class="scr-back">‹</button>
          <span class="scr-title">${esc(state.root.name)}</span>
          <span style="color:var(--text-3);font-size:16px;letter-spacing:1px">⋯</span>
        </div>
        <div class="scr-body" id="scrBody"></div>
      </div>
    </div>`;
  host.appendChild(stage);
  renderScreenChildren(state.root,$('#scrBody'),true);
}
function renderScreenChildren(node,host,isRoot){
  const kids=node.children;
  if(!kids.length&&!isRoot){
    host.innerHTML+=`<div class="scr-empty"><div class="big">📄</div>Pantalla final — sin subelementos</div>`;
    return;
  }
  kids.forEach(c=>{
    const tp=typeOf(c.type);
    const row=document.createElement('div');
    row.className='scr-row';
    row.innerHTML=`
      <span class="scr-ic" style="--c:${tp.color}">${tp.icon}</span>
      <span class="scr-tx"><b>${esc(c.name)}</b><small>${esc(tp.label)}${c.children.length?' · '+c.children.length+' sub':''}</small></span>
      <span class="scr-chev">›</span>`;
    row.onclick=()=>{
      state.selectedId=c.id;emitRender();
      const body=$('#scrBody');
      body.innerHTML='';
      const top=$('.scr-title');
      if(top)top.textContent=c.name;
      renderScreenChildren(c,body,false);
      const back=$('.scr-back');
      if(back){
        back.onclick=()=>{
          state.selectedId=node.id;emitRender();
        };
      }
    };
    host.appendChild(row);
  });
}

function renderList(host){
  const rows=[];
  walk(state.root,(node,depth,parent)=>{
    const tp=typeOf(node.type);
    const pathNodes=[];
    let cur=node;
    while(cur!==state.root){const p=findParent(cur.id);if(!p)break;pathNodes.unshift(p.name);cur=p;}
    rows.push({node,depth,tp,path:pathNodes.join(' / ')||'—'});
  });
  const wrap=document.createElement('div');
  wrap.className='tbl-wrap';
  wrap.innerHTML=`
    <table class="tbl">
      <thead><tr>
        <th style="width:44%">Nombre</th>
        <th style="width:20%">Tipo</th>
        <th style="width:22%">Ruta</th>
        <th style="width:14%">Hijos</th>
      </tr></thead>
      <tbody>
        ${rows.map(r=>`
          <tr data-id="${r.node.id}" class="${r.node.id===state.selectedId?'sel':''}">
            <td><span class="nm" style="padding-left:${r.depth*14}px">${r.depth?'└ ':''}${r.tp.icon} ${esc(r.node.name)}</span></td>
            <td><span class="pill" style="--c:${r.tp.color}">${r.tp.icon} ${esc(r.tp.label)}</span></td>
            <td><span class="path">${esc(r.path)}</span></td>
            <td>${r.node.children.length}</td>
          </tr>`).join('')}
      </tbody>
    </table>`;
  host.appendChild(wrap);
  wrap.querySelectorAll('tr[data-id]').forEach(tr=>{
    tr.onclick=()=>{state.selectedId=tr.dataset.id;emitRender();};
  });
}

function renderOutline(host){
  const txt=buildOutline(state.root,0);
  const wrap=document.createElement('div');
  wrap.style.padding='20px 22px 40px';
  wrap.innerHTML=`<div class="code-box">
    <div class="code-head"><span>ESQUEMA JERÁRQUICO</span><button class="mini" id="cpOutline">Copiar</button></div>
    <pre class="code">${esc(txt)}</pre>
  </div>`;
  host.appendChild(wrap);
  $('#cpOutline').onclick=()=>copy(txt);
}
function buildOutline(node,depth){
  const tp=typeOf(node.type);
  const ind='  '.repeat(depth);
  let s=`${ind}${depth?'└─ ':''}${tp.icon} ${node.name}  [${tp.label}]\n`;
  node.children.forEach(c=>{s+=buildOutline(c,depth+1);});
  return s;
}

function renderCode(host,fmt){
  let content='',label='';
  const serializeTree = (node) => {
    const o = { name: node.name, type: node.type };
    if (node.icon) o.icon = node.icon;
    if (node.description) o.description = node.description;
    if (node.links && node.links.length) o.links = [...node.links];
    o.children = node.children.map(serializeTree);
    return o;
  };
  if(fmt==='json'){
    content = JSON.stringify(serializeTree(state.root), null, 2);
    label = 'JSON — estructura re-importable';
  }
  if(fmt==='markdown'){
    content = toMarkdown(false);
    label = 'MARKDOWN — documento jerárquico';
  }
  const wrap=document.createElement('div');
  wrap.style.padding='20px 22px 40px';
  wrap.innerHTML=`<div class="code-box">
    <div class="code-head"><span>${label}</span><button class="mini" id="cpCode">Copiar</button></div>
    <pre class="code">${esc(content)}</pre>
  </div>`;
  host.appendChild(wrap);
  $('#cpCode').onclick=()=>copy(content);
}

function copy(txt){
  navigator.clipboard.writeText(txt).then(()=>toast('Copiado al portapapeles','📋'))
    .catch(()=>toast('Error al copiar','⚠️'));
}

function serialize(node){
  const o={name:node.name,type:node.type};
  if(node.icon)o.icon=node.icon;
  if(node.description)o.description=node.description;
  if(node.links&&node.links.length)o.links=[...node.links];
  o.children=node.children.map(serialize);
  return o;
}
