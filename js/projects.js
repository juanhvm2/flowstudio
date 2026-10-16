/* =========================================================
   ARCHIVO: projects.js
   CONTENIDO: Guardar/abrir proyectos en disco, gestión de
              proyectos recientes (localStorage), estado dirty,
              modal y listeners relacionados.
   DEPENDENCIAS: core.js, tree.js, views.js, templates.js
   ========================================================= */

import {
  state, $, $$, esc, toast, download, onDirty
} from './core.js';
import {
  hydrate, buildTypeSelect, renderTree, loadTemplate
} from './tree.js';
import { renderView } from './views.js';
import { TEMPLATES } from './templates.js';

export function serialize(node){
  const o={name:node.name,type:node.type};
  if(node.icon)o.icon=node.icon;
  if(node.description)o.description=node.description;
  if(node.links&&node.links.length)o.links=[...node.links];
  o.children=node.children.map(serialize);
  return o;
}

export function buildProjectData(){
  return {
    app:'FlowStudio',
    version:1,
    savedAt:new Date().toISOString(),
    projectName:state.projectName,
    templateId:state.templateId,
    tree:serialize(state.root)
  };
}

export function markDirty(){
  if(state.dirty){updateFileStatus();return;}
  state.dirty=true;
  updateFileStatus();
}

export function markClean(){
  state.dirty=false;
  updateFileStatus();
}

export function updateFileStatus(){
  const fs=$('#fileStatus');
  if(!fs)return;
  fs.classList.toggle('dirty', state.dirty);
  fs.classList.toggle('saved', !state.dirty && !!state.fileHandle);
  const name = state.fileHandle ? state.fileHandle.name : 'Sin guardar';
  fs.querySelector('.fname').textContent = name;
  fs.title = state.fileHandle
    ? `Archivo: ${state.fileHandle.name}${state.dirty?' · cambios sin guardar':''}`
    : 'Proyecto no guardado en disco';
  document.title = (state.dirty?'● ':'') + (state.projectName||'FlowStudio') + ' — FlowStudio';
}

export const HAS_FS_API = 'showSaveFilePicker' in window;

export async function openProjectFile(){
  if(!HAS_FS_API){ $('#fileInput').click(); return; }
  try{
    const [handle] = await window.showOpenFilePicker({
      types:[{description:'Proyecto FlowStudio',
              accept:{'application/json':['.flowstudio','.json']}}],
      multiple:false
    });
    const file = await handle.getFile();
    const text = await file.text();
    if(applyLoadedProject(text, handle)) toast('Abierto: '+handle.name,'📂');
  }catch(e){
    if(e.name!=='AbortError') toast('Error: '+e.message,'⚠️');
  }
}

export async function saveProjectAs(){
  if(!HAS_FS_API){
    const base=(state.projectName||'proyecto').replace(/[^a-z0-9\-_]/gi,'-');
    download(base+'.flowstudio',JSON.stringify(buildProjectData(),null,2),'application/json');
    markClean();
    toast('Descargado: '+base+'.flowstudio','💾');
    return;
  }
  try{
    const base=(state.projectName||'proyecto').replace(/[^a-z0-9\-_]/gi,'-');
    const handle=await window.showSaveFilePicker({
      suggestedName:base+'.flowstudio',
      types:[{description:'Proyecto FlowStudio',
              accept:{'application/json':['.flowstudio','.json']}}]
    });
    state.fileHandle=handle;
    await writeToHandle(handle);
  }catch(e){
    if(e.name!=='AbortError') toast('Error: '+e.message,'⚠️');
  }
}

export async function saveProject(){
  if(!state.fileHandle) return saveProjectAs();
  await writeToHandle(state.fileHandle);
}

async function writeToHandle(handle){
  try{
    const w=await handle.createWritable();
    await w.write(JSON.stringify(buildProjectData(),null,2));
    await w.close();
    markClean();
    toast('Guardado: '+handle.name,'💾');
  }catch(e){
    toast('Error al guardar: '+e.message,'⚠️');
  }
}

