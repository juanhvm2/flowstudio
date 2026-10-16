/* =========================================================
   ARCHIVO: core.js
   CONTENIDO: Utilidades base, estado global, tema, toasts y
              patrón observer para comunicación entre módulos.
   DEPENDENCIAS: ninguna (es la base del proyecto)
   ========================================================= */

export const $ = s => document.querySelector(s);
export const $$ = s => [...document.querySelectorAll(s)];
export const uid = () => 'n' + Math.random().toString(36).slice(2,9);
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export const state={
  templateId:'files',
  projectName:'mi-proyecto',
  root:null,
  selectedId:null,
  collapsed:new Set(),
  view:'nodes',
  device:'phone',
  zoom:1,
  zoomX:30,
  zoomY:30,
  _centered:false,
  theme:localStorage.getItem('fs-theme')||'light',
  fileHandle:null,
  dirty:true,
  inspectorOpen:localStorage.getItem('fs-inspector')==='1',
  pinDrag:null
};

export function applyTheme(){
  document.documentElement.setAttribute('data-theme',state.theme);
  $('#btnTheme').textContent=state.theme==='dark'?'☀️':'🌙';
  localStorage.setItem('fs-theme',state.theme);
}

let toastTimer;
export function toast(msg,icon='✓'){
  const t=$('#toast');
  t.innerHTML=`<span>${icon}</span><span>${esc(msg)}</span>`;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}

const _dirtySubs = [];
const _renderSubs = [];

export function onDirty(fn) { _dirtySubs.push(fn); }
export function onRender(fn) { _renderSubs.push(fn); }
export function emitDirty() { _dirtySubs.forEach(f => f()); }
export function emitRender() { _renderSubs.forEach(f => f()); }
