/* =========================================================
   ARCHIVO: export.js
   CONTENIDO: Todos los formatos de exportación (JSON, IA-JSON,
              Markdown, IA-Markdown, ASCII, CSV, Mermaid, SVG,
              HTML) + dispatcher + menú desplegable.
   DEPENDENCIAS: core.js, tree.js, interactions.js
   ========================================================= */

import { state, $, esc, toast, download } from './core.js';
import {
  typeOf, walk, findNode, findParent, getTemplate, countAll
} from './tree.js';
import { NODE_W, NODE_H, computeLayout } from './interactions.js';

function serialize(node){
  const o={name:node.name,type:node.type};
  if(node.icon)o.icon=node.icon;
  if(node.description)o.description=node.description;
  if(node.links&&node.links.length)o.links=[...node.links];
  o.children=node.children.map(serialize);
  return o;
}

function buildOutline(node,depth){
  const tp=typeOf(node.type);
  const ind='  '.repeat(depth);
  let s=`${ind}${depth?'└─ ':''}${tp.icon} ${node.name}  [${tp.label}]\n`;
  node.children.forEach(c=>{s+=buildOutline(c,depth+1);});
  return s;
}

export function doExport(fmt){
  const name=state.projectName||'proyecto';
  let content='',file='',mime='text/plain';
  switch(fmt){
    case 'ai-json':
      content=toAIJSON();file=`${name}-IA.json`;mime='application/json';break;
    case 'ai-md':
      content=toAIMarkdown();file=`${name}-IA.md`;mime='text/markdown';break;
    case 'json':
      content=JSON.stringify({
        version:1,exported:new Date().toISOString(),
        templateId:state.templateId,projectName:state.projectName,
        template:getTemplate().name,tree:serialize(state.root)
      },null,2);
      file=`${name}.json`;mime='application/json';break;
    case 'md':content=toMarkdown(false);file=`${name}.md`;mime='text/markdown';break;
    case 'txt':content=toASCII();file=`${name}.txt`;break;
    case 'csv':content=toCSV();file=`${name}.csv`;mime='text/csv';break;
    case 'mmd':content=toMermaid();file=`${name}.mmd`;break;
    case 'svg':content=toSVG();file=`${name}.svg`;mime='image/svg+xml';break;
    case 'html':content=toHTML();file=`${name}.html`;mime='text/html';break;
  }
  download(file,content,mime);
  toast('Exportado: '+fmt.toUpperCase(),'📤');
}

export function toAIJSON(){
  const tpl=getTemplate();
  const typeDict={};
  Object.entries(tpl.types).forEach(([k,v])=>{
    typeDict[k]={label:v.label,icon:v.icon,color:v.color};
  });
  function ser(node,parentPath=''){
    const tp=typeOf(node.type);
    const path=parentPath?parentPath+' / '+node.name:node.name;
    return {
      id:node.id,
      name:node.name,
      type:node.type,
      type_label:tp.label,
      path,
      depth:path.split(' / ').length-1,
      children_count:node.children.length,
      children:node.children.map(c=>ser(c,path))
    };
  }
  const payload={
    _schema:'flowstudio/v1',
    _purpose:'Semantic tree structure exported for LLM/AI consumption. The "tree" field is a hierarchical JSON. Each node has name, type (enum), type_label (human readable), path (full), depth and children.',
    _ai_instructions:{
      es:'Esta es una estructura jerárquica de tipo "'+tpl.name+'". Puedes usarla para: generar código, redactar documentación, planificar tareas, revisar consistencia, o proponer mejoras. Respeta la jerarquía padre-hijo. El campo "type" indica la naturaleza de cada nodo.',
      en:'This is a hierarchical structure of type "'+tpl.name+'". Use it to: generate code, write documentation, plan tasks, review consistency or propose improvements. Respect parent-child hierarchy. The "type" field indicates the nature of each node.'
    },
    project:{
      name:state.projectName,
      template_id:state.templateId,
      template_name:tpl.name,
      template_description:tpl.desc,
      group:tpl.group,
      exported_at:new Date().toISOString(),
      total_nodes:countAll(state.root),
      max_depth:getMaxDepth(state.root)
    },
    type_dictionary:typeDict,
    tree:ser(state.root)
  };
  return JSON.stringify(payload,null,2);
}

