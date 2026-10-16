/* =========================================================
   ARCHIVO: tree.js
   CONTENIDO: Helpers del árbol, render del panel izquierdo,
              acciones (añadir/renombrar/duplicar/eliminar) y
              selección de plantillas.
   DEPENDENCIAS: core.js, templates.js, data.js
   ========================================================= */

import { state, $, uid, esc, toast, emitDirty, emitRender } from './core.js';
import { TEMPLATES } from './templates.js';
import { C } from './data.js';

export function hydrate(node){
  node.id=node.id||uid();
  node.children=Array.isArray(node.children)?node.children:[];
  node.links=Array.isArray(node.links)?node.links:[];
  if(node.description===undefined)node.description='';
  node.children.forEach(hydrate);
  return node;
}
export function findNode(id,node=state.root){
  if(!node)return null;
  if(node.id===id)return node;
  for(const c of node.children){const r=findNode(id,c);if(r)return r;}
  return null;
}
export function findParent(id,node=state.root,parent=null){
  if(!node)return null;
  if(node.id===id)return parent;
  for(const c of node.children){const r=findParent(id,c,node);if(r)return r;}
  return null;
}
export function getTemplate(){return TEMPLATES.find(t=>t.id===state.templateId)||TEMPLATES[0];}
export function typeOf(key){const t=getTemplate();return t.types[key]||{label:key||'Nodo',icon:'•',color:C.gray};}
export function countAll(node){return 1+node.children.reduce((a,c)=>a+countAll(c),0);}
export function walk(node,fn,depth=0,parent=null){fn(node,depth,parent);node.children.forEach(c=>walk(c,fn,depth+1,node));}

export function renderTplList(filter=''){
  const list=$('#tplList');
  const f=filter.trim().toLowerCase();
  const items=TEMPLATES.filter(t=>!f||t.name.toLowerCase().includes(f)||
    t.desc.toLowerCase().includes(f)||(t.group||'').toLowerCase().includes(f));
  if(!items.length){
    list.innerHTML=`<div class="empty-state" style="padding:28px 10px"><div class="big">🔍</div>Sin resultados</div>`;
    return;
  }
  const groups={};
  items.forEach(t=>{(groups[t.group]=groups[t.group]||[]).push(t);});
  list.innerHTML=Object.entries(groups).map(([g,arr])=>`
    <div class="tpl-group">${esc(g)}</div>
    ${arr.map(t=>`
      <button class="tpl-item ${t.id===state.templateId?'active':''}" data-id="${t.id}">
        <span class="tpl-item-icon">${t.icon}</span>
        <span class="tpl-item-txt"><b>${esc(t.name)}</b><small>${esc(t.desc)}</small></span>
        ${t.id===state.templateId?'<span class="tpl-check">✓</span>':''}
      </button>`).join('')}
  `).join('');
}

export function loadTemplate(id,silent=false){
  const tpl=TEMPLATES.find(t=>t.id===id);
  if(!tpl)return;
  if(!silent&&state.root&&!confirm('¿Cargar esta plantilla? Se reemplazará el contenido actual.'))return;
  state.templateId=id;
  state.root=hydrate(JSON.parse(JSON.stringify(tpl.tree)));
  state.projectName=state.root.name;
  state.selectedId=state.root.id;
  state.collapsed=new Set();
  state.zoom=1;state.zoomX=30;state.zoomY=30;state._centered=false;
  $('#projName').value=state.projectName;
  $('#tplIcon').textContent=tpl.icon;
  $('#tplName').textContent=tpl.name;
  buildTypeSelect();
  renderTree();
  emitRender();
  if(!silent){ state.fileHandle=null; emitDirty(); }
  if(!silent)toast('Plantilla cargada: '+tpl.name,tpl.icon);
}

export function buildTypeSelect(){
  const sel=$('#newTypeSelect');
  const t=getTemplate();
  sel.innerHTML=Object.entries(t.types)
    .map(([k,v])=>`<option value="${k}">${v.icon} ${esc(v.label)}</option>`).join('');
  const keys=Object.keys(t.types);
  sel.value=keys[1]||keys[0];
}

export function renderTree(){
  const host=$('#tree');
  host.innerHTML='';
  host.appendChild(buildTreeNodes(state.root,0));
}