export function applyLoadedProject(text, handle){
  try{
    const data=JSON.parse(text);
    const tree=data.tree||data;
    if(!tree||!tree.name) throw new Error('Formato no reconocido');
    state.root=hydrate(tree);
    state.projectName=data.projectName||data.project?.name||tree.name;
    state.templateId=data.templateId||data.project?.template_id||state.templateId;
    state.selectedId=state.root.id;
    state.collapsed=new Set();
    state._centered=false;state.zoom=1;state.zoomX=30;state.zoomY=30;
    state.fileHandle=handle||null;
    $('#projName').value=state.projectName;
    const tpl=TEMPLATES.find(t=>t.id===state.templateId)||TEMPLATES[0];
    $('#tplIcon').textContent=tpl.icon;
    $('#tplName').textContent=tpl.name;
    buildTypeSelect();
    renderTree();
    renderView();
    markClean();
    return true;
  }catch(err){
    toast('Error al abrir: '+err.message,'⚠️');
    return false;
  }
}

export const STORE_KEY='fs-projects';

export function getProjects(){
  try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}');}catch{return {};}
}
export function saveProjects(p){localStorage.setItem(STORE_KEY,JSON.stringify(p));}

$('#btnOpen').addEventListener('click', openProjectFile);
$('#btnSave').addEventListener('click', saveProject);
$('#btnSaveAs').addEventListener('click', saveProjectAs);

$('#btnNew').addEventListener('click',()=>{
  if(state.dirty && !confirm('Tienes cambios sin guardar. ¿Crear un proyecto nuevo igualmente?')) return;
  state.fileHandle=null;
  loadTemplate(state.templateId,true);
  markDirty();
  toast('Proyecto nuevo','✨');
});

$('#fileInput').addEventListener('change',e=>{
  const f=e.target.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=()=>{ if(applyLoadedProject(r.result,null)) toast('Importado: '+f.name,'📥'); };
  r.readAsText(f);
  e.target.value='';
});

$('#projName').addEventListener('input',e=>{
  state.projectName=e.target.value||'sin-nombre';
  markDirty();
});

$('#btnProjects').addEventListener('click',()=>{
  const projects=getProjects();
  const keys=Object.keys(projects);
  const body=$('#modalBody');
  if(!keys.length){
    body.innerHTML='<div class="empty-state"><div class="big">📁</div>No hay proyectos guardados todavía</div>';
  }else{
    body.innerHTML=keys.map(k=>{
      const p=projects[k];
      const tpl=TEMPLATES.find(t=>t.id===p.templateId)||TEMPLATES[0];
      const d=new Date(p.savedAt);
      return `<div class="proj-item" data-key="${esc(k)}">
        <span class="pi-ic">${tpl.icon}</span>
        <span class="pi-tx"><b>${esc(p.projectName)}</b>
          <small>${tpl.name} · ${d.toLocaleDateString()} ${d.toLocaleTimeString().slice(0,5)}</small></span>
        <button class="pi-del" title="Eliminar">✕</button>
      </div>`;
    }).join('');
    body.querySelectorAll('.proj-item').forEach(it=>{
      it.addEventListener('click',e=>{
        if(e.target.closest('.pi-del')){
          e.stopPropagation();
          const k=it.dataset.key;
          if(!confirm('¿Eliminar proyecto "'+k+'"?'))return;
          const projects=getProjects();delete projects[k];saveProjects(projects);
          $('#btnProjects').click();
          return;
        }
        const k=it.dataset.key;
        const projects=getProjects();
        const p=projects[k];
        if(!p)return;
        state.projectName=p.projectName;
        state.templateId=p.templateId;
        state.root=hydrate(p.tree);
        state.selectedId=state.root.id;
        state.collapsed=new Set();
        $('#projName').value=state.projectName;
        const tpl=TEMPLATES.find(t=>t.id===state.templateId)||TEMPLATES[0];
        $('#tplIcon').textContent=tpl.icon;
        $('#tplName').textContent=tpl.name;
        buildTypeSelect();
        renderTree();renderView();
        state.fileHandle=null;
        markDirty();
        $('#overlay').classList.add('hidden');
        toast('Proyecto cargado','📂');
      });
    });
  }
  $('#overlay').classList.remove('hidden');
});

$('#modalClose').addEventListener('click',()=>$('#overlay').classList.add('hidden'));
$('#overlay').addEventListener('click',e=>{if(e.target.id==='overlay')$('#overlay').classList.add('hidden');});

/* Conexión con el patrón observer:
   Cualquier emitDirty() de cualquier módulo marca el proyecto
   como sucio y actualiza el indicador visual. */
onDirty(() => markDirty());