function getMaxDepth(node,d=0){
  if(!node.children.length)return d;
  return Math.max(...node.children.map(c=>getMaxDepth(c,d+1)));
}

export function toAIMarkdown(){
  const tpl=getTemplate();
  const lines=[];
  lines.push(`# ${state.projectName}`);
  lines.push('');
  lines.push(`> **Plantilla:** ${tpl.name} · **Rubro:** ${tpl.group}`);
  lines.push(`> **Descripción:** ${tpl.desc}`);
  lines.push('');
  lines.push('## 🤖 Instrucciones para IA / LLM');
  lines.push('');
  lines.push('Este documento describe una **estructura jerárquica** exportada desde FlowStudio. Cada nivel de sangría representa una relación padre → hijo. Los iconos y etiquetas entre corchetes indican el tipo de cada elemento.');
  lines.push('');
  lines.push('**Usos recomendados:**');
  lines.push('- Generar código, contenido o documentación basada en la estructura');
  lines.push('- Planificar tareas, estimaciones y dependencias');
  lines.push('- Detectar huecos, redundancias o inconsistencias');
  lines.push('- Proponer mejoras o reorganizaciones');
  lines.push('');
  lines.push(`**Metadatos:** ${countAll(state.root)} nodos totales · profundidad máxima ${getMaxDepth(state.root)} · rubro *${tpl.group}*`);
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 🌳 Estructura');
  lines.push('');
  lines.push(mdTree(state.root,0,tpl));
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 📋 Listado tabular (para procesamiento)');
  lines.push('');
  lines.push('| # | Profundidad | Tipo | Nombre | Ruta |');
  lines.push('|---|-------------|------|--------|------|');
  let i=0;
  walk(state.root,(node,depth)=>{
    const tp=typeOf(node.type);
    const pathNodes=[];
    let cur=node;
    while(cur!==state.root){const p=findParent(cur.id);if(!p)break;pathNodes.unshift(p.name);cur=p;}
    const path=pathNodes.join(' / ')||'—';
    i++;
    lines.push(`| ${i} | ${depth} | ${tp.label} | ${node.name} | ${path} |`);
  });
  return lines.join('\n');
}

function mdTree(node,depth,tpl){
  const tp=typeOf(node.type);
  const indent='  '.repeat(depth);
  const bullet=depth===0?'':'- ';
  const bold=depth<2?'**':'';
  return `${indent}${bullet}${tp.icon} ${bold}${node.name}${bold} *(${tp.label})*\n` +
    node.children.map(c=>mdTree(c,depth+1,tpl)).join('');
}

export function toMarkdown(withAI){
  const tpl=getTemplate();
  const lines=[];
  lines.push(`# ${state.projectName}`);
  lines.push('');
  lines.push(`**Plantilla:** ${tpl.name}`);
  lines.push(`**Rubro:** ${tpl.group}`);
  lines.push(`**Nodos:** ${countAll(state.root)}`);
  lines.push('');
  lines.push('## Estructura');
  lines.push('');
  function rec(node,depth){
    const tp=typeOf(node.type);
    lines.push(`${'  '.repeat(depth)}- ${tp.icon} **${node.name}** _(${tp.label})_`);
    node.children.forEach(c=>rec(c,depth+1));
  }
  rec(state.root,0);
  return lines.join('\n');
}

export function toASCII(){
  const lines=[];
  function rec(node,prefix='',isLast=true){
    const tp=typeOf(node.type);
    lines.push(prefix+(prefix?'└─ ':'')+tp.icon+' '+node.name);
    const kids=node.children;
    const newPrefix=prefix+(isLast?'   ':'│  ');
    kids.forEach((c,i)=>rec(c,prefix?newPrefix:(prefix+''),i===kids.length-1));
  }
  rec(state.root);
  return lines.join('\n');
}

export function toCSV(){
  const rows=[['Profundidad','Tipo','Nombre','Ruta','Nº hijos']];
  walk(state.root,(node,depth)=>{
    const tp=typeOf(node.type);
    const pathNodes=[];
    let cur=node;
    while(cur!==state.root){const p=findParent(cur.id);if(!p)break;pathNodes.unshift(p.name);cur=p;}
    rows.push([depth,tp.label,node.name,pathNodes.join(' / ')||'—',node.children.length]);
  });
  return rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
}

