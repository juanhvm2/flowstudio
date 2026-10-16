/* =========================================================
   ARCHIVO: main.js
   CONTENIDO: Punto de entrada de la aplicación. Importa todos 
              los módulos (para registrar sus listeners), conecta 
              el patrón observer y ejecuta el bootstrap.
   DEPENDENCIAS: todos los módulos del proyecto
   ========================================================= */

/* ─── 1. IMPORTS DE EFECTOS SECUNDARIOS ───
   Importar estos módulos REGISTRA sus listeners de botones a nivel 
   de módulo. Es imprescindible importarlos aunque no usemos nada 
   directo de ellos. */

import './core.js';
import './data.js';
import './templates.js';
import './tree.js';
import './views.js';
import './interactions.js';
import './inspector.js';
import './projects.js';
import './export.js';

/* ─── 2. IMPORTS DE SÍMBOLOS QUE USAMOS EN EL BOOTSTRAP ─── */

import { state, applyTheme, onDirty, onRender } from './core.js';
import { renderTree, loadTemplate, renderTplList } from './tree.js';
import { renderView } from './views.js';
import { toggleInspector, renderInspector } from './inspector.js';
import { 
  markDirty, updateFileStatus, saveProject, saveProjectAs, 
  openProjectFile 
} from './projects.js';

/* ─── 3. CONEXIÓN CON EL PATRÓN OBSERVER ───
   Este es el corazón del sistema. Cuando cualquier módulo llama a 
   emitDirty() o emitRender(), aquí se conectan las respuestas. */

onDirty(() => {
  markDirty();
  updateFileStatus();
});

onRender(() => {
  renderTree();
  renderView();
  renderInspector();
});

/* ─── 4. ATAJOS DE TECLADO GLOBALES ─── */

document.addEventListener('keydown', e => {
  const cmd = e.metaKey || e.ctrlKey;
  const inField = e.target.matches('input,textarea');

  // Ctrl/Cmd + S → guardar
  if (cmd && e.key.toLowerCase() === 's') {
    e.preventDefault();
    e.shiftKey ? saveProjectAs() : saveProject();
    return;
  }

  // Ctrl/Cmd + O → abrir
  if (cmd && e.key.toLowerCase() === 'o') {
    e.preventDefault();
    openProjectFile();
    return;
  }

  // Ctrl/Cmd + N → nuevo
  if (cmd && e.key.toLowerCase() === 'n') {
    e.preventDefault();
    document.getElementById('btnNew').click();
    return;
  }

  // Ctrl/Cmd + I → toggle inspector
  if (cmd && e.key.toLowerCase() === 'i') {
    e.preventDefault();
    toggleInspector();
    return;
  }

  if (inField) return;

  // Tecla Suprimir → eliminar nodo seleccionado
  if (e.key === 'Delete' && state.selectedId) {
    const btn = document.querySelector(
      `.trow[data-id="${state.selectedId}"] [data-act="del"]`
    );
    if (btn) btn.click();
  }
});

/* ─── 5. LISTENERS GLOBALES DE VENTANA ─── */

// Aviso al cerrar la pestaña si hay cambios sin guardar
window.addEventListener('beforeunload', e => {
  if (state.dirty) {
    e.preventDefault();
    e.returnValue = '';
  }
});

// Recalcular vista al redimensionar la ventana
let _resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(() => {
    if (state.view === 'nodes' || state.view === 'screens') {
      renderView();
    }
  }, 220);
});

/* ─── 6. BOOTSTRAP ─── */

// 1. Aplicar tema guardado
applyTheme();

// 2. Cargar la plantilla por defecto
loadTemplate('files', true);

// 3. Renderizar la lista de plantillas en el selector
renderTplList('');

// 4. Aplicar el estado del inspector si estaba abierto
if (state.inspectorOpen) {
  document.getElementById('inspectorPanel').classList.remove('hidden');
  document.getElementById('resizerInspector').classList.remove('hidden');
}
renderInspector();

// 5. Actualizar el indicador de estado del archivo
updateFileStatus();

// Botón de cambio de tema
document.getElementById('btnTheme').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
  renderView();
});

// 6. Log de confirmación
console.log('[FlowStudio] App inicializada con módulos ES');
