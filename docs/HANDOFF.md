# 🤝 Handoff del Proyecto: FlowStudio

¡Bienvenido/a! Si eres una IA o un desarrollador leyendo esto, estás 
a cargo de **FlowStudio**, una aplicación web para crear diagramas 
jerárquicos (flujos de carpetas, apps, eventos, recetas, etc.).

## 📌 Reglas de Oro para el Próximo Responsable
1. **LEE PRIMERO:** Antes de escribir una sola línea de código, lee 
   este archivo (`HANDOFF.md`) y el historial (`BITACORA.md`).
2. **AL TERMINAR LA SESIÓN:** Debes actualizar `BITACORA.md` con lo 
   que hiciste hoy y actualizar la sección "Tareas Pendientes" de 
   este `HANDOFF.md`.
3. **NO ROMPER LOS MÓDULOS:** La app usa ES Modules (`import/export`). 
   No vuelvas a meter todo el código en `index.html`.

## 🏗️ Arquitectura Actual (Post-Refactorización)
- `index.html`: Solo estructura y un `<script type="module" src="js/main.js">`. 
  (136 líneas).
- `css/`: 10 archivos organizados por responsabilidad (variables, layout, componentes, etc.).
- `js/`: 11 archivos modulares:
  - `core.js`: Estado global, utilidades ($, esc), tema, toasts, y el patrón Observer.
  - `data.js` y `templates.js`: Contienen los datos estáticos y las 74 plantillas.
  - `tree.js`: Lógica del árbol de la izquierda.
  - `views.js`: Router de vistas y renderizado (Nodos, Pantallas, JSON, etc.).
  - `interactions.js`: Pan, zoom, pines, conexiones SVG y popovers.
  - `inspector.js`: Panel de descripción en vivo.
  - `projects.js`: Guardar/abrir archivos en disco y localStorage.
  - `export.js`: 9 formatos de exportación.
  - `main.js`: Punto de entrada que conecta todo.

## 🧠 Patrón de Comunicación (CRÍTICO)
Para evitar dependencias circulares, usamos el **Patrón Observer** 
definido en `core.js`:
- Cuando un módulo modifica el estado, llama a `emitDirty()`.
- Cuando necesita redibujar la pantalla, llama a `emitRender()`.
- `main.js` está suscrito a estos eventos y se encarga de ejecutar 
  `markDirty()` y `renderView()` globalmente.
**No importes `renderView` directamente en `tree.js` o `interactions.js`.**

## 🌐 Entornos y Flujo de Trabajo
- **Local:** Usar Live Server en VSCode (puerto 5500).
- **Online:** GitHub Pages activo en `https://juanhvm2.github.io/flowstudio/`
- **Git:** Hacer `git add .`, `git commit -m "mensaje"`, `git push`.

## 🎯 Tareas Pendientes (Actualizar al terminar cada sesión)
- [ ] Próxima sesión: escribir un `README.md` profesional en la raíz del proyecto.
- [ ] Añadir un archivo `LICENSE`.
- [ ] Mejorar accesibilidad y atajos de teclado.
- [ ] (Añadir más aquí según se necesite)

**Nota para la próxima sesión:** Las vistas JSON y Markdown fueron corregidas; se importó `toMarkdown` y se implementó un serializador local del árbol en `views.js`. La app quedó funcional tras la corrección.
