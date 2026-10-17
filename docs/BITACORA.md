# 📔 Bitácora de Desarrollo de FlowStudio

Este archivo es un registro cronológico de todo el trabajo realizado 
en el proyecto. Añade una nueva sección al principio (o al final) por 
cada sesión de trabajo.

---

## 📅 Sesión 1 (16 de Octubre de 2024) - El Gran Refactor
**Responsable:** Juan + IA
**Objetivo:** Refactorizar el monolito de 4.110 líneas y poner la app online.

**Trabajo realizado:**
1. **Análisis:** Se identificaron los bloques del script original.
2. **Estructura:** Se creó la carpeta `css/` (10 archivos) y `js/` (11 archivos).
3. **Migración CSS:** Se extrajo todo el `<style>` a módulos.
4. **Migración JS:** Se separó el código en módulos ES6.
   - Se implementó el **Patrón Observer** en `core.js` para evitar 
     dependencias circulares.
   - Se movió `download` a `core.js`.
   - Se ajustaron los popovers (iconos en 2 columnas) y el botón de modo oscuro.
5. **GitHub:** Se inicializó Git, se subió a GitHub y se activó GitHub Pages.
6. **Renombre:** Se cambió `FlowStudio.html` por `index.html` para 
   que la URL de Pages funcione limpia.

**Estado al finalizar:** 
La app está 100% funcional, modular, online y sin errores en consola. 
La arquitectura es estable.

---

## 📅 Sesión 2 (17 de Octubre de 2026) - Corrección de bugs y documentación
**Responsable:** Juan + IA
**Objetivo:** Documentar el proyecto y corregir las vistas JSON y Markdown.

**Trabajo realizado:**
1. Se crearon `docs/HANDOFF.md` y `docs/BITACORA.md` para facilitar la continuidad del proyecto.
2. Se corrigió el bug de las pestañas JSON y Markdown en `views.js`: se importó `toMarkdown` y se añadió un serializador local para la vista JSON.

**Estado al finalizar:**
La app queda 100% funcional.

---