export function buildTreeNodes(node,depth){
  const frag=document.createDocumentFragment();
  const tp=typeOf(node.type);
  const hasKids=node.children.length>0;
  const collapsed=state.collapsed.has(node.id);

  const row=document.createElement('div');
  row.className='trow'+(node.id===state.selectedId?' sel':'');
  row.dataset.id=node.id;
  row.style.paddingLeft=(6+depth*15)+'px';
  row.innerHTML=`
    <button class="caret ${hasKids?'':'empty'}">${hasKids?(collapsed?'▶':'▼'):'•'}</button>
    <span class="ticon">${tp.icon}</span>
    <span class="tname">${esc(node.name)}</span>
    <span class="tacts">
      <button data-act="add" title="Añadir hijo">＋</button>
      <button data-act="ren" title="Renombrar">✎</button>
      <button data-act="dup" title="Duplicar">⧉</button>
      <button data-act="del" title="Eliminar">✕</button>
    </span>`;
  row.addEventListener('click',e=>{
    if(e.target.closest('.caret')){
      if(!hasKids)return;
      if(collapsed)state.collapsed.delete(node.id);else state.collapsed.add(node.id);
      renderTree();return;
    }
    const act=e.target.closest('[data-act]');
    if(act){
      e.stopPropagation();
      const a=act.dataset.act;
      if(a==='add')addChild(node);
      else if(a==='ren')renameNode(node,row);
      else if(a==='dup')dupNode(node);
      else if(a==='del')delNode(node);
      return;
    }
    state.selectedId=node.id;
    renderTree();emitRender();
  });
  row.addEventListener('dblclick',e=>{
    if(e.target.closest('button'))return;
    renameNode(node,row);
  });
  frag.appendChild(row);

  if(!collapsed){
    node.children.forEach(c=>frag.appendChild(buildTreeNodes(c,depth+1)));
  }
  return frag;
}

export function addChild(node){
  const typeKey=$('#newTypeSelect').value||Object.keys(getTemplate().types)[1];
  const child={name:'Nuevo elemento',type:typeKey,children:[],id:uid()};
  node.children.push(child);
  state.collapsed.delete(node.id);
  state.selectedId=child.id;
  emitDirty();
  renderTree();emitRender();
  toast('Elemento añadido','＋');
}
export function renameNode(node,row){
  const span=row.querySelector('.tname');
  const old=node.name;
  span.innerHTML=`<input value="${esc(old)}">`;
  const inp=span.querySelector('input');
  inp.focus();inp.select();
  const finish=()=>{
    const v=inp.value.trim()||old;
    node.name=v;
    if(node===state.root){state.projectName=v;$('#projName').value=v;}
    emitDirty();
    renderTree();emitRender();
  };
  inp.addEventListener('blur',finish);
  inp.addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();inp.blur();}
    if(e.key==='Escape'){inp.value=old;inp.blur();}
  });
}
export function dupNode(node){
  const parent=findParent(node.id);
  if(!parent)return;
  const copy=JSON.parse(JSON.stringify(node));
  reId(copy);
  copy.name=node.name+' (copia)';
  const idx=parent.children.indexOf(node);
  parent.children.splice(idx+1,0,copy);
  state.selectedId=copy.id;
  emitDirty();
  renderTree();emitRender();
  toast('Duplicado','⧉');
}
export function reId(n){n.id=uid();n.children.forEach(reId);}
export function delNode(node){
  if(node===state.root){toast('No puedes eliminar la raíz','⚠️');return;}
  const parent=findParent(node.id);
  if(!parent)return;
  if(!confirm(`¿Eliminar "${node.name}" y sus hijos?`))return;
  const toRemove=new Set();
  walk(node,n=>toRemove.add(n.id));
  walk(state.root,n=>{
    if(n.links)n.links=n.links.filter(id=>!toRemove.has(id));
  });
  parent.children=parent.children.filter(c=>c.id!==node.id);
  state.selectedId=parent.id;
  emitDirty();renderTree();emitRender();
  toast('Eliminado','✕');
}

$('#btnExpandAll').addEventListener('click',()=>{state.collapsed.clear();renderTree();});
$('#btnCollapseAll').addEventListener('click',()=>{
  walk(state.root,(n)=>{if(n.children.length)state.collapsed.add(n.id);});
  state.collapsed.delete(state.root.id);
  renderTree();
});

$('#tplBtn').addEventListener('click',e=>{
  e.stopPropagation();
  $('#tplWrap').classList.toggle('open');
  $('#tplMenu').classList.toggle('hidden');
  if(!$('#tplMenu').classList.contains('hidden')){
    renderTplList('');$('#tplSearch').value='';
    setTimeout(()=>$('#tplSearch').focus(),60);
  }
});
$('#tplSearch').addEventListener('input',e=>renderTplList(e.target.value));
$('#tplList').addEventListener('click',e=>{
  const b=e.target.closest('.tpl-item');
  if(!b)return;
  loadTemplate(b.dataset.id);
  $('#tplWrap').classList.remove('open');$('#tplMenu').classList.add('hidden');
});
document.addEventListener('click',e=>{
  if(!e.target.closest('#tplWrap')){$('#tplWrap').classList.remove('open');$('#tplMenu').classList.add('hidden');}
  if(!e.target.closest('.dd'))$('#exportMenu').classList.add('hidden');
});

(function(){
  const rz=$('#resizer'),lp=$('#leftPanel');
  let dragging=false,startX=0,startW=0;
  rz.addEventListener('mousedown',e=>{
    dragging=true;startX=e.clientX;startW=lp.offsetWidth;
    rz.classList.add('active');
    document.body.style.userSelect='none';
  });
  window.addEventListener('mousemove',e=>{
    if(!dragging)return;
    const w=Math.max(240,Math.min(700,startW+(e.clientX-startX)));
    lp.style.width=w+'px';
  });
  window.addEventListener('mouseup',()=>{
    dragging=false;rz.classList.remove('active');
    document.body.style.userSelect='';
  });
})();