export function toMermaid(){
  const lines=['flowchart TD'];
  const ids=new Map();
  let counter=0;
  function getId(n){if(!ids.has(n.id)){ids.set(n.id,'N'+(counter++));}return ids.get(n.id);}
  function label(n){
    const tp=typeOf(n.type);
    return `${tp.icon} ${n.name}`.replace(/["'`]/g,'');
  }
  walk(state.root,(node)=>{
    const id=getId(node);
    lines.push(`  ${id}["${label(node)}"]`);
    node.children.forEach(c=>{
      lines.push(`  ${id} --> ${getId(c)}`);
    });
  });
  return lines.join('\n');
}

export function toSVG(){
  const layout=computeLayout();
  const pad=30;
  const W=layout.width+pad*2,H=layout.height+pad*2;
  const parts=[];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">`);
  parts.push(`<rect width="${W}" height="${H}" fill="#ffffff"/>`);
  walk(state.root,node=>{
    if(state.collapsed.has(node.id))return;
    const p=layout.positions.get(node.id);
    node.children.forEach(c=>{
      const cp=layout.positions.get(c.id);
      if(!cp)return;
      const x1=p.x+NODE_W+pad,y1=p.y+NODE_H/2+pad;
      const x2=cp.x+pad,y2=cp.y+NODE_H/2+pad;
      const mid=(x1+x2)/2;
      parts.push(`<path d="M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}" fill="none" stroke="#c7c7cc" stroke-width="1.5"/>`);
    });
  });
  walk(state.root,node=>{
    const p=layout.positions.get(node.id);
    if(!p)return;
    const tp=typeOf(node.type);
    const x=p.x+pad,y=p.y+pad;
    parts.push(`<g transform="translate(${x},${y})">`);
    parts.push(`<rect width="${NODE_W}" height="${NODE_H}" rx="12" fill="#ffffff" stroke="#e5e5ea"/>`);
    parts.push(`<rect width="3" height="${NODE_H}" fill="${tp.color}"/>`);
    parts.push(`<text x="14" y="21" font-size="16">${esc(tp.icon)}</text>`);
    parts.push(`<text x="38" y="21" font-size="13" font-weight="600" fill="#1d1d1f">${esc(node.name.slice(0,26))}</text>`);
    parts.push(`<text x="38" y="38" font-size="10" fill="#8e8e93">${esc(tp.label)}</text>`);
    parts.push(`</g>`);
  });
  parts.push('</svg>');
  return parts.join('\n');
}

export function toHTML(){
  const tpl=getTemplate();
  const tree=buildOutline(state.root,0);
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8">
<title>${esc(state.projectName)}</title>
<style>
  body{margin:0;background:#f2f2f7;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#1d1d1f;padding:40px}
  .card{max-width:960px;margin:0 auto;background:#fff;border-radius:20px;padding:32px;box-shadow:0 20px 60px rgba(0,0,0,.08)}
  h1{margin:0 0 8px;font-size:26px;letter-spacing:-.5px}
  .sub{color:#6e6e73;font-size:13px;margin-bottom:24px}
  pre{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;line-height:1.8;background:#fbfbfd;padding:20px;border-radius:12px;overflow:auto;border:1px solid #e5e5ea}
  .badge{display:inline-block;background:rgba(0,113,227,.1);color:#0071e3;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;margin-right:6px}
</style></head><body>
<div class="card">
  <h1>${esc(state.projectName)}</h1>
  <div class="sub"><span class="badge">${esc(tpl.group)}</span><span class="badge">${esc(tpl.name)}</span></div>
  <pre>${esc(tree)}</pre>
</div>
</body></html>`;
}

$('#btnExport').addEventListener('click',e=>{
  e.stopPropagation();
  $('#exportMenu').classList.toggle('hidden');
});
$('#exportMenu').addEventListener('click',e=>{
  const b=e.target.closest('.dd-item');
  if(!b)return;
  $('#exportMenu').classList.add('hidden');
  doExport(b.dataset.fmt);
});
