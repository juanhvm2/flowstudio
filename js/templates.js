/* =========================================================
   ARCHIVO: templates.js
   CONTENIDO: Catálogo completo de las 74 plantillas de FlowStudio,
              organizadas en 24 rubros. Cada plantilla define sus
              tipos de nodo y su árbol por defecto.
   DEPENDENCIAS: data.js (para ty y C)
   ========================================================= */
import { ty, C } from './data.js';

export const TEMPLATES=[
/* ─────────── DESARROLLO ─────────── */
{id:'files',name:'Flujo de Carpetas y Archivos',icon:'📁',group:'💻 Desarrollo',
 desc:'Estructura de directorios, subcarpetas y archivos de un proyecto.',
 types:{root:ty('Raíz del proyecto','🗂️',C.blue),folder:ty('Carpeta','📁',C.blue),
   subfolder:ty('Subcarpeta','📂',C.indigo),code:ty('Archivo de código','📜',C.green),
   asset:ty('Recurso','🖼️',C.purple),config:ty('Configuración','⚙️',C.orange),
   doc:ty('Documentación','📄',C.gray),data:ty('Datos','🗃️',C.teal)},
 tree:{name:'mi-proyecto',type:'root',children:[
  {name:'src',type:'folder',children:[
   {name:'components',type:'subfolder',children:[
    {name:'Header.jsx',type:'code'},{name:'Footer.jsx',type:'code'},{name:'Button.jsx',type:'code'}]},
   {name:'pages',type:'subfolder',children:[{name:'Home.jsx',type:'code'},{name:'About.jsx',type:'code'}]},
   {name:'styles',type:'subfolder',children:[{name:'main.css',type:'asset'}]},
   {name:'App.jsx',type:'code'},{name:'index.js',type:'code'}]},
  {name:'public',type:'folder',children:[{name:'favicon.ico',type:'asset'},{name:'robots.txt',type:'config'}]},
  {name:'docs',type:'folder',children:[{name:'guia-instalacion.md',type:'doc'}]},
  {name:'package.json',type:'config'},{name:'README.md',type:'doc'}]}},

{id:'react',name:'Estructura Proyecto React',icon:'⚛️',group:'💻 Desarrollo',
 desc:'Organización por features, componentes, hooks, servicios y estado.',
 types:{root:ty('Proyecto','⚛️',C.blue),feature:ty('Feature','🧩',C.indigo),
  component:ty('Componente','🧱',C.purple),hook:ty('Hook','🪝',C.green),
  service:ty('Servicio API','🔌',C.orange),store:ty('Store','🗃️',C.teal),test:ty('Test','🧪',C.gray)},
 tree:{name:'frontend',type:'root',children:[
  {name:'features/auth',type:'feature',children:[
   {name:'LoginForm.tsx',type:'component'},{name:'useAuth.ts',type:'hook'},
   {name:'authService.ts',type:'service'},{name:'authSlice.ts',type:'store'},
   {name:'LoginForm.test.tsx',type:'test'}]},
  {name:'features/catalog',type:'feature',children:[
   {name:'ProductGrid.tsx',type:'component'},{name:'ProductCard.tsx',type:'component'},
   {name:'useProducts.ts',type:'hook'},{name:'catalogService.ts',type:'service'}]},
  {name:'shared/ui',type:'feature',children:[
   {name:'Button.tsx',type:'component'},{name:'Modal.tsx',type:'component'},{name:'Input.tsx',type:'component'}]},
  {name:'shared/hooks',type:'feature',children:[
   {name:'useDebounce.ts',type:'hook'},{name:'useMediaQuery.ts',type:'hook'}]}]}},

{id:'cicd',name:'Pipeline CI/CD',icon:'🚀',group:'💻 Desarrollo',
 desc:'Etapas de integración y despliegue continuo con entornos y pruebas.',
 types:{repo:ty('Repositorio','📦',C.blue),stage:ty('Etapa','🪜',C.indigo),
  job:ty('Job','⚙️',C.teal),test:ty('Prueba','🧪',C.green),deploy:ty('Despliegue','🚀',C.orange),
  env:ty('Entorno','🖥️',C.purple),gate:ty('Aprobación','🔒',C.red)},
 tree:{name:'Pipeline principal',type:'repo',children:[
  {name:'Build',type:'stage',children:[
   {name:'Instalar dependencias',type:'job'},{name:'Compilar TypeScript',type:'job'}]},
  {name:'Test',type:'stage',children:[
   {name:'Unit tests (Jest)',type:'test'},{name:'E2E (Playwright)',type:'test'},
   {name:'Cobertura > 80%',type:'gate'}]},
  {name:'Staging',type:'stage',children:[
   {name:'Deploy a Staging',type:'deploy'},{name:'Entorno: staging.app.com',type:'env'},
   {name:'Smoke tests',type:'test'}]},
  {name:'Producción',type:'stage',children:[
   {name:'Aprobación manual',type:'gate'},{name:'Blue/Green deploy',type:'deploy'},
   {name:'Entorno: app.com',type:'env'},{name:'Rollback automático',type:'job'}]}]}},

{id:'git',name:'Estrategia de Ramas Git',icon:'🌿',group:'💻 Desarrollo',
 desc:'Ramas principales, features, hotfixes y releases con flujo GitFlow.',
 types:{main:ty('Rama principal','🌳',C.blue),develop:ty('Develop','🌿',C.green),
  feature:ty('Feature','✨',C.purple),release:ty('Release','📦',C.orange),
  hotfix:ty('Hotfix','🚨',C.red),tag:ty('Tag','🏷️',C.teal)},
 tree:{name:'main',type:'main',children:[
  {name:'develop',type:'develop',children:[
   {name:'feature/login-social',type:'feature'},
   {name:'feature/carrito',type:'feature'},
   {name:'feature/perfil-usuario',type:'feature'},
   {name:'release/v2.3.0',type:'release',children:[
    {name:'hotfix/checkout-error',type:'hotfix'},{name:'tag v2.3.0',type:'tag'}]},
   {name:'release/v2.4.0',type:'release'}]},
  {name:'hotfix/security-patch',type:'hotfix',children:[{name:'tag v2.2.1',type:'tag'}]}]}},

/* ─────────── PRODUCTO ─────────── */
{id:'app',name:'Flujo de Aplicación Móvil',icon:'📱',group:'📱 Producto',
 desc:'Pantallas, subpantallas y acciones interactivas de una app móvil.',
 types:{app:ty('Aplicación','📱',C.blue),screen:ty('Pantalla','🖥️',C.indigo),
  subscreen:ty('Subpantalla','🪟',C.purple),action:ty('Acción interactiva','⚡',C.orange),
  modal:ty('Modal','🗔',C.pink),nav:ty('Navegación','🧭',C.teal),state:ty('Estado','🔄',C.green)},
 tree:{name:'Mi App',type:'app',children:[
  {name:'Onboarding',type:'nav',children:[
   {name:'Splash',type:'screen'},
   {name:'Login / Registro',type:'screen',children:[
    {name:'Validar correo',type:'action'},{name:'Recuperar contraseña',type:'modal'},
    {name:'Login con Google',type:'action'}]},
   {name:'Permisos del sistema',type:'screen'}]},
  {name:'Inicio (Tab)',type:'screen',children:[
   {name:'Feed principal',type:'subscreen',children:[
    {name:'Detalle de publicación',type:'subscreen'},{name:'Comentarios',type:'modal'},
    {name:'Compartir',type:'action'},{name:'Guardar en favoritos',type:'state'}]},
   {name:'Buscador',type:'subscreen'},{name:'Notificaciones',type:'subscreen'}]},
  {name:'Perfil',type:'screen',children:[
   {name:'Editar perfil',type:'subscreen'},
   {name:'Configuración',type:'subscreen',children:[
    {name:'Modo oscuro',type:'action'},{name:'Cerrar sesión',type:'action'}]}]}]}},

{id:'web',name:'Sitio Web',icon:'🌐',group:'📱 Producto',
 desc:'Mapa de páginas, secciones, componentes y llamadas a la acción.',
 types:{site:ty('Sitio','🌐',C.blue),page:ty('Página','📄',C.indigo),
  section:ty('Sección','🧱',C.purple),component:ty('Componente','🧩',C.teal),
  cta:ty('Llamada a la acción','🎯',C.orange),form:ty('Formulario','📝',C.green),
  legal:ty('Legal','⚖️',C.gray)},
 tree:{name:'Sitio corporativo',type:'site',children:[
  {name:'Inicio',type:'page',children:[
   {name:'Hero principal',type:'section',children:[{name:'CTA — Solicitar demo',type:'cta'}]},
   {name:'Servicios destacados',type:'section'},{name:'Testimonios',type:'component'},
   {name:'Logos de clientes',type:'component'},{name:'CTA final',type:'cta'}]},
  {name:'Nosotros',type:'page',children:[
   {name:'Historia',type:'section'},{name:'Equipo',type:'component'}]},
  {name:'Servicios',type:'page',children:[
   {name:'Detalle de servicio',type:'section'},{name:'Precios',type:'section'}]},
  {name:'Blog',type:'page',children:[
   {name:'Listado de artículos',type:'section'},{name:'Artículo individual',type:'section'}]},
  {name:'Contacto',type:'page',children:[
   {name:'Formulario de contacto',type:'form'},{name:'Mapa y ubicación',type:'component'}]},
  {name:'Legal',type:'legal',children:[
   {name:'Política de privacidad',type:'legal'},{name:'Términos',type:'legal'},
   {name:'Cookies',type:'legal'}]}]}},

{id:'design',name:'Design System',icon:'🎨',group:'📱 Producto',
 desc:'Fundamentos, tokens, componentes, patrones y documentación.',
 types:{system:ty('Sistema','🎨',C.blue),foundation:ty('Fundamento','🧱',C.indigo),
  token:ty('Token','🔹',C.teal),component:ty('Componente','🧩',C.purple),
  pattern:ty('Patrón','🧭',C.orange),doc:ty('Documentación','📘',C.gray)},
 tree:{name:'Design System',type:'system',children:[
  {name:'Fundamentos',type:'foundation',children:[
   {name:'Color',type:'token',children:[
    {name:'--color-primary',type:'token'},{name:'--color-surface',type:'token'}]},
   {name:'Tipografía',type:'token'},{name:'Espaciado 4/8/16/24',type:'token'},
   {name:'Radios y sombras',type:'token'}]},
  {name:'Componentes',type:'component',children:[
   {name:'Button',type:'component'},{name:'Input',type:'component'},
   {name:'Card',type:'component'},{name:'Modal',type:'component'},{name:'Toast',type:'component'}]},
  {name:'Patrones',type:'pattern',children:[
   {name:'Formularios',type:'pattern'},{name:'Navegación',type:'pattern'},
   {name:'Estados vacíos',type:'pattern'}]},
  {name:'Guías de uso',type:'doc'}]}},

{id:'ux',name:'Flujo de Usuario (UX)',icon:'🧠',group:'📱 Producto',
 desc:'Recorrido del usuario por etapas, puntos de contacto y emociones.',
 types:{journey:ty('Journey','🧠',C.blue),stage:ty('Etapa','🚩',C.indigo),
  touch:ty('Punto de contacto','📡',C.teal),action:ty('Acción del usuario','🏃',C.green),
  emotion:ty('Emoción','😊',C.yellow),pain:ty('Punto de dolor','⚠️',C.red),
  opportunity:ty('Oportunidad','💡',C.orange)},
 tree:{name:'Journey — Compra online',type:'journey',children:[
  {name:'1. Descubrimiento',type:'stage',children:[
   {name:'Anuncio en redes',type:'touch'},{name:'Busca en Google',type:'action'},
   {name:'Curiosidad 😊',type:'emotion'}]},
  {name:'2. Consideración',type:'stage',children:[
   {name:'Visita la landing',type:'touch'},{name:'Compara precios',type:'action'},
   {name:'Duda sobre la calidad ⚠️',type:'pain'},
   {name:'Mostrar reseñas 💡',type:'opportunity'}]},
  {name:'3. Compra',type:'stage',children:[
   {name:'Checkout',type:'touch'},{name:'Introduce datos de pago',type:'action'},
   {name:'Fricción en el formulario ⚠️',type:'pain'}]},
  {name:'4. Post-compra',type:'stage',children:[
   {name:'Email de confirmación',type:'touch'},{name:'Satisfacción 😊',type:'emotion'},
   {name:'Programa de referidos 💡',type:'opportunity'}]}]}},

/* ─────────── ARQUITECTURA ─────────── */
{id:'micro',name:'Arquitectura de Microservicios',icon:'🧬',group:'🏗️ Arquitectura',
 desc:'Servicios, gateway, colas, bases de datos y dependencias externas.',
 types:{gateway:ty('API Gateway','🚪',C.blue),service:ty('Microservicio','⚙️',C.indigo),
  db:ty('Base de datos','🗄️',C.green),queue:ty('Cola / Broker','📨',C.orange),
  cache:ty('Caché','⚡',C.yellow),external:ty('Servicio externo','🔌',C.gray),
  worker:ty('Worker','🔧',C.purple)},
 tree:{name:'Plataforma',type:'gateway',children:[
  {name:'Auth Service',type:'service',children:[
   {name:'PostgreSQL — usuarios',type:'db'},{name:'Redis — sesiones',type:'cache'}]},
  {name:'Catalog Service',type:'service',children:[
   {name:'MongoDB — productos',type:'db'},{name:'Redis — catálogo',type:'cache'}]},
  {name:'Order Service',type:'service',children:[
   {name:'PostgreSQL — pedidos',type:'db'},{name:'Kafka — order.created',type:'queue'}]},
  {name:'Payment Service',type:'service',children:[
   {name:'Stripe API',type:'external'},{name:'PostgreSQL — transacciones',type:'db'}]},
  {name:'Notification Worker',type:'worker',children:[
   {name:'SendGrid',type:'external'},{name:'Firebase Cloud Messaging',type:'external'}]},
  {name:'Analytics Worker',type:'worker',children:[{name:'ClickHouse',type:'db'}]}]}},

{id:'db',name:'Modelo de Base de Datos',icon:'🗄️',group:'🏗️ Arquitectura',
 desc:'Tablas, campos, relaciones e índices de un esquema relacional.',
 types:{db:ty('Base de datos','🗄️',C.blue),table:ty('Tabla','📋',C.indigo),
  field:ty('Campo','🔹',C.gray),relation:ty('Relación','🔗',C.purple),
  index:ty('Índice','⚡',C.orange),view:ty('Vista','👁️',C.teal)},
 tree:{name:'ecommerce_db',type:'db',children:[
  {name:'users',type:'table',children:[
   {name:'id — UUID PK',type:'field'},{name:'email — VARCHAR UNIQUE',type:'field'},
   {name:'password_hash',type:'field'},{name:'created_at',type:'field'},
   {name:'idx_users_email',type:'index'}]},
  {name:'orders',type:'table',children:[
   {name:'id — UUID PK',type:'field'},{name:'user_id — FK → users.id',type:'relation'},
   {name:'total — DECIMAL',type:'field'},{name:'status — ENUM',type:'field'},
   {name:'idx_orders_user',type:'index'}]},
  {name:'order_items',type:'table',children:[
   {name:'order_id — FK → orders.id',type:'relation'},
   {name:'product_id — FK → products.id',type:'relation'},{name:'quantity',type:'field'}]},
  {name:'products',type:'table',children:[
   {name:'id — UUID PK',type:'field'},{name:'name',type:'field'},
   {name:'price',type:'field'},{name:'stock',type:'field'}]},
  {name:'v_orders_summary',type:'view'}]}},

{id:'api',name:'API REST',icon:'🔌',group:'🏗️ Arquitectura',
 desc:'Recursos, endpoints, parámetros y respuestas de una API.',
 types:{api:ty('API','🔌',C.blue),resource:ty('Recurso','📦',C.indigo),
  get:ty('GET','🟢',C.green),post:ty('POST','🔵',C.blue),put:ty('PUT / PATCH','🟠',C.orange),
  del:ty('DELETE','🔴',C.red),param:ty('Parámetro','🔸',C.gray),auth:ty('Autenticación','🔐',C.purple)},
 tree:{name:'API v1',type:'api',children:[
  {name:'Autenticación',type:'auth',children:[
   {name:'POST /auth/login',type:'post'},{name:'POST /auth/refresh',type:'post'},
   {name:'POST /auth/logout',type:'post'}]},
  {name:'/users',type:'resource',children:[
   {name:'GET /users',type:'get',children:[{name:'?page, ?limit',type:'param'}]},
   {name:'GET /users/:id',type:'get'},{name:'POST /users',type:'post'},
   {name:'PATCH /users/:id',type:'put'},{name:'DELETE /users/:id',type:'del'}]},
  {name:'/products',type:'resource',children:[
   {name:'GET /products',type:'get'},{name:'GET /products/:id',type:'get'},
   {name:'POST /products',type:'post'}]},
  {name:'/orders',type:'resource',children:[
   {name:'GET /orders',type:'get'},{name:'POST /orders',type:'post'},
   {name:'PATCH /orders/:id/status',type:'put'}]}]}},

{id:'auth',name:'Flujo de Autenticación',icon:'🔐',group:'🏗️ Arquitectura',
 desc:'Registro, verificación, login, MFA y recuperación de acceso.',
 types:{start:ty('Inicio','🚀',C.blue),input:ty('Entrada de datos','⌨️',C.indigo),
  verify:ty('Verificación','✅',C.green),decision:ty('Decisión','🔀',C.purple),
  success:ty('Éxito','🎉',C.mint),error:ty('Error','❌',C.red),token:ty('Token / Sesión','🎫',C.orange)},
 tree:{name:'Autenticación',type:'start',children:[
  {name:'Registro',type:'input',children:[
   {name:'Email + contraseña',type:'input'},{name:'Verificar email',type:'verify'},
   {name:'¿Email válido?',type:'decision',children:[
    {name:'Sí → Crear cuenta',type:'success'},{name:'No → Mostrar error',type:'error'}]}]},
  {name:'Login',type:'input',children:[
   {name:'Credenciales',type:'input'},
   {name:'¿MFA activo?',type:'decision',children:[
    {name:'Sí → Código TOTP',type:'verify'},{name:'No → Emitir JWT',type:'token'}]}]},
  {name:'Recuperar contraseña',type:'input',children:[
   {name:'Enviar enlace mágico',type:'verify'},{name:'Restablecer',type:'success'}]},
  {name:'Sesión',type:'token',children:[
   {name:'Access token (15 min)',type:'token'},{name:'Refresh token (30 días)',type:'token'},
   {name:'Logout / revocar',type:'success'}]}]}},

{id:'cloud',name:'Arquitectura Cloud',icon:'☁️',group:'🏗️ Arquitectura',
 desc:'Regiones, VPC, subredes, cómputo, almacenamiento y seguridad.',
 types:{region:ty('Región','🌍',C.blue),vpc:ty('VPC','🕸️',C.indigo),
  subnet:ty('Subred','🔲',C.teal),compute:ty('Cómputo','🖥️',C.green),
  storage:ty('Almacenamiento','💾',C.orange),security:ty('Seguridad','🛡️',C.red),
  cdn:ty('CDN / Edge','⚡',C.purple)},
 tree:{name:'AWS — Producción',type:'region',children:[
  {name:'VPC principal',type:'vpc',children:[
   {name:'Subred pública',type:'subnet',children:[
    {name:'Application Load Balancer',type:'compute'},{name:'NAT Gateway',type:'compute'}]},
   {name:'Subred privada — App',type:'subnet',children:[
    {name:'ECS Fargate (3 tareas)',type:'compute'},{name:'Auto Scaling Group',type:'compute'}]},
   {name:'Subred privada — Datos',type:'subnet',children:[
    {name:'RDS PostgreSQL Multi-AZ',type:'storage'},{name:'ElastiCache Redis',type:'storage'}]}]},
  {name:'CloudFront CDN',type:'cdn'},{name:'S3 — Assets estáticos',type:'storage'},
  {name:'IAM + Secrets Manager',type:'security'},{name:'WAF + Shield',type:'security'}]}},

/* ─────────── DATOS ─────────── */
{id:'etl',name:'Flujo de Datos / ETL',icon:'🔄',group:'📊 Datos',
 desc:'Fuentes, extracción, transformación, carga y capa de analítica.',
 types:{source:ty('Fuente','🗂️',C.gray),extract:ty('Extracción','📥',C.blue),
  transform:ty('Transformación','🔧',C.purple),load:ty('Carga','📤',C.orange),
  warehouse:ty('Data Warehouse','🏛️',C.green),bi:ty('Business Intelligence','📊',C.teal),
  quality:ty('Calidad de datos','✅',C.mint)},
 tree:{name:'Pipeline de datos',type:'source',children:[
  {name:'Fuentes',type:'source',children:[
   {name:'PostgreSQL (OLTP)',type:'source'},{name:'Google Analytics 4',type:'source'},
   {name:'Stripe API',type:'source'},{name:'CSV de CRM',type:'source'}]},
  {name:'Extracción',type:'extract',children:[
   {name:'Airbyte — cada 6 h',type:'extract'},{name:'CDC con Debezium',type:'extract'}]},
  {name:'Transformación',type:'transform',children:[
   {name:'dbt — staging models',type:'transform'},{name:'dbt — marts de negocio',type:'transform'},
   {name:'Tests de calidad',type:'quality'}]},
  {name:'Carga',type:'load',children:[
   {name:'Snowflake — RAW',type:'warehouse'},{name:'Snowflake — ANALYTICS',type:'warehouse'}]},
  {name:'Consumo',type:'bi',children:[
   {name:'Dashboard de ventas',type:'bi'},{name:'Reporte de cohortes',type:'bi'}]}]}},

{id:'ml',name:'Pipeline de Machine Learning',icon:'🤖',group:'📊 Datos',
 desc:'Datasets, features, entrenamiento, evaluación y despliegue de modelos.',
 types:{data:ty('Dataset','🗃️',C.blue),feature:ty('Feature engineering','🔧',C.indigo),
  train:ty('Entrenamiento','🎓',C.purple),eval:ty('Evaluación','📊',C.orange),
  model:ty('Modelo','🧠',C.green),deploy:ty('Despliegue','🚀',C.teal),monitor:ty('Monitorización','👁️',C.gray)},
 tree:{name:'ML Pipeline',type:'data',children:[
  {name:'Datasets',type:'data',children:[
   {name:'Train 70%',type:'data'},{name:'Val 15%',type:'data'},{name:'Test 15%',type:'data'}]},
  {name:'Feature engineering',type:'feature',children:[
   {name:'Normalización',type:'feature'},{name:'One-hot encoding',type:'feature'},
   {name:'Selección de features',type:'feature'}]},
  {name:'Entrenamiento',type:'train',children:[
   {name:'XGBoost',type:'model'},{name:'Red neuronal (PyTorch)',type:'model'},
   {name:'Cross-validation k=5',type:'train'}]},
  {name:'Evaluación',type:'eval',children:[
   {name:'AUC-ROC > 0.92',type:'eval'},{name:'Precisión / Recall',type:'eval'},
   {name:'Matriz de confusión',type:'eval'}]},
  {name:'Despliegue',type:'deploy',children:[
   {name:'SageMaker endpoint',type:'deploy'},{name:'API REST de inferencia',type:'deploy'}]},
  {name:'Monitorización',type:'monitor',children:[
   {name:'Data drift',type:'monitor'},{name:'Latencia p95 < 100ms',type:'monitor'}]}]}},

/* ─────────── MARKETING ─────────── */
{id:'seo',name:'Sitemap SEO',icon:'🔍',group:'📣 Marketing',
 desc:'Arquitectura de contenido por clústeres, keywords y enlazado interno.',
 types:{domain:ty('Dominio','🌐',C.blue),cluster:ty('Clúster temático','🧲',C.indigo),
  page:ty('Página','📄',C.teal),kw:ty('Keyword','🔑',C.orange),
  blog:ty('Artículo de blog','✍️',C.green),landing:ty('Landing','🎯',C.purple)},
 tree:{name:'misitio.com',type:'domain',children:[
  {name:'Clúster: Marketing digital',type:'cluster',children:[
   {name:'/marketing-digital',type:'page',children:[
    {name:'"marketing digital"',type:'kw'},{name:'"estrategia digital"',type:'kw'}]},
   {name:'Blog: 10 tácticas SEO',type:'blog'},{name:'Blog: Qué es un embudo',type:'blog'}]},
  {name:'Clúster: Desarrollo web',type:'cluster',children:[
   {name:'/desarrollo-web',type:'landing'},{name:'Blog: React vs Vue',type:'blog'},
   {name:'Blog: Core Web Vitals',type:'blog'}]},
  {name:'Clúster: Branding',type:'cluster',children:[
   {name:'/branding',type:'landing'},{name:'Blog: Identidad visual',type:'blog'}]}]}},

{id:'campaign',name:'Campaña de Marketing Digital',icon:'📣',group:'📣 Marketing',
 desc:'Campaña multicanal con audiencias, piezas, presupuesto y KPIs.',
 types:{campaign:ty('Campaña','📣',C.blue),channel:ty('Canal','📡',C.indigo),
  audience:ty('Audiencia','👥',C.teal),asset:ty('Pieza creativa','🎨',C.purple),
  kpi:ty('KPI','📈',C.green),budget:ty('Presupuesto','💰',C.orange)},
 tree:{name:'Campaña Black Friday',type:'campaign',children:[
  {name:'Meta Ads',type:'channel',children:[
   {name:'Lookalike compradores',type:'audience'},{name:'Vídeo 15s vertical',type:'asset'},
   {name:'Carrusel de productos',type:'asset'},{name:'CTR > 2%',type:'kpi'},
   {name:'$3.500',type:'budget'}]},
  {name:'Google Ads',type:'channel',children:[
   {name:'Search — marca',type:'audience'},{name:'Performance Max',type:'asset'},
   {name:'ROAS > 4x',type:'kpi'},{name:'$4.000',type:'budget'}]},
  {name:'Email Marketing',type:'channel',children:[
   {name:'Base de suscriptores',type:'audience'},{name:'Secuencia de 3 emails',type:'asset'},
   {name:'Tasa de apertura > 25%',type:'kpi'}]},
  {name:'Influencers',type:'channel',children:[
   {name:'Micro-influencers nicho',type:'audience'},{name:'$2.500',type:'budget'}]}]}},

{id:'funnel',name:'Embudo de Ventas',icon:'🫗',group:'📣 Marketing',
 desc:'Etapas de conversión, tácticas y métricas por nivel del embudo.',
 types:{funnel:ty('Embudo','🫗',C.blue),stage:ty('Etapa','📉',C.indigo),
  tactic:ty('Táctica','🎯',C.purple),metric:ty('Métrica','📊',C.green),
  conversion:ty('Conversión','🔁',C.orange)},
 tree:{name:'Embudo de adquisición',type:'funnel',children:[
  {name:'TOFU — Atracción',type:'stage',children:[
   {name:'Contenido SEO + Reels',type:'tactic'},{name:'Alcance: 250.000',type:'metric'},
   {name:'CTR 3%',type:'conversion'}]},
  {name:'MOFU — Interés',type:'stage',children:[
   {name:'Lead magnet + newsletter',type:'tactic'},{name:'5.000 leads',type:'metric'},
   {name:'Conversión 15%',type:'conversion'}]},
  {name:'BOFU — Decisión',type:'stage',children:[
   {name:'Demo personalizada',type:'tactic'},{name:'800 demos',type:'metric'},
   {name:'Conversión 25%',type:'conversion'}]},
  {name:'Retención',type:'stage',children:[
   {name:'Onboarding + soporte',type:'tactic'},{name:'LTV $1.200',type:'metric'}]}]}},

{id:'content',name:'Estrategia de Contenidos',icon:'✍️',group:'📣 Marketing',
 desc:'Pilares de contenido, formatos, canales y calendario editorial.',
 types:{strategy:ty('Estrategia','✍️',C.blue),pillar:ty('Pilar de contenido','🏛️',C.indigo),
  format:ty('Formato','🎬',C.purple),channel:ty('Canal','📡',C.teal),
  calendar:ty('Frecuencia','📅',C.orange),goal:ty('Objetivo','🎯',C.green)},
 tree:{name:'Plan editorial Q1',type:'strategy',children:[
  {name:'Pilar: Educación',type:'pillar',children:[
   {name:'Carrusel didáctico',type:'format'},{name:'Instagram + LinkedIn',type:'channel'},
   {name:'3x semana',type:'calendar'},{name:'Aumentar autoridad',type:'goal'}]},
  {name:'Pilar: Casos de éxito',type:'pillar',children:[
   {name:'Vídeo testimonial',type:'format'},{name:'YouTube + Web',type:'channel'},
   {name:'2x mes',type:'calendar'}]},
  {name:'Pilar: Producto',type:'pillar',children:[
   {name:'Demo corta',type:'format'},{name:'TikTok + Reels',type:'channel'},
   {name:'1x semana',type:'calendar'}]},
  {name:'Pilar: Cultura de marca',type:'pillar',children:[
   {name:'Behind the scenes',type:'format'},{name:'Stories',type:'channel'},
   {name:'Diario',type:'calendar'}]}]}},

/* ─────────── OPERACIONES ─────────── */
{id:'automation',name:'Flujo de Automatización (No-code)',icon:'🤖',group:'⚙️ Operaciones',
 desc:'Disparadores, condiciones, acciones y salidas de un workflow.',
 types:{trigger:ty('Disparador','⚡',C.yellow),action:ty('Acción','🔧',C.blue),
  condition:ty('Condición','🔀',C.purple),delay:ty('Espera','⏱️',C.gray),
  output:ty('Salida','📤',C.green),error:ty('Manejo de error','🚨',C.red)},
 tree:{name:'Automatización — Nuevo lead',type:'trigger',children:[
  {name:'Formulario enviado',type:'trigger'},
  {name:'Validar email',type:'condition',children:[
   {name:'Email corporativo → CRM',type:'action',children:[
    {name:'Crear contacto en HubSpot',type:'action'},{name:'Notificar a ventas (Slack)',type:'output'}]},
   {name:'Email personal → Nutrición',type:'action',children:[
    {name:'Esperar 2 días',type:'delay'},{name:'Enviar secuencia de emails',type:'action'}]}]},
  {name:'Si falla la API → reintentar 3x',type:'error'}]}},

{id:'launch',name:'Plan de Lanzamiento',icon:'🚀',group:'⚙️ Operaciones',
 desc:'Fases, tareas, responsables, hitos y métricas de un lanzamiento.',
 types:{goal:ty('Objetivo','🎯',C.blue),phase:ty('Fase','🪜',C.indigo),
  task:ty('Tarea','✅',C.teal),owner:ty('Responsable','👤',C.purple),
  milestone:ty('Hito','🏁',C.orange),kpi:ty('KPI','📈',C.green)},
 tree:{name:'Lanzamiento v2.0',type:'goal',children:[
  {name:'Fase 1 — Preparación',type:'phase',children:[
   {name:'Auditoría de producto',type:'task'},{name:'Product Manager',type:'owner'},
   {name:'Feature freeze',type:'milestone'}]},
  {name:'Fase 2 — Beta cerrada',type:'phase',children:[
   {name:'Reclutar 50 beta testers',type:'task'},{name:'Community Manager',type:'owner'},
   {name:'NPS > 40',type:'kpi'}]},
  {name:'Fase 3 — Go Live',type:'phase',children:[
   {name:'Product Hunt + PR',type:'task'},{name:'Marketing Lead',type:'owner'},
   {name:'1.000 registros semana 1',type:'kpi'},{name:'Día de lanzamiento',type:'milestone'}]},
  {name:'Fase 4 — Post-lanzamiento',type:'phase',children:[
   {name:'Análisis de cohortes',type:'task'},{name:'Retención D30 > 35%',type:'kpi'}]}]}},

{id:'bpmn',name:'Mapa de Procesos (BPMN)',icon:'🔁',group:'⚙️ Operaciones',
 desc:'Actividades, decisiones, roles, documentos y sistemas implicados.',
 types:{process:ty('Proceso','🔁',C.blue),activity:ty('Actividad','⚙️',C.indigo),
  decision:ty('Decisión','🔀',C.purple),role:ty('Rol','👤',C.teal),
  doc:ty('Documento','📄',C.gray),system:ty('Sistema','🖥️',C.orange),start:ty('Inicio / Fin','🚩',C.green)},
 tree:{name:'Proceso de facturación',type:'process',children:[
  {name:'Inicio',type:'start'},
  {name:'Recepción de pedido',type:'activity',children:[
   {name:'Comercial',type:'role'},{name:'Pedido en PDF',type:'doc'},{name:'ERP',type:'system'}]},
  {name:'Validar datos fiscales',type:'decision',children:[
   {name:'Correcto → Emitir factura',type:'activity'},
   {name:'Incorrecto → Solicitar corrección',type:'activity'}]},
  {name:'Emisión de factura',type:'activity',children:[
   {name:'Administración',type:'role'},{name:'Factura electrónica',type:'doc'},
   {name:'SII / Verifactu',type:'system'}]},
  {name:'Cobro y conciliación',type:'activity',children:[
   {name:'Banco',type:'system'},{name:'Recibo conciliado',type:'doc'}]},
  {name:'Fin',type:'start'}]}},

{id:'wbs',name:'Plan de Proyecto (WBS)',icon:'📋',group:'⚙️ Operaciones',
 desc:'Desglose de trabajo por fases, entregables, tareas e hitos.',
 types:{project:ty('Proyecto','📋',C.blue),phase:ty('Fase','🪜',C.indigo),
  deliverable:ty('Entregable','📦',C.purple),task:ty('Tarea','✅',C.teal),
  milestone:ty('Hito','🏁',C.orange),risk:ty('Riesgo','⚠️',C.red)},
 tree:{name:'Rediseño Web 2025',type:'project',children:[
  {name:'1. Descubrimiento',type:'phase',children:[
   {name:'Auditoría de contenido',type:'task'},{name:'Benchmark competitivo',type:'task'},
   {name:'Informe de hallazgos',type:'deliverable'},{name:'Kick-off aprobado',type:'milestone'}]},
  {name:'2. Diseño UX/UI',type:'phase',children:[
   {name:'Wireframes de 12 páginas',type:'task'},{name:'Design system',type:'deliverable'},
   {name:'Prototipo navegable',type:'deliverable'},{name:'Validación con usuarios',type:'milestone'}]},
  {name:'3. Desarrollo',type:'phase',children:[
   {name:'Maquetación frontend',type:'task'},{name:'Integración CMS',type:'task'},
   {name:'Sitio en staging',type:'deliverable'}]},
  {name:'4. Lanzamiento',type:'phase',children:[
   {name:'Migración de contenido',type:'task'},{name:'QA cross-browser',type:'task'},
   {name:'Go live',type:'milestone'}]},
  {name:'Riesgo: retraso en aprobaciones',type:'risk'}]}},

{id:'decision',name:'Árbol de Decisiones',icon:'🌳',group:'⚙️ Operaciones',
 desc:'Preguntas, condiciones, caminos y resultados posibles.',
 types:{question:ty('Pregunta','❓',C.blue),condition:ty('Condición','🔀',C.purple),
  option:ty('Opción','➡️',C.teal),outcome:ty('Resultado','🏁',C.green),
  risk:ty('Riesgo','⚠️',C.red),note:ty('Nota','📝',C.gray)},
 tree:{name:'¿Migrar el monolito?',type:'question',children:[
  {name:'¿El equipo tiene experiencia en microservicios?',type:'condition',children:[
   {name:'Sí',type:'option',children:[
    {name:'Migración incremental por dominios',type:'outcome'},
    {name:'Riesgo: doble mantenimiento temporal',type:'risk'}]},
   {name:'No',type:'option',children:[{name:'Monolito modular + formación',type:'outcome'}]}]},
  {name:'¿El tráfico supera 1M req/día?',type:'condition',children:[
   {name:'Sí → Escalado horizontal prioritario',type:'outcome'},
   {name:'No → Optimizar antes de migrar',type:'outcome'}]},
  {name:'Nota: revisar coste operativo a 12 meses',type:'note'}]}},

/* ─────────── AGENCIA ─────────── */
{id:'client',name:'Onboarding de Cliente (Agencia)',icon:'🤝',group:'🏢 Agencia',
 desc:'Proceso de alta de cliente: fases, entregables y puntos de contacto.',
 types:{client:ty('Cliente','🤝',C.blue),phase:ty('Fase','🪜',C.indigo),
  step:ty('Paso','✅',C.teal),deliverable:ty('Entregable','📦',C.purple),
  touch:ty('Contacto','📞',C.orange),tool:ty('Herramienta','🛠️',C.gray)},
 tree:{name:'Onboarding de cliente',type:'client',children:[
  {name:'Fase 1 — Bienvenida',type:'phase',children:[
   {name:'Email de bienvenida',type:'step'},{name:'Llamada de kick-off (60 min)',type:'touch'},
   {name:'Contrato firmado',type:'deliverable'},{name:'Pandadoc',type:'tool'}]},
  {name:'Fase 2 — Diagnóstico',type:'phase',children:[
   {name:'Accesos a cuentas y analítica',type:'step'},{name:'Auditoría inicial',type:'deliverable'},
   {name:'Google Analytics / Meta',type:'tool'}]},
  {name:'Fase 3 — Estrategia',type:'phase',children:[
   {name:'Reunión de objetivos',type:'touch'},{name:'Plan de medios 90 días',type:'deliverable'},
   {name:'Notion + Looker Studio',type:'tool'}]},
  {name:'Fase 4 — Ejecución y reporting',type:'phase',children:[
   {name:'Reunión semanal de seguimiento',type:'touch'},
   {name:'Informe mensual de resultados',type:'deliverable'}]}]}},

{id:'pitch',name:'Propuesta Comercial (Pitch)',icon:'💼',group:'🏢 Agencia',
 desc:'Estructura de una propuesta: problema, solución, equipo y pricing.',
 types:{pitch:ty('Propuesta','💼',C.blue),section:ty('Sección','📑',C.indigo),
  insight:ty('Insight','💡',C.yellow),deliverable:ty('Entregable','📦',C.purple),
  price:ty('Precio','💰',C.orange),proof:ty('Prueba social','⭐',C.green)},
 tree:{name:'Propuesta — Cliente X',type:'pitch',children:[
  {name:'1. Entendimiento del reto',type:'section',children:[
   {name:'Insight: pierden 40% de leads',type:'insight'}]},
  {name:'2. Nuestra solución',type:'section',children:[
   {name:'Estrategia de adquisición',type:'deliverable'},
   {name:'Landing optimizada',type:'deliverable'},{name:'Automatización CRM',type:'deliverable'}]},
  {name:'3. Casos de éxito',type:'section',children:[
   {name:'Cliente Y: +180% conversión',type:'proof'},{name:'Cliente Z: ROAS 6x',type:'proof'}]},
  {name:'4. Equipo',type:'section'},
  {name:'5. Inversión',type:'section',children:[
   {name:'Setup $3.500',type:'price'},{name:'Retainer mensual $2.200',type:'price'}]},
  {name:'6. Próximos pasos',type:'section'}]}},

/* ─────────── PRODUCCIÓN AUDIOVISUAL ─────────── */
{id:'shortfilm',name:'Producción de Cortometraje',icon:'🎬',group:'🎥 Producción Audiovisual',
 desc:'Pre-producción, rodaje y post-producción de un cortometraje.',
 types:{prod:ty('Producción','🎬',C.blue),phase:ty('Fase','📅',C.indigo),
  dept:ty('Departamento','🎯',C.purple),task:ty('Tarea','✅',C.teal),
  doc:ty('Documento','📄',C.gray),crew:ty('Equipo','👥',C.orange),loc:ty('Localización','📍',C.green)},
 tree:{name:'Cortometraje "Aurora"',type:'prod',children:[
  {name:'Desarrollo',type:'phase',children:[
   {name:'Guion literario',type:'doc'},{name:'Guion técnico',type:'doc'},
   {name:'Storyboard',type:'doc'},{name:'Presupuesto',type:'doc'}]},
  {name:'Pre-producción',type:'phase',children:[
   {name:'Casting',type:'dept',children:[{name:'Protagonista',type:'crew'},{name:'Secundarios',type:'crew'}]},
   {name:'Localizaciones',type:'dept',children:[
    {name:'Casa del pueblo',type:'loc'},{name:'Bosque al amanecer',type:'loc'}]},
   {name:'Plan de rodaje',type:'doc'},{name:'Permisos',type:'task'}]},
  {name:'Rodaje',type:'phase',children:[
   {name:'Bloque 1 — Exteriores',type:'task'},{name:'Bloque 2 — Interiores',type:'task'},
   {name:'Bloque 3 — Nocturnas',type:'task'}]},
  {name:'Post-producción',type:'phase',children:[
   {name:'Montaje',type:'task'},{name:'Etalonaje',type:'task'},
   {name:'Diseño sonoro',type:'task'},{name:'Música original',type:'task'},
   {name:'VFX',type:'task'},{name:'Master final',type:'task'}]},
  {name:'Distribución',type:'phase',children:[
   {name:'Festivales',type:'task'},{name:'DCP',type:'task'},{name:'Press kit',type:'doc'}]}]}},

{id:'script',name:'Guion Cinematográfico (Escenas)',icon:'📜',group:'🎥 Producción Audiovisual',
 desc:'Estructura de tres actos con escenas, beats y personajes.',
 types:{act:ty('Acto','🎭',C.blue),seq:ty('Secuencia','🎞️',C.indigo),
  scene:ty('Escena','🎬',C.purple),beat:ty('Beat narrativo','💥',C.orange),
  char:ty('Personaje','👤',C.green),loc:ty('Localización','📍',C.teal)},
 tree:{name:'Guion — Largometraje',type:'act',children:[
  {name:'Acto I — Planteamiento',type:'act',children:[
   {name:'Secuencia 1: Mundo ordinario',type:'seq',children:[
    {name:'ESC 1 — INT. Casa / DÍA',type:'scene',children:[
     {name:'Presentación del protagonista',type:'beat'},{name:'Marta',type:'char'}]},
    {name:'ESC 2 — EXT. Calle / DÍA',type:'scene'}]},
   {name:'Inciting incident',type:'beat'}]},
  {name:'Acto II — Confrontación',type:'act',children:[
   {name:'Secuencia 2: Primer obstáculo',type:'seq',children:[
    {name:'ESC 12 — INT. Oficina / NOCHE',type:'scene'}]},
   {name:'Midpoint twist',type:'beat'},
   {name:'Secuencia 3: Todo se complica',type:'seq',children:[
    {name:'ESC 28 — EXT. Azotea / AMANECER',type:'scene'}]}]},
  {name:'Acto III — Resolución',type:'act',children:[
   {name:'Secuencia 4: Clímax',type:'seq',children:[
    {name:'ESC 45 — INT. Almacén / NOCHE',type:'scene'}]},
   {name:'Secuencia 5: Resolución',type:'seq',children:[
    {name:'ESC 52 — EXT. Playa / DÍA',type:'scene'}]}]}]}},

{id:'postprod',name:'Post-producción de Vídeo',icon:'🎞️',group:'🎥 Producción Audiovisual',
 desc:'Pipeline de edición, color, sonido, VFX y entregas.',
 types:{pipeline:ty('Pipeline','🎞️',C.blue),task:ty('Tarea','⚙️',C.indigo),
  editor:ty('Editor','✂️',C.purple),color:ty('Colorista','🎨',C.orange),
  sound:ty('Sonido','🎧',C.green),vfx:ty('VFX','✨',C.mint),deliver:ty('Entrega','📦',C.teal)},
 tree:{name:'Post-producción — Spot 30s',type:'pipeline',children:[
  {name:'Ingesta y backup',type:'task',children:[
   {name:'Proxies ProRes',type:'task'},{name:'Backup 3-2-1',type:'task'}]},
  {name:'Montaje offline',type:'editor',children:[
   {name:'Rough cut v1',type:'task'},{name:'Feedback cliente',type:'task'},
   {name:'Fine cut',type:'task'}]},
  {name:'Etalonaje',type:'color',children:[
   {name:'Primer pase (balance)',type:'task'},{name:'Look creativo',type:'task'},
   {name:'Shot matching',type:'task'}]},
  {name:'Sonido',type:'sound',children:[
   {name:'Limpieza de diálogos',type:'task'},{name:'Diseño sonoro',type:'task'},
   {name:'Mezcla 5.1',type:'task'},{name:'Locución',type:'task'}]},
  {name:'VFX y motion',type:'vfx',children:[
   {name:'Tracking',type:'task'},{name:'Rotoscopia',type:'task'},
   {name:'Motion graphics',type:'task'}]},
  {name:'Entregas',type:'deliver',children:[
   {name:'Master ProRes 4444',type:'deliver'},{name:'H.264 web',type:'deliver'},
   {name:'Versión 9:16 para Reels',type:'deliver'},{name:'Subtítulos .srt',type:'deliver'}]}]}},

{id:'videoclip',name:'Producción de Videoclip',icon:'🎤',group:'🎥 Producción Audiovisual',
 desc:'Concepto, rodaje y montaje de un videoclip musical.',
 types:{concept:ty('Concepto','💡',C.yellow),scene:ty('Escena / Set','🎬',C.purple),
  crew:ty('Equipo','👥',C.orange),perf:ty('Performance','🎤',C.pink),
  look:ty('Look / Estilismo','👗',C.green),post:ty('Post','🎞️',C.teal)},
 tree:{name:'Videoclip "Neón"',type:'concept',children:[
  {name:'Concepto y moodboard',type:'concept',children:[
   {name:'Referencias estéticas',type:'concept'},{name:'Paleta neón + nocturna',type:'concept'}]},
  {name:'Sets / Escenas',type:'scene',children:[
   {name:'Set 1 — Calle mojada',type:'scene',children:[{name:'Performance cantante',type:'perf'}]},
   {name:'Set 2 — Habitación retro',type:'scene',children:[{name:'Baile grupal',type:'perf'}]},
   {name:'Set 3 — Azotea con skyline',type:'scene'}]},
  {name:'Equipo técnico',type:'crew',children:[
   {name:'Director',type:'crew'},{name:'DOP',type:'crew'},{name:'Gaffer',type:'crew'},
   {name:'Estilismo',type:'look'},{name:'Maquillaje',type:'look'}]},
  {name:'Rodaje',type:'perf',children:[
   {name:'Día 1 — Sets 1 y 2',type:'perf'},{name:'Día 2 — Set 3 + pickup',type:'perf'}]},
  {name:'Post-producción',type:'post',children:[
   {name:'Montaje rítmico',type:'post'},{name:'Grade neón',type:'post'},
   {name:'VFX glow',type:'post'},{name:'Master + versión vertical',type:'post'}]}]}},

/* ─────────── GASTRONOMÍA ─────────── */
{id:'recipe',name:'Receta de Cocina',icon:'🍳',group:'🍽️ Gastronomía',
 desc:'Ingredientes, mise en place, pasos, tiempos y emplatado.',
 types:{recipe:ty('Receta','🍳',C.blue),section:ty('Bloque','📋',C.indigo),
  ing:ty('Ingrediente','🥕',C.green),step:ty('Paso','🔢',C.orange),
  time:ty('Tiempo','⏱️',C.teal),tip:ty('Consejo','💡',C.yellow),plate:ty('Emplatado','🍽️',C.purple)},
 tree:{name:'Paella valenciana',type:'recipe',children:[
  {name:'Ficha técnica',type:'section',children:[
   {name:'Raciones: 6',type:'section'},{name:'Dificultad: media',type:'section'},
   {name:'Tiempo total: 60 min',type:'time'}]},
  {name:'Ingredientes',type:'section',children:[
   {name:'Arroz bomba 400g',type:'ing'},{name:'Pollo troceado 500g',type:'ing'},
   {name:'Conejo 500g',type:'ing'},{name:'Judía verde 200g',type:'ing'},
   {name:'Garrofón 100g',type:'ing'},{name:'Tomate rallado 2 ud',type:'ing'},
   {name:'Azafrán + romero',type:'ing'},{name:'Caldo 1.2 L',type:'ing'}]},
  {name:'Mise en place',type:'section',children:[
   {name:'Sofrito base',type:'step'},{name:'Calentar caldo',type:'step'}]},
  {name:'Elaboración',type:'section',children:[
   {name:'1. Dorar carnes (10 min)',type:'step'},{name:'2. Añadir verduras (8 min)',type:'step'},
   {name:'3. Tomate y azafrán (3 min)',type:'step'},{name:'4. Caldo y hervir (10 min)',type:'step'},
   {name:'5. Añadir arroz (18 min fuego medio)',type:'step'},
   {name:'6. Reposo 5 min',type:'step'}]},
  {name:'Consejos del chef',type:'section',children:[
   {name:'No remover el arroz',type:'tip'},{name:'Socarrat final a fuego alto 1 min',type:'tip'}]},
  {name:'Emplatado',type:'plate',children:[
   {name:'En paellera, limón al lado',type:'plate'}]}]}},

{id:'menu',name:'Menú de Restaurante',icon:'🍽️',group:'🍽️ Gastronomía',
 desc:'Estructura completa de carta: entrantes, principales, postres y bebidas.',
 types:{menu:ty('Menú','🍽️',C.blue),cat:ty('Categoría','📋',C.indigo),
  dish:ty('Plato','🍲',C.orange),allergen:ty('Alérgeno','⚠️',C.red),
  price:ty('Precio','💶',C.green),wine:ty('Vino','🍷',C.purple),special:ty('Especialidad','⭐',C.yellow)},
 tree:{name:'Carta — Restaurante Casa',type:'menu',children:[
  {name:'Entrantes',type:'cat',children:[
   {name:'Croquetas de jamón',type:'dish',children:[
    {name:'Gluten, lactosa',type:'allergen'},{name:'8,50 €',type:'price'}]},
   {name:'Burrata con tomate',type:'dish',children:[{name:'Lactosa',type:'allergen'},{name:'11,00 €',type:'price'}]},
   {name:'Tartar de atún rojo',type:'dish',children:[{name:'⭐',type:'special'},{name:'16,00 €',type:'price'}]}]},
  {name:'Principales',type:'cat',children:[
   {name:'Arroz con carabineros',type:'dish',children:[
    {name:'Crustáceos',type:'allergen'},{name:'24,00 €',type:'price'}]},
   {name:'Solomillo a la pimienta',type:'dish',children:[{name:'Lactosa',type:'allergen'},{name:'22,00 €',type:'price'}]},
   {name:'Lubina a la espalda',type:'dish',children:[{name:'Pescado',type:'allergen'},{name:'20,00 €',type:'price'}]}]},
  {name:'Postres',type:'cat',children:[
   {name:'Torrija caramelizada',type:'dish',children:[{name:'7,00 €',type:'price'}]},
   {name:'Tarta de queso',type:'dish',children:[{name:'7,50 €',type:'price'}]}]},
  {name:'Bebidas',type:'cat',children:[
   {name:'Vinos tintos',type:'cat',children:[
    {name:'Rioja Reserva',type:'wine'},{name:'Ribera del Duero',type:'wine'}]},
   {name:'Refrescos y agua',type:'cat'}]}]}},

{id:'escandallo',name:'Escandallo / Costes de Receta',icon:'💰',group:'🍽️ Gastronomía',
 desc:'Coste por ingrediente, mermas, precio de venta y margen.',
 types:{recipe:ty('Receta','💰',C.blue),ing:ty('Ingrediente','🥕',C.green),
  cost:ty('Coste','💵',C.orange),waste:ty('Merma','🗑️',C.red),
  price:ty('PVP','🏷️',C.purple),margin:ty('Margen','📈',C.teal)},
 tree:{name:'Escandallo — Tarta de queso',type:'recipe',children:[
  {name:'Ingredientes y costes',type:'ing',children:[
   {name:'Queso crema 1kg — 6,80 €',type:'cost'},{name:'Nata 500ml — 1,90 €',type:'cost'},
   {name:'Huevos 6 ud — 1,50 €',type:'cost'},{name:'Azúcar 250g — 0,40 €',type:'cost'},
   {name:'Base galleta — 1,20 €',type:'cost'}]},
  {name:'Mermas y pérdidas',type:'waste',children:[
   {name:'Merma porción 5%',type:'waste'},{name:'Rotura 2%',type:'waste'}]},
  {name:'Coste total por ración',type:'cost',children:[
   {name:'Coste materia prima: 1,20 €',type:'cost'},
   {name:'Mano de obra: 0,35 €',type:'cost'},{name:'Overhead 15%: 0,23 €',type:'cost'}]},
  {name:'Precio de venta',type:'price',children:[
   {name:'PVP sin IVA: 5,50 €',type:'price'},{name:'PVP con IVA (10%): 6,05 €',type:'price'}]},
  {name:'Margen y rentabilidad',type:'margin',children:[
   {name:'Food cost: 22%',type:'margin'},{name:'Margen bruto: 78%',type:'margin'},
   {name:'Objetivo food cost < 30%',type:'margin'}]}]}},

{id:'wine',name:'Carta de Vinos',icon:'🍷',group:'🍽️ Gastronomía',
 desc:'Vinos por región, uva, añada y maridaje sugerido.',
 types:{winelist:ty('Carta de vinos','🍷',C.blue),region:ty('Región','🌍',C.indigo),
  wine:ty('Vino','🍷',C.purple),grape:ty('Uva','🍇',C.green),
  vintage:ty('Añada','📅',C.orange),pairing:ty('Maridaje','🍽️',C.teal)},
 tree:{name:'Carta de vinos',type:'winelist',children:[
  {name:'España — Rioja',type:'region',children:[
   {name:'Vino Tinto Reserva',type:'wine',children:[
    {name:'Tempranillo',type:'grape'},{name:'2019',type:'vintage'},
    {name:'Carnes rojas, quesos curados',type:'pairing'}]},
   {name:'Vino Blanco Joven',type:'wine',children:[
    {name:'Viura',type:'grape'},{name:'2023',type:'vintage'},
    {name:'Pescados, mariscos',type:'pairing'}]}]},
  {name:'España — Ribera del Duero',type:'region',children:[
   {name:'Tinto Crianza',type:'wine',children:[
    {name:'Tinto Fino',type:'grape'},{name:'2020',type:'vintage'},
    {name:'Cordero, caza',type:'pairing'}]}]},
  {name:'Francia — Borgoña',type:'region',children:[
   {name:'Chablis Premier Cru',type:'wine',children:[
    {name:'Chardonnay',type:'grape'},{name:'2021',type:'vintage'},
    {name:'Ostras, mariscos',type:'pairing'}]}]},
  {name:'Espumosos',type:'region',children:[
   {name:'Cava Brut Nature',type:'wine',children:[
    {name:'Macabeo, Xarel·lo, Parellada',type:'grape'},
    {name:'Aperitivos, fritos',type:'pairing'}]},
   {name:'Champagne Brut',type:'wine'}]}]}},

/* ─────────── HOTELES Y TURISMO ─────────── */
{id:'hotel',name:'Estructura de Hotel',icon:'🏨',group:'🏨 Hoteles y Turismo',
 desc:'Departamentos, áreas, servicios y jerarquía operativa del hotel.',
 types:{hotel:ty('Hotel','🏨',C.blue),dept:ty('Departamento','🏢',C.indigo),
  area:ty('Área','📍',C.purple),service:ty('Servicio','⭐',C.orange),
  role:ty('Rol','👤',C.teal),kpi:ty('KPI','📈',C.green)},
 tree:{name:'Hotel Aurora ★★★★',type:'hotel',children:[
  {name:'Recepción',type:'dept',children:[
   {name:'Check-in / Check-out',type:'service'},{name:'Conserjería',type:'service'},
   {name:'Recepción 24h',type:'role'},{name:'Check-in < 3 min',type:'kpi'}]},
  {name:'Housekeeping',type:'dept',children:[
   {name:'Limpieza habitaciones',type:'area'},{name:'Lavandería',type:'area'},
   {name:'Gobernanta',type:'role'},{name:'Habitaciones revisadas 100%',type:'kpi'}]},
  {name:'F&B (Alimentos y Bebidas)',type:'dept',children:[
   {name:'Restaurante buffet',type:'area'},{name:'Bar panorámico',type:'area'},
   {name:'Room service 24h',type:'service'},{name:'Desayuno',type:'service'}]},
  {name:'Spa & Wellness',type:'dept',children:[
   {name:'Circuito hidrotermal',type:'area'},{name:'Masajes',type:'service'},
   {name:'Piscina climatizada',type:'area'}]},
  {name:'Eventos y Banquetes',type:'dept',children:[
   {name:'Salón 300 pax',type:'area'},{name:'Salas de reunión',type:'area'},
   {name:'Coordinador de eventos',type:'role'}]},
  {name:'Mantenimiento',type:'dept',children:[
   {name:'Preventivo',type:'service'},{name:'Correctivo',type:'service'}]}]}},

{id:'guest',name:'Guest Journey Hotelero',icon:'🛎️',group:'🏨 Hoteles y Turismo',
 desc:'Recorrido del huésped: descubrimiento, reserva, estancia y post-estancia.',
 types:{stage:ty('Etapa','🚩',C.blue),touch:ty('Punto de contacto','📡',C.teal),
  emotion:ty('Emoción','😊',C.yellow),pain:ty('Dolor','⚠️',C.red),
  opp:ty('Oportunidad','💡',C.orange),dept:ty('Departamento','🏢',C.purple)},
 tree:{name:'Guest Journey — Hotel',type:'stage',children:[
  {name:'1. Dreaming',type:'stage',children:[
   {name:'Anuncio en Instagram',type:'touch'},{name:'Busca en TripAdvisor',type:'touch'},
   {name:'Ilusión 😊',type:'emotion'},{name:'Web con fotos 360° 💡',type:'opp'}]},
  {name:'2. Booking',type:'stage',children:[
   {name:'Web / Booking.com',type:'touch'},{name:'Elige tarifa',type:'touch'},
   {name:'Fricción en pago ⚠️',type:'pain'},{name:'Pago en 1 clic 💡',type:'opp'}]},
  {name:'3. Pre-arrival',type:'stage',children:[
   {name:'Email confirmación',type:'touch'},{name:'Upsell traslado',type:'touch'},
   {name:'Recepción',type:'dept'}]},
  {name:'4. Arrival & Stay',type:'stage',children:[
   {name:'Check-in < 3 min',type:'touch'},{name:'Welcome drink',type:'touch'},
   {name:'Cola en check-in ⚠️',type:'pain'},{name:'Check-in online 💡',type:'opp'},
   {name:'Housekeeping',type:'dept'}]},
  {name:'5. Departure',type:'stage',children:[
   {name:'Check-out exprés',type:'touch'},{name:'Factura digital',type:'touch'}]},
  {name:'6. Advocacy',type:'stage',children:[
   {name:'Email post-estancia',type:'touch'},{name:'Pide reseña Google',type:'touch'},
   {name:'Programa de fidelización 💡',type:'opp'}]}]}},

/* ─────────── EVENTOS ─────────── */
{id:'event',name:'Organización de Evento',icon:'🎪',group:'🎉 Eventos',
 desc:'Planificación completa: proveedores, espacios, logística y ejecución.',
 types:{event:ty('Evento','🎪',C.blue),phase:ty('Fase','📅',C.indigo),
  provider:ty('Proveedor','🚚',C.orange),space:ty('Espacio','📍',C.purple),
  task:ty('Tarea','✅',C.teal),budget:ty('Presupuesto','💰',C.green),kpi:ty('KPI','📈',C.yellow)},
 tree:{name:'Evento — Lanzamiento de producto',type:'event',children:[
  {name:'Fase 1 — Conceptualización',type:'phase',children:[
   {name:'Definir objetivo y público',type:'task'},{name:'Presupuesto $25.000',type:'budget'},
   {name:'Concepto creativo',type:'task'}]},
  {name:'Fase 2 — Búsqueda de espacios',type:'phase',children:[
   {name:'Loft industrial (300 pax)',type:'space'},{name:'Hotel con terraza',type:'space'},
   {name:'Espacio tech / showroom',type:'space'}]},
  {name:'Fase 3 — Proveedores',type:'phase',children:[
   {name:'Catering',type:'provider'},{name:'Sonido e iluminación',type:'provider'},
   {name:'Fotografía y vídeo',type:'provider'},{name:'Streaming',type:'provider'}]},
  {name:'Fase 4 — Producción',type:'phase',children:[
   {name:'Montaje día -1',type:'task'},{name:'Ensayo técnico',type:'task'},
   {name:'Check-in asistentes',type:'task'}]},
  {name:'Fase 5 — Ejecución y post',type:'phase',children:[
   {name:'Evento en vivo',type:'task'},{name:'Encuesta post-evento',type:'task'},
   {name:'NPS > 50',type:'kpi'},{name:'Vídeo after-movie',type:'task'}]}]}},

{id:'wedding',name:'Boda (Timeline Completo)',icon:'💍',group:'🎉 Eventos',
 desc:'Planificación de boda: 12 meses, mes a mes, hasta el gran día.',
 types:{wedding:ty('Boda','💍',C.blue),phase:ty('Fase temporal','📅',C.indigo),
  task:ty('Tarea','✅',C.teal),provider:ty('Proveedor','🚚',C.orange),
  milestone:ty('Hito','🏁',C.purple),budget:ty('Presupuesto','💰',C.green)},
 tree:{name:'Boda — Ana & Luis',type:'wedding',children:[
  {name:'12 meses antes',type:'phase',children:[
   {name:'Fijar fecha y presupuesto ($30.000)',type:'budget'},
   {name:'Elegir ceremonia y banquete',type:'task'},
   {name:'Reservar finca',type:'milestone'}]},
  {name:'9 meses antes',type:'phase',children:[
   {name:'Vestido y traje',type:'task'},{name:'Fotógrafo',type:'provider'},
   {name:'Lista de invitados',type:'task'}]},
  {name:'6 meses antes',type:'phase',children:[
   {name:'Catering y menú degustación',type:'provider'},
   {name:'Música (DJ + directo)',type:'provider'},{name:'Decoración y floristería',type:'provider'}]},
  {name:'3 meses antes',type:'phase',children:[
   {name:'Invitaciones',type:'task'},{name:'Alianzas',type:'task'},
   {name:'Peluquería y maquillaje',type:'provider'}]},
  {name:'1 mes antes',type:'phase',children:[
   {name:'Reparto de mesas',type:'task'},{name:'Ensayo y últimas confirmaciones',type:'task'}]},
  {name:'Día B',type:'phase',children:[
   {name:'Preparativos',type:'milestone'},{name:'Ceremonia',type:'milestone'},
   {name:'Cóctel',type:'milestone'},{name:'Banquete',type:'milestone'},
   {name:'Baile y barra libre',type:'milestone'}]}]}},

{id:'corporate',name:'Evento Corporativo',icon:'🎤',group:'🎉 Eventos',
 desc:'Convención, kick-off o congreso con agenda, ponentes y logística.',
 types:{event:ty('Evento','🎤',C.blue),day:ty('Jornada','📅',C.indigo),
  session:ty('Sesión','🎯',C.purple),speaker:ty('Ponente','👤',C.orange),
  break:ty('Pausa / Networking','☕',C.teal),logistics:ty('Logística','🚚',C.gray)},
 tree:{name:'Convención anual 2025',type:'event',children:[
  {name:'Día 1 — Kick-off',type:'day',children:[
   {name:'09:00 Acreditación',type:'logistics'},{name:'10:00 Keynote CEO',type:'session',children:[{name:'CEO',type:'speaker'}]},
   {name:'11:30 Coffee break',type:'break'},{name:'12:00 Estado del negocio',type:'session',children:[{name:'CFO',type:'speaker'}]},
   {name:'14:00 Almuerzo networking',type:'break'},
   {name:'16:00 Talleres paralelos',type:'session'},{name:'20:00 Cena de gala',type:'break'}]},
  {name:'Día 2 — Formación',type:'day',children:[
   {name:'09:30 Workshop ventas',type:'session',children:[{name:'Dir. Ventas',type:'speaker'}]},
   {name:'11:00 Workshop producto',type:'session'},{name:'13:00 Almuerzo',type:'break'},
   {name:'15:00 Team building',type:'session'},{name:'18:00 Clausura',type:'session'}]},
  {name:'Logística',type:'logistics',children:[
   {name:'Hotel + traslados',type:'logistics'},{name:'AV y streaming',type:'logistics'},
   {name:'App del evento',type:'logistics'},{name:'Merchandising',type:'logistics'}]}]}},

/* ─────────── ESPECTÁCULOS Y ESCENARIO ─────────── */
{id:'concert',name:'Producción de Concierto',icon:'🎸',group:'🎭 Espectáculos y Escenario',
 desc:'Producción de concierto: pre, montaje, show y desmontaje.',
 types:{show:ty('Show','🎸',C.blue),phase:ty('Fase','📅',C.indigo),
  dept:ty('Departamento','🎯',C.purple),crew:ty('Equipo','👤',C.orange),
  cue:ty('Cue / Momento','💥',C.yellow),equip:ty('Equipo técnico','🎛️',C.gray)},
 tree:{name:'Concierto — Tour 2025',type:'show',children:[
  {name:'Pre-producción',type:'phase',children:[
   {name:'Diseño de escenario',type:'dept'},{name:'Setlist',type:'dept'},
   {name:'Rider técnico',type:'dept'},{name:'Ensayo general',type:'dept'}]},
  {name:'Montaje (día -1)',type:'phase',children:[
   {name:'Descarga de camiones 08:00',type:'crew'},
   {name:'Montaje de estructura y luces',type:'equip'},
   {name:'Montaje de sonido (PA)',type:'equip'},
   {name:'Vídeo / LED wall',type:'equip'},
   {name:'Soundcheck 18:00',type:'crew'}]},
  {name:'Show',type:'phase',children:[
   {name:'Puertas 20:00',type:'cue'},{name:'Telonero 20:30',type:'cue'},
   {name:'Show principal 21:30',type:'cue'},{name:'Encore',type:'cue'},
   {name:'Fin 23:30',type:'cue'}]},
  {name:'Desmontaje',type:'phase',children:[
   {name:'Carga out 00:00',type:'crew'},{name:'Salida de camiones 03:00',type:'crew'}]}]}},

{id:'rider',name:'Rider Técnico',icon:'📋',group:'🎭 Espectáculos y Escenario',
 desc:'Especificaciones técnicas de sonido, luces, backline y camerinos.',
 types:{section:ty('Sección','📋',C.blue),sound:ty('Sonido','🔊',C.indigo),
  light:ty('Iluminación','💡',C.yellow),backline:ty('Backline','🎸',C.purple),
  staging:ty('Escenario','🎭',C.teal),hospitality:ty('Hospitality','🍽️',C.green)},
 tree:{name:'Rider Técnico — Banda',type:'section',children:[
  {name:'Sonido',type:'sound',children:[
   {name:'PA L-Acoustics K2 (x2 por lado)',type:'sound'},
   {name:'Subwoofers KS28 (x6)',type:'sound'},
   {name:'Mesa FOH: DiGiCo SD12',type:'sound'},
   {name:'Monitores in-ear Shure PSM1000',type:'sound'},
   {name:'Micros: SM58, SM57, Beta 91',type:'sound'}]},
  {name:'Iluminación',type:'light',children:[
   {name:'Movers spot: Robe BMFL (x8)',type:'light'},
   {name:'Wash LED: Clay Paky B-Eye (x12)',type:'light'},
   {name:'Blinders 4-lite (x4)',type:'light'},
   {name:'Mesa: GrandMA3 light',type:'light'}]},
  {name:'Backline',type:'backline',children:[
   {name:'Amps guitarra: Fender Twin + Marshall JCM800',type:'backline'},
   {name:'Bajo: Ampeg SVT-4 + 8x10',type:'backline'},
   {name:'Batería: DW Collector + set de platos',type:'backline'},
   {name:'Teclados: Nord Stage 3 + Moog Sub37',type:'backline'}]},
  {name:'Escenario',type:'staging',children:[
   {name:'Dimensiones mínimas: 12m x 10m',type:'staging'},
   {name:'Altura mínima: 1.5m',type:'staging'},
   {name:'Risers batería y teclados',type:'staging'}]},
  {name:'Hospitality',type:'hospitality',children:[
   {name:'Camerinos (x4) con ducha',type:'hospitality'},
   {name:'Catering: agua, fruta, café, snacks',type:'hospitality'},
   {name:'WiFi en camerinos',type:'hospitality'}]}]}},

{id:'lighting',name:'Diseño de Iluminación (Cue List)',icon:'💡',group:'🎭 Espectáculos y Escenario',
 desc:'Cues de iluminación por canción o momento del show.',
 types:{cuelist:ty('Cue List','💡',C.blue),cue:ty('Cue','🎬',C.indigo),
  fixture:ty('Foco','🔦',C.yellow),color:ty('Color','🎨',C.purple),
  position:ty('Posición','📍',C.teal),intensity:ty('Intensidad','⚡',C.orange)},
 tree:{name:'Cue List — Show 90 min',type:'cuelist',children:[
  {name:'Cue 1 — Intro (0:00)',type:'cue',children:[
   {name:'Blackout general',type:'intensity'},{name:'Blinders frontales 100%',type:'fixture'},
   {name:'Color: blanco frío #FFFFFF',type:'color'}]},
  {name:'Cue 2 — Canción 1 "Amanecer"',type:'cue',children:[
   {name:'Wash azul profundo (#0033AA)',type:'color'},
   {name:'Movers posición frontal',type:'position'},
   {name:'Fade in 3s',type:'intensity'}]},
  {name:'Cue 3 — Estribillo (1:20)',type:'cue',children:[
   {name:'Full flash blanco',type:'intensity'},{name:'Movers haz abanico',type:'fixture'}]},
  {name:'Cue 4 — Balada (25:00)',type:'cue',children:[
   {name:'Side lights ámbar (#FFB84D)',type:'color'},
   {name:'Intensidad 30%',type:'intensity'},{name:'Follow spot cantante',type:'fixture'}]},
  {name:'Cue 5 — Clímax (1:15:00)',type:'cue',children:[
   {name:'Todos los movers en rojo',type:'color'},
   {name:'Blinders strobe 8Hz',type:'intensity'},{name:'Confetti + CO2',type:'fixture'}]},
  {name:'Cue 6 — Encore',type:'cue'}]}},

{id:'stageplot',name:'Plan de Escenario (Stage Plot)',icon:'🎭',group:'🎭 Espectáculos y Escenario',
 desc:'Posición de músicos, backline, monitores y canales de entrada.',
 types:{stage:ty('Escenario','🎭',C.blue),zone:ty('Zona','📍',C.indigo),
  musician:ty('Músico','🎤',C.orange),backline:ty('Backline','🎸',C.purple),
  monitor:ty('Monitor','🔊',C.teal),channel:ty('Canal','🎚️',C.green)},
 tree:{name:'Stage Plot — Banda 5',type:'stage',children:[
  {name:'Frontal (Downstage)',type:'zone',children:[
   {name:'Lead vocal — Center',type:'musician',children:[
    {name:'Canal 1: SM58',type:'channel'},{name:'Monitor 1 + IEM',type:'monitor'}]},
   {name:'Guitarra — Stage Left',type:'musician',children:[
    {name:'Canal 2: SM57 amp',type:'channel'},{name:'Monitor 2',type:'monitor'}]},
   {name:'Bajo — Stage Right',type:'musician',children:[
    {name:'Canal 3: DI + amp',type:'channel'},{name:'Monitor 3',type:'monitor'}]}]},
  {name:'Mid (Centro)',type:'zone',children:[
   {name:'Teclados — Side',type:'musician',children:[
    {name:'Canal 4-5: DI stereo',type:'channel'},{name:'Monitor 4',type:'monitor'}]},
   {name:'Batería — Upstage center',type:'musician',children:[
    {name:'Canal 6: Kick',type:'channel'},{name:'Canal 7: Snare',type:'channel'},
    {name:'Canal 8-9: Overheads',type:'channel'},{name:'Monitor 5',type:'monitor'}]}]},
  {name:'Backline',type:'backline',children:[
   {name:'Amp guitarra (mic SM57)',type:'backline'},
   {name:'Amp bajo',type:'backline'},{name:'Riser batería',type:'backline'}]},
  {name:'Notas técnicas',type:'zone',children:[
   {name:'Stage plot en PDF adjunto',type:'zone'},
   {name:'Diagrama con dimensiones exactas',type:'zone'}]}]}},

{id:'tour',name:'Gira / Tour Musical',icon:'🚌',group:'🎭 Espectáculos y Escenario',
 desc:'Ruta, ciudades, venues, fechas, equipo y logística de una gira.',
 types:{tour:ty('Tour','🚌',C.blue),leg:ty('Tramo','🗺️',C.indigo),
  show:ty('Show','🎤',C.purple),venue:ty('Venue','🏟️',C.orange),
  crew:ty('Equipo','👥',C.teal),logistics:ty('Logística','🚚',C.gray)},
 tree:{name:'Tour 2025 — América & Europa',type:'tour',children:[
  {name:'Tramo 1: México',type:'leg',children:[
   {name:'CDMX — Arena 15.000',type:'show',children:[{name:'Venue: Arena CDMX',type:'venue'}]},
   {name:'Monterrey — Arena 10.000',type:'show'},
   {name:'Guadalajara — Auditorio 8.000',type:'show'}]},
  {name:'Tramo 2: España',type:'leg',children:[
   {name:'Madrid — Wizink Center',type:'show'},{name:'Barcelona — Palau Sant Jordi',type:'show'},
   {name:'Bilbao — Bizkaia Arena',type:'show'}]},
  {name:'Tramo 3: Europa',type:'leg',children:[
   {name:'París — Accor Arena',type:'show'},{name:'Berlín — Mercedes-Benz Arena',type:'show'},
   {name:'Londres — O2 Arena',type:'show'}]},
  {name:'Equipo',type:'crew',children:[
   {name:'Tour manager',type:'crew'},{name:'Production manager',type:'crew'},
   {name:'FOH engineer',type:'crew'},{name:'Lighting designer',type:'crew'},
   {name:'Monitor engineer',type:'crew'},{name:'Backline techs (x3)',type:'crew'}]},
  {name:'Logística',type:'logistics',children:[
   {name:'3 trailers + 2 buses',type:'logistics'},{name:'Permisos y visados',type:'logistics'},
   {name:'Merch por ciudad',type:'logistics'},{name:'Contratos de venues',type:'logistics'}]}]}},

{id:'theater',name:'Obra de Teatro',icon:'🎭',group:'🎭 Espectáculos y Escenario',
 desc:'Estructura de una obra: actos, escenas, vestuario y producción.',
 types:{play:ty('Obra','🎭',C.blue),act:ty('Acto','📖',C.indigo),
  scene:ty('Escena','🎬',C.purple),char:ty('Personaje','👤',C.orange),
  costume:ty('Vestuario','👗',C.pink),set:ty('Escenografía','🪑',C.teal)},
 tree:{name:'Obra "El Silencio"',type:'play',children:[
  {name:'Acto I',type:'act',children:[
   {name:'Escena 1 — Salón burgués',type:'scene',children:[
    {name:'Madre',type:'char'},{name:'Hija',type:'char'},
    {name:'Vestuario época 1920',type:'costume'},{name:'Salón con piano',type:'set'}]},
   {name:'Escena 2 — Jardín',type:'scene'}]},
  {name:'Acto II',type:'act',children:[
   {name:'Escena 1 — Confrontación',type:'scene'},
   {name:'Escena 2 — Monólogo hija',type:'scene'}]},
  {name:'Acto III',type:'act',children:[
   {name:'Escena única — Resolución',type:'scene'}]},
  {name:'Producción',type:'play',children:[
   {name:'Escenografía rotativa',type:'set'},{name:'Iluminación dramática',type:'set'},
   {name:'Vestuario (x12 personajes)',type:'costume'}]}]}},

/* ─────────── VIAJES ─────────── */
{id:'travel',name:'Itinerario de Viaje',icon:'✈️',group:'✈️ Viajes',
 desc:'Plan día a día con vuelos, alojamiento, actividades y presupuesto.',
 types:{trip:ty('Viaje','✈️',C.blue),day:ty('Día','📅',C.indigo),
  flight:ty('Vuelo','🛫',C.purple),hotel:ty('Alojamiento','🏨',C.orange),
  activity:ty('Actividad','🎯',C.teal),food:ty('Restaurante','🍽️',C.green),
  budget:ty('Presupuesto','💰',C.yellow)},
 tree:{name:'Japón 14 días',type:'trip',children:[
  {name:'Pre-viaje',type:'day',children:[
   {name:'Vuelos MAD-NRT (ida y vuelta)',type:'flight'},
   {name:'JR Pass 14 días',type:'activity'},{name:'Seguro de viaje',type:'budget'}]},
  {name:'Día 1-3: Tokio',type:'day',children:[
   {name:'Hotel Shinjuku',type:'hotel'},
   {name:'Shibuya, Shinjuku, Harajuku',type:'activity'},
   {name:'TeamLab Planets',type:'activity'},{name:'Sushi en Tsukiji',type:'food'}]},
  {name:'Día 4-5: Hakone',type:'day',children:[
   {name:'Ryokan con onsen',type:'hotel'},{name:'Monte Fuji',type:'activity'},
   {name:'Lago Ashi',type:'activity'}]},
  {name:'Día 6-8: Kioto',type:'day',children:[
   {name:'Machiya tradicional',type:'hotel'},
   {name:'Fushimi Inari',type:'activity'},{name:'Kinkaku-ji',type:'activity'},
   {name:'Gion (geishas)',type:'activity'},{name:'Kaiseki',type:'food'}]},
  {name:'Día 9-10: Osaka',type:'day',children:[
   {name:'Dotonbori',type:'activity'},{name:'Castillo de Osaka',type:'activity'},
   {name:'Takoyaki',type:'food'}]},
  {name:'Día 11-12: Nara + Hiroshima',type:'day',children:[
   {name:'Ciervos de Nara',type:'activity'},{name:'Parque Memorial de la Paz',type:'activity'}]},
  {name:'Día 13-14: Regreso',type:'day',children:[
   {name:'Vuelo NRT-MAD',type:'flight'}]},
  {name:'Presupuesto total',type:'budget',children:[
   {name:'Vuelos: 950 €',type:'budget'},{name:'Alojamiento: 1.200 €',type:'budget'},
   {name:'Comida: 600 €',type:'budget'},{name:'Actividades: 400 €',type:'budget'}]}]}},

{id:'travelcat',name:'Catálogo de Paquetes Turísticos',icon:'🧳',group:'✈️ Viajes',
 desc:'Catálogo de paquetes por destino, duración, precio y tipo de cliente.',
 types:{catalog:ty('Catálogo','🧳',C.blue),region:ty('Destino','🌍',C.indigo),
  pkg:ty('Paquete','📦',C.purple),duration:ty('Duración','⏱️',C.teal),
  price:ty('Precio','💰',C.orange),audience:ty('Perfil','👥',C.green),tag:ty('Tag','🏷️',C.yellow)},
 tree:{name:'Catálogo 2025',type:'catalog',children:[
  {name:'Caribe',type:'region',children:[
   {name:'Punta Cana Todo Incluido',type:'pkg',children:[
    {name:'7 noches',type:'duration'},{name:'Desde 1.190 €',type:'price'},
    {name:'Familias',type:'audience'},{name:'Todo incluido',type:'tag'}]},
   {name:'Riviera Maya Aventura',type:'pkg',children:[
    {name:'10 noches',type:'duration'},{name:'Desde 1.590 €',type:'price'},
    {name:'Parejas',type:'audience'},{name:'Aventura',type:'tag'}]}]},
  {name:'Europa',type:'region',children:[
   {name:'Ruta por Italia',type:'pkg',children:[
    {name:'8 días / 7 noches',type:'duration'},{name:'Desde 890 €',type:'price'},
    {name:'Cultural',type:'tag'},{name:'Senior',type:'audience'}]},
   {name:'Fiordos Noruegos',type:'pkg',children:[
    {name:'6 días',type:'duration'},{name:'Desde 1.750 €',type:'price'},
    {name:'Naturaleza',type:'tag'}]}]},
  {name:'Asia',type:'region',children:[
   {name:'Japón Esencial',type:'pkg',children:[
    {name:'12 días',type:'duration'},{name:'Desde 2.490 €',type:'price'},
    {name:'Cultural',type:'tag'}]},
   {name:'Bali & Lombok',type:'pkg',children:[
    {name:'11 días',type:'duration'},{name:'Desde 1.890 €',type:'price'}]}]},
  {name:'Luna de miel',type:'region',children:[
   {name:'Maldivas Premium',type:'pkg',children:[
    {name:'8 días',type:'duration'},{name:'Desde 3.200 €',type:'price'},
    {name:'Parejas',type:'audience'},{name:'Lujo',type:'tag'}]}]}]}},

{id:'agency',name:'Agencia de Viajes — Procesos',icon:'🌐',group:'✈️ Viajes',
 desc:'Flujos internos de una agencia: preventa, reserva, postventa y fidelización.',
 types:{process:ty('Proceso','🌐',C.blue),stage:ty('Etapa','🪜',C.indigo),
  task:ty('Tarea','✅',C.teal),doc:ty('Documento','📄',C.gray),
  system:ty('Sistema','🖥️',C.orange),role:ty('Rol','👤',C.purple)},
 tree:{name:'Procesos — Agencia',type:'process',children:[
  {name:'Preventa',type:'stage',children:[
   {name:'Captación de leads',type:'task'},{name:'Asesoría personalizada',type:'task'},
   {name:'Propuesta de viaje',type:'doc'},{name:'CRM',type:'system'},{name:'Agente',type:'role'}]},
  {name:'Reserva',type:'stage',children:[
   {name:'Confirmación de disponibilidad',type:'task'},
   {name:'Pago y emisión de billetes',type:'task'},{name:'GDS Amadeus',type:'system'},
   {name:'Voucher',type:'doc'}]},
  {name:'Documentación',type:'stage',children:[
   {name:'Visados y seguro',type:'task'},{name:'Itinerario final',type:'doc'}]},
  {name:'Viaje en curso',type:'stage',children:[
   {name:'Asistencia 24/7',type:'task'},{name:'WhatsApp soporte',type:'system'}]},
  {name:'Postventa',type:'stage',children:[
   {name:'Encuesta de satisfacción',type:'task'},
   {name:'Programa de fidelización',type:'task'},{name:'Cupones y referidos',type:'task'}]}]}},

/* ─────────── CATÁLOGOS Y RETAIL ─────────── */
{id:'prodcat',name:'Catálogo de Productos',icon:'🛍️',group:'🛍️ Catálogos y Retail',
 desc:'Catálogo por categorías, subcategorías, SKUs y variantes.',
 types:{catalog:ty('Catálogo','🛍️',C.blue),cat:ty('Categoría','📁',C.indigo),
  subcat:ty('Subcategoría','📂',C.purple),sku:ty('SKU / Producto','📦',C.orange),
  variant:ty('Variante','🎨',C.green),price:ty('Precio','💰',C.yellow)},
 tree:{name:'Catálogo Tienda Online',type:'catalog',children:[
  {name:'Ropa',type:'cat',children:[
   {name:'Camisetas',type:'subcat',children:[
    {name:'Camiseta básica — SKU CM001',type:'sku',children:[
     {name:'Talla S / M / L / XL',type:'variant'},{name:'29,90 €',type:'price'}]},
    {name:'Camiseta oversize — SKU CM002',type:'sku'}]},
   {name:'Pantalones',type:'subcat',children:[
    {name:'Vaqueros slim — SKU PN001',type:'sku'},{name:'Chinos — SKU PN002',type:'sku'}]},
   {name:'Chaquetas',type:'subcat',children:[
    {name:'Bomber — SKU CH001',type:'sku'},{name:'Denim jacket — SKU CH002',type:'sku'}]}]},
  {name:'Calzado',type:'cat',children:[
   {name:'Sneakers',type:'subcat',children:[
    {name:'Sneaker blanca — SKU SN001',type:'sku'}]},
   {name:'Botas',type:'subcat'},{name:'Sandalias',type:'subcat'}]},
  {name:'Accesorios',type:'cat',children:[
   {name:'Gorras',type:'subcat'},{name:'Bolsos',type:'subcat'},{name:'Joyas',type:'subcat'}]}]}},

{id:'ecommerce',name:'Categorías E-commerce',icon:'🛒',group:'🛍️ Catálogos y Retail',
 desc:'Árbol de navegación de una tienda: home, categorías y subcategorías.',
 types:{home:ty('Home','🛒',C.blue),cat:ty('Categoría','📁',C.indigo),
  filter:ty('Filtro','🔍',C.teal),product:ty('Producto','📦',C.orange),
  page:ty('Página','📄',C.purple),checkout:ty('Checkout','💳',C.green)},
 tree:{name:'Tienda Online',type:'home',children:[
  {name:'Moda',type:'cat',children:[
   {name:'Mujer',type:'cat',children:[
    {name:'Filtro: talla, color, precio',type:'filter'},
    {name:'Vestido floral — 49 €',type:'product'}]},
   {name:'Hombre',type:'cat'},{name:'Niños',type:'cat'}]},
  {name:'Electrónica',type:'cat',children:[
   {name:'Móviles',type:'cat'},{name:'Portátiles',type:'cat'},
   {name:'Audio',type:'cat'},{name:'Smart home',type:'cat'}]},
  {name:'Hogar',type:'cat',children:[
   {name:'Muebles',type:'cat'},{name:'Decoración',type:'cat'},{name:'Cocina',type:'cat'}]},
  {name:'Páginas transversales',type:'page',children:[
   {name:'Quiénes somos',type:'page'},{name:'Envíos y devoluciones',type:'page'},
   {name:'Contacto',type:'page'},{name:'Blog',type:'page'}]},
  {name:'Checkout',type:'checkout',children:[
   {name:'Carrito',type:'checkout'},{name:'Datos de envío',type:'checkout'},
   {name:'Pago',type:'checkout'},{name:'Confirmación',type:'checkout'}]}]}},

{id:'lookbook',name:'Lookbook de Moda',icon:'👗',group:'🛍️ Catálogos y Retail',
 desc:'Colección por temporada, looks, prendas y estilismo.',
 types:{season:ty('Temporada','👗',C.blue),look:ty('Look','📸',C.purple),
  garment:ty('Prenda','👕',C.orange),accessory:ty('Accesorio','💍',C.pink),
  styling:ty('Estilismo','🎨',C.teal),mood:ty('Mood / Concepto','💭',C.yellow)},
 tree:{name:'Colección Primavera/Verano 2025',type:'season',children:[
  {name:'Concepto: Costa Mediterránea',type:'mood',children:[
   {name:'Paleta: blanco, arena, azul',type:'mood'},
   {name:'Texturas: lino, algodón',type:'mood'}]},
  {name:'Look 01 — Mañana en la playa',type:'look',children:[
   {name:'Camisa de lino blanca',type:'garment'},
   {name:'Pantalón wide leg crudo',type:'garment'},
   {name:'Sandalia de piel',type:'accessory'},
   {name:'Estilismo: minimal relajado',type:'styling'}]},
  {name:'Look 02 — Paseo por el puerto',type:'look',children:[
   {name:'Vestido midi estampado',type:'garment'},
   {name:'Bolso rafia',type:'accessory'},{name:'Gafas de sol',type:'accessory'}]},
  {name:'Look 03 — Cena al atardecer',type:'look',children:[
   {name:'Top satinado',type:'garment'},{name:'Falda larga plisada',type:'garment'},
   {name:'Sandalias de tacón',type:'accessory'},{name:'Joyas doradas',type:'accessory'}]},
  {name:'Look 04 — Noche de fiesta',type:'look'}]}},

/* ─────────── EDUCACIÓN ─────────── */
{id:'course',name:'Curso Online / Educación',icon:'🎓',group:'🎓 Educación',
 desc:'Módulos, lecciones, recursos y evaluaciones de un curso online.',
 types:{course:ty('Curso','🎓',C.blue),module:ty('Módulo','📚',C.indigo),
  lesson:ty('Lección','🎬',C.purple),resource:ty('Recurso','📄',C.gray),
  quiz:ty('Evaluación','📝',C.orange),cert:ty('Certificado','🏆',C.green)},
 tree:{name:'Curso — Marketing Digital',type:'course',children:[
  {name:'Módulo 1 — Fundamentos',type:'module',children:[
   {name:'1.1 ¿Qué es el marketing digital?',type:'lesson'},
   {name:'1.2 Buyer persona',type:'lesson'},{name:'1.3 Embudo de conversión',type:'lesson'},
   {name:'PDF: Plantilla de buyer persona',type:'resource'},
   {name:'Quiz módulo 1',type:'quiz'}]},
  {name:'Módulo 2 — SEO',type:'module',children:[
   {name:'2.1 Cómo funciona Google',type:'lesson'},
   {name:'2.2 Keyword research',type:'lesson'},{name:'2.3 SEO on-page',type:'lesson'},
   {name:'2.4 Linkbuilding',type:'lesson'},{name:'Quiz módulo 2',type:'quiz'}]},
  {name:'Módulo 3 — Publicidad (Ads)',type:'module',children:[
   {name:'3.1 Meta Ads',type:'lesson'},{name:'3.2 Google Ads',type:'lesson'},
   {name:'3.3 TikTok Ads',type:'lesson'},{name:'Quiz módulo 3',type:'quiz'}]},
  {name:'Módulo 4 — Email & CRM',type:'module',children:[
   {name:'4.1 Email marketing',type:'lesson'},{name:'4.2 Automatizaciones',type:'lesson'},
   {name:'Quiz módulo 4',type:'quiz'}]},
  {name:'Proyecto final',type:'module',children:[
   {name:'Plan de marketing completo',type:'resource'},
   {name:'Certificado del curso',type:'cert'}]}]}},

{id:'school',name:'Plan de Estudios (Grado / Máster)',icon:'📚',group:'🎓 Educación',
 desc:'Asignaturas, créditos, competencias y evaluación por curso.',
 types:{program:ty('Programa','📚',C.blue),year:ty('Curso','📅',C.indigo),
  semester:ty('Semestre','📆',C.purple),subject:ty('Asignatura','📖',C.orange),
  credits:ty('Créditos','🎯',C.teal),eval:ty('Evaluación','📝',C.green)},
 tree:{name:'Grado en Ingeniería Informática',type:'program',children:[
  {name:'Curso 1',type:'year',children:[
   {name:'Semestre 1',type:'semester',children:[
    {name:'Programación I — 6 ECTS',type:'subject',children:[
     {name:'Examen 60% + prácticas 40%',type:'eval'}]},
    {name:'Matemáticas I — 6 ECTS',type:'subject'},
    {name:'Fundamentos de computadores — 6 ECTS',type:'subject'}]},
   {name:'Semestre 2',type:'semester',children:[
    {name:'Programación II — 6 ECTS',type:'subject'},
    {name:'Matemáticas II — 6 ECTS',type:'subject'}]}]},
  {name:'Curso 2',type:'year',children:[
   {name:'Estructuras de datos — 6 ECTS',type:'subject'},
   {name:'Bases de datos — 6 ECTS',type:'subject'},
   {name:'Sistemas operativos — 6 ECTS',type:'subject'}]},
  {name:'Curso 3',type:'year',children:[
   {name:'Redes — 6 ECTS',type:'subject'},{name:'Ingeniería del software — 6 ECTS',type:'subject'},
   {name:'Inteligencia artificial — 6 ECTS',type:'subject'}]},
  {name:'Curso 4',type:'year',children:[
   {name:'Optativas',type:'semester'},{name:'Trabajo Fin de Grado — 12 ECTS',type:'subject'}]}]}},

/* ─────────── SALUD ─────────── */
{id:'clinic',name:'Proceso Clínico / Historia',icon:'🏥',group:'🏥 Salud',
 desc:'Anamnesis, diagnóstico, tratamiento, seguimiento y alta.',
 types:{process:ty('Proceso','🏥',C.blue),stage:ty('Etapa','🪜',C.indigo),
  test:ty('Prueba diagnóstica','🔬',C.purple),doc:ty('Documento','📄',C.gray),
  role:ty('Profesional','👤',C.teal),decision:ty('Decisión clínica','🔀',C.orange)},
 tree:{name:'Consulta — Medicina General',type:'process',children:[
  {name:'Recepción y triaje',type:'stage',children:[
   {name:'Admisión',type:'role'},{name:'Enfermería toma constantes',type:'role'}]},
  {name:'Anamnesis',type:'stage',children:[
   {name:'Motivo de consulta',type:'doc'},{name:'Antecedentes familiares',type:'doc'},
   {name:'Medicación actual',type:'doc'}]},
  {name:'Exploración',type:'stage',children:[
   {name:'Exploración física',type:'role'},{name:'Analítica de sangre',type:'test'},
   {name:'ECG',type:'test'}]},
  {name:'Diagnóstico',type:'decision',children:[
   {name:'Sospecha A → Tratamiento',type:'stage'},{name:'Sospecha B → Derivar a especialista',type:'stage'}]},
  {name:'Tratamiento',type:'stage',children:[
   {name:'Receta electrónica',type:'doc'},{name:'Recomendaciones',type:'doc'}]},
  {name:'Seguimiento',type:'stage',children:[
   {name:'Revisión en 15 días',type:'stage'},{name:'Analítica de control',type:'test'}]},
  {name:'Alta',type:'stage'}]}},

/* ─────────── INMOBILIARIA ─────────── */
{id:'realestate',name:'Proceso Inmobiliario',icon:'🏠',group:'🏠 Inmobiliaria',
 desc:'Captación, visita, negociación, hipoteca y firma de una vivienda.',
 types:{process:ty('Proceso','🏠',C.blue),stage:ty('Etapa','🪜',C.indigo),
  doc:ty('Documento','📄',C.gray),role:ty('Rol','👤',C.purple),
  system:ty('Sistema','🖥️',C.orange),decision:ty('Decisión','🔀',C.teal)},
 tree:{name:'Compraventa de vivienda',type:'process',children:[
  {name:'Captación',type:'stage',children:[
   {name:'Valoración de mercado',type:'doc'},{name:'Fotografía + vídeo',type:'doc'},
   {name:'Publicación en portales',type:'system'},{name:'Idealista, Fotocasa',type:'system'}]},
  {name:'Visitas',type:'stage',children:[
   {name:'Agenda de visitas',type:'role'},{name:'Feedback del cliente',type:'doc'}]},
  {name:'Oferta y negociación',type:'stage',children:[
   {name:'¿Oferta aceptada?',type:'decision',children:[
    {name:'Sí → Reserva',type:'stage'},{name:'No → Contra-oferta',type:'stage'}]},
   {name:'Contrato de arras',type:'doc'}]},
  {name:'Due diligence',type:'stage',children:[
   {name:'Nota simple del Registro',type:'doc'},{name:'Certificado energético',type:'doc'},
   {name:'Cédula de habitabilidad',type:'doc'}]},
  {name:'Financiación',type:'stage',children:[
   {name:'Aprobación hipotecaria',type:'role'},{name:'Tasación oficial',type:'doc'},
   {name:'FEIN firmada',type:'doc'}]},
  {name:'Firma en notaría',type:'stage',children:[
   {name:'Escritura pública',type:'doc'},{name:'Registro de la propiedad',type:'system'},
   {name:'Cambio de suministros',type:'role'}]}]}},

/* ─────────── RRHH ─────────── */
{id:'onboarding',name:'Onboarding de Empleado',icon:'👋',group:'👥 RRHH',
 desc:'Proceso de incorporación: pre-boarding, día 1, primera semana, 90 días.',
 types:{stage:ty('Etapa','🪜',C.blue),task:ty('Tarea','✅',C.teal),
  doc:ty('Documento','📄',C.gray),role:ty('Responsable','👤',C.purple),
  system:ty('Herramienta','🛠️',C.orange),milestone:ty('Hito','🏁',C.green)},
 tree:{name:'Onboarding — Nuevo empleado',type:'stage',children:[
  {name:'Pre-boarding (antes del día 1)',type:'stage',children:[
   {name:'Firma de contrato',type:'doc'},{name:'Alta en Seguridad Social',type:'task'},
   {name:'Envío de welcome kit',type:'task'},{name:'RRHH',type:'role'},
   {name:'Pandadoc',type:'system'}]},
  {name:'Día 1',type:'stage',children:[
   {name:'Bienvenida y tour de oficina',type:'task'},
   {name:'Entrega de portátil y accesos',type:'task'},
   {name:'Comida con el equipo',type:'task'},{name:'Buddy asignado',type:'role'}]},
  {name:'Primera semana',type:'stage',children:[
   {name:'Formación de producto',type:'task'},{name:'Reunión 1:1 con manager',type:'task'},
   {name:'Onboarding técnico',type:'task'},{name:'Notion',type:'system'}]},
  {name:'Primer mes',type:'stage',children:[
   {name:'Primer entregable real',type:'milestone'},
   {name:'Feedback estructurado 30 días',type:'task'}]},
  {name:'90 días',type:'stage',children:[
   {name:'Revisión de desempeño',type:'task'},{name:'Plan de crecimiento',type:'doc'},
   {name:'Confirmación en el puesto',type:'milestone'}]}]}},

{id:'recruit',name:'Proceso de Reclutamiento',icon:'🎯',group:'👥 RRHH',
 desc:'Vacante, sourcing, entrevistas, oferta y cierre.',
 types:{process:ty('Proceso','🎯',C.blue),stage:ty('Etapa','🪜',C.indigo),
  channel:ty('Canal','📡',C.teal),interview:ty('Entrevista','💬',C.purple),
  decision:ty('Decisión','🔀',C.orange),doc:ty('Documento','📄',C.gray)},
 tree:{name:'Reclutamiento — Senior Developer',type:'process',children:[
  {name:'Definición de vacante',type:'stage',children:[
   {name:'Job description',type:'doc'},{name:'Rango salarial',type:'doc'},
   {name:'Perfil técnico',type:'doc'}]},
  {name:'Sourcing',type:'stage',children:[
   {name:'LinkedIn Recruiter',type:'channel'},{name:'Referidos internos',type:'channel'},
   {name:'InfoJobs / Stack Overflow',type:'channel'}]},
  {name:'Screening',type:'stage',children:[
   {name:'Revisión de CVs',type:'stage'},{name:'Llamada inicial 15 min',type:'interview'}]},
  {name:'Entrevistas',type:'stage',children:[
   {name:'Entrevista técnica (live coding)',type:'interview'},
   {name:'Entrevista sistema de diseño',type:'interview'},
   {name:'Entrevista cultural fit',type:'interview'},
   {name:'Prueba técnica take-home',type:'interview'}]},
  {name:'Decisión final',type:'decision',children:[
   {name:'Sí → Oferta',type:'stage'},{name:'No → Feedback y cerrar',type:'stage'}]},
  {name:'Oferta y cierre',type:'stage',children:[
   {name:'Propuesta económica',type:'doc'},{name:'Firma de contrato',type:'doc'}]}]}},

/* ─────────── LOGÍSTICA ─────────── */
{id:'logistics',name:'Logística y Envíos',icon:'🚚',group:'📦 Logística',
 desc:'Recepción de pedido, picking, empaquetado, envío y entrega.',
 types:{process:ty('Proceso','🚚',C.blue),stage:ty('Etapa','🪜',C.indigo),
  system:ty('Sistema','🖥️',C.orange),carrier:ty('Transportista','🚛',C.purple),
  doc:ty('Documento','📄',C.gray),kpi:ty('KPI','📈',C.green)},
 tree:{name:'Logística e-commerce',type:'process',children:[
  {name:'Recepción de pedido',type:'stage',children:[
   {name:'Pedido online',type:'system'},{name:'ERP / WMS',type:'system'}]},
  {name:'Picking & Packing',type:'stage',children:[
   {name:'Picking por zonas',type:'stage'},{name:'Control de calidad',type:'stage'},
   {name:'Empaquetado y etiquetado',type:'stage'}]},
  {name:'Envío',type:'stage',children:[
   {name:'Asignación a transportista',type:'carrier'},
   {name:'Correos Express',type:'carrier'},{name:'SEUR',type:'carrier'},
   {name:'DHL Express',type:'carrier'},{name:'Tracking automático',type:'system'}]},
  {name:'Entrega',type:'stage',children:[
   {name:'Última milla',type:'stage'},{name:'Entrega en domicilio',type:'stage'},
   {name:'Punto de recogida',type:'stage'}]},
  {name:'Incidencias',type:'stage',children:[
   {name:'Devoluciones y RMA',type:'stage'},{name:'Reclamaciones',type:'stage'}]},
  {name:'KPIs',type:'kpi',children:[
   {name:'OTIF > 95%',type:'kpi'},{name:'Coste por envío < 4 €',type:'kpi'},
   {name:'Devoluciones < 5%',type:'kpi'}]}]}},

/* ─────────── MÚSICA Y AUDIO ─────────── */
{id:'album',name:'Álbum Musical',icon:'🎵',group:'🎵 Música y Audio',
 desc:'Estructura de un álbum: composición, grabación, mezcla, master y release.',
 types:{album:ty('Álbum','🎵',C.blue),phase:ty('Fase','📅',C.indigo),
  track:ty('Canción','🎶',C.purple),credit:ty('Crédito','👤',C.orange),
  deliver:ty('Entrega','📦',C.teal),role:ty('Rol','🎯',C.green)},
 tree:{name:'Álbum "Luz" — 10 tracks',type:'album',children:[
  {name:'Composición',type:'phase',children:[
   {name:'Track 1 "Amanecer" (3:45)',type:'track'},{name:'Track 2 "Ciudad" (4:12)',type:'track'},
   {name:'Track 3 "Sombra" (3:20)',type:'track'},{name:'Track 4 "Vuelo" (5:03)',type:'track'},
   {name:'Track 5 "Silencio" (4:30)',type:'track'}]},
  {name:'Pre-producción',type:'phase',children:[
   {name:'Maquetas',type:'deliver'},{name:'Arreglos',type:'deliver'},
   {name:'Pre-productor',type:'role'}]},
  {name:'Grabación',type:'phase',children:[
   {name:'Estudio A — Batería',type:'phase'},{name:'Estudio A — Bajos',type:'phase'},
   {name:'Estudio B — Guitarras',type:'phase'},{name:'Overdubs y voces',type:'phase'}]},
  {name:'Mezcla',type:'phase',children:[
   {name:'Mezclador — 5 días por track',type:'role'},{name:'Revisiones',type:'phase'},
   {name:'V1, V2, V3',type:'deliver'}]},
  {name:'Masterización',type:'phase',children:[
   {name:'Master para streaming',type:'deliver'},{name:'Master para vinilo',type:'deliver'},
   {name:'Master para CD',type:'deliver'}]},
  {name:'Release',type:'phase',children:[
   {name:'Distribución a Spotify / Apple',type:'deliver'},
   {name:'Videoclips (x3)',type:'deliver'},{name:'Press kit y bio',type:'deliver'},
   {name:'Prensa y promoción',type:'phase'}]}]}},

{id:'podcast',name:'Producción de Podcast',icon:'🎙️',group:'🎵 Música y Audio',
 desc:'Pipeline de producción de un episodio: guion, grabación, edición y publicación.',
 types:{episode:ty('Episodio','🎙️',C.blue),phase:ty('Fase','🪜',C.indigo),
  segment:ty('Sección','🎯',C.purple),role:ty('Rol','👤',C.orange),
  deliver:ty('Entrega','📦',C.teal),platform:ty('Plataforma','📡',C.green)},
 tree:{name:'Episodio 042',type:'episode',children:[
  {name:'Preproducción',type:'phase',children:[
   {name:'Investigación del tema',type:'segment'},{name:'Guion / escaleta',type:'segment'},
   {name:'Invitado confirmado',type:'role'}]},
  {name:'Grabación',type:'phase',children:[
   {name:'Intro / cabecera',type:'segment'},{name:'Entrevista (45 min)',type:'segment'},
   {name:'Sección "Preguntas rápidas"',type:'segment'},
   {name:'Cierre y CTA',type:'segment'},{name:'Técnico de sonido',type:'role'}]},
  {name:'Postproducción',type:'phase',children:[
   {name:'Edición y limpieza',type:'phase'},{name:'Mezcla y nivelado',type:'phase'},
   {name:'Música de fondo',type:'phase'},{name:'Mastering final',type:'deliver'},
   {name:'Editor de audio',type:'role'}]},
  {name:'Publicación',type:'phase',children:[
   {name:'Spotify for Podcasters',type:'platform'},{name:'Apple Podcasts',type:'platform'},
   {name:'YouTube',type:'platform'},{name:'Newsletter a suscriptores',type:'deliver'},
   {name:'Clips para redes sociales',type:'deliver'}]},
  {name:'Post-publicación',type:'phase',children:[
   {name:'Análisis de descargas',type:'phase'},
   {name:'Feedback de la audiencia',type:'phase'}]}]}},

{id:'photo',name:'Sesión Fotográfica',icon:'📸',group:'🎵 Música y Audio',
 desc:'Planificación de shoot: moodboard, localizaciones, equipo, rodaje y entrega.',
 types:{shoot:ty('Sesión','📸',C.blue),phase:ty('Fase','🪜',C.indigo),
  location:ty('Localización','📍',C.teal),look:ty('Look','👗',C.pink),
  crew:ty('Equipo','👥',C.orange),deliver:ty('Entrega','📦',C.green)},
 tree:{name:'Sesión Editorial — Moda',type:'shoot',children:[
  {name:'Concepto & Moodboard',type:'phase',children:[
   {name:'Referencias Pinterest',type:'phase'},{name:'Paleta y estética',type:'phase'}]},
  {name:'Pre-producción',type:'phase',children:[
   {name:'Casting de modelos',type:'phase'},{name:'Localizaciones',type:'location'},
   {name:'Estudio con ciclorama blanco',type:'location'},{name:'Casa modernista',type:'location'},
   {name:'Estilismo',type:'look'},{name:'Maquillaje y peluquería',type:'crew'},
   {name:'Fotógrafo',type:'crew'},{name:'Asistente de iluminación',type:'crew'}]},
  {name:'Rodaje',type:'phase',children:[
   {name:'Día 1 — Estudio (8h)',type:'phase'},{name:'Día 2 — Exteriores (6h)',type:'phase'},
   {name:'Setups: 6 looks x 15 fotos',type:'phase'}]},
  {name:'Post-producción',type:'phase',children:[
   {name:'Selección de 30 finalistas',type:'phase'},{name:'Retoque avanzado',type:'phase'},
   {name:'Retoque básico del resto',type:'phase'}]},
  {name:'Entrega',type:'deliver',children:[
   {name:'Galería online (Pixieset)',type:'deliver'},{name:'30 TIFF alta calidad',type:'deliver'},
   {name:'30 JPG web',type:'deliver'},{name:'Contact sheet PDF',type:'deliver'}]}]}},

/* ─────────── MODA ─────────── */
{id:'fashion',name:'Plan de Colección de Moda',icon:'🧵',group:'👗 Moda',
 desc:'Ciclo completo: tendencias, diseño, patronaje, producción y showroom.',
 types:{collection:ty('Colección','🧵',C.blue),phase:ty('Fase','📅',C.indigo),
  garment:ty('Prenda','👗',C.purple),material:ty('Material','🧶',C.teal),
  supplier:ty('Proveedor','🏭',C.orange),show:ty('Showroom / Desfile','🎭',C.pink)},
 tree:{name:'Colección Otoño/Invierno 2025',type:'collection',children:[
  {name:'Tendencias & research',type:'phase',children:[
   {name:'WGSN, Vogue Runway',type:'phase'},{name:'Moodboard',type:'phase'}]},
  {name:'Diseño',type:'phase',children:[
   {name:'Croquis de 40 prendas',type:'garment'},{name:'Selección de 24 finales',type:'garment'},
   {name:'Fichas técnicas',type:'phase'}]},
  {name:'Materiales',type:'phase',children:[
   {name:'Lana merino',type:'material'},{name:'Seda',type:'material'},
   {name:'Denim selvedge',type:'material'},{name:'Proveedores italianos',type:'supplier'},
   {name:'Proveedores portugueses',type:'supplier'}]},
  {name:'Patronaje & prototipos',type:'phase',children:[
   {name:'Patrones base',type:'phase'},{name:'Toiles (x24)',type:'phase'},
   {name:'Ajustes de fit',type:'phase'}]},
  {name:'Producción',type:'phase',children:[
   {name:'Producción en taller Portugal',type:'supplier'},
   {name:'Control de calidad',type:'phase'},{name:'Etiquetado y packaging',type:'phase'}]},
  {name:'Comunicación',type:'phase',children:[
   {name:'Lookbook',type:'show'},{name:'Vídeo campaña',type:'show'},
   {name:'Press kit',type:'phase'}]},
  {name:'Distribución',type:'phase',children:[
   {name:'Showroom París',type:'show'},{name:'Venta online',type:'show'},
   {name:'Multimarca',type:'show'}]}]}},

/* ─────────── DEPORTES ─────────── */
{id:'tournament',name:'Torneo Deportivo',icon:'🏆',group:'⚽ Deportes',
 desc:'Fases, equipos, calendario, sedes y premiación de un torneo.',
 types:{tournament:ty('Torneo','🏆',C.blue),phase:ty('Fase','🪜',C.indigo),
  team:ty('Equipo','👥',C.purple),match:ty('Partido','⚽',C.orange),
  venue:ty('Sede','🏟️',C.teal),ref:ty('Árbitro','🟨',C.gray),prize:ty('Premio','🥇',C.yellow)},
 tree:{name:'Torneo Apertura 2025',type:'tournament',children:[
  {name:'Fase de grupos',type:'phase',children:[
   {name:'Grupo A',type:'phase',children:[
    {name:'Equipo 1',type:'team'},{name:'Equipo 2',type:'team'},
    {name:'Equipo 3',type:'team'},{name:'Equipo 4',type:'team'},
    {name:'Estadio Central — 20.000',type:'venue'},
    {name:'Jornada 1, 2, 3',type:'match'}]},
   {name:'Grupo B',type:'phase'},{name:'Grupo C',type:'phase'},{name:'Grupo D',type:'phase'}]},
  {name:'Octavos de final',type:'phase',children:[
   {name:'8 partidos eliminatorios',type:'match'},{name:'Árbitros FIFA',type:'ref'}]},
  {name:'Cuartos de final',type:'phase',children:[{name:'4 partidos',type:'match'}]},
  {name:'Semifinales',type:'phase',children:[{name:'2 partidos',type:'match'}]},
  {name:'Final',type:'phase',children:[
   {name:'Partido por el 3er puesto',type:'match'},{name:'Gran Final',type:'match'},
   {name:'Trofeo campeón + $500.000',type:'prize'},
   {name:'Medallas y reconocimientos',type:'prize'}]}]}},

/* ─────────── LEGAL ─────────── */
{id:'legal',name:'Ciclo de Vida de un Contrato',icon:'⚖️',group:'⚖️ Legal',
 desc:'Solicitud, negociación, firma, gestión y renovación de contratos.',
 types:{process:ty('Proceso','⚖️',C.blue),stage:ty('Etapa','🪜',C.indigo),
  doc:ty('Documento','📄',C.gray),role:ty('Rol','👤',C.purple),
  clause:ty('Cláusula clave','📌',C.orange),system:ty('Herramienta','🖥️',C.teal)},
 tree:{name:'Ciclo de contrato',type:'process',children:[
  {name:'Solicitud',type:'stage',children:[
   {name:'Intake del área solicitante',type:'role'},{name:'Formulario de solicitud',type:'doc'},
   {name:'Jira Service Management',type:'system'}]},
  {name:'Redacción',type:'stage',children:[
   {name:'Plantilla base + adaptación',type:'doc'},
   {name:'Cláusulas específicas',type:'clause'},{name:'Abogado interno',type:'role'}]},
  {name:'Negociación',type:'stage',children:[
   {name:'Ronda de comentarios (x2-3)',type:'stage'},
   {name:'Puntos críticos',type:'clause'},{name:'Comité de riesgos',type:'role'}]},
  {name:'Firma',type:'stage',children:[
   {name:'Firma electrónica',type:'system'},{name:'DocuSign',type:'system'},
   {name:'Registro y archivo',type:'doc'}]},
  {name:'Gestión',type:'stage',children:[
   {name:'Obligaciones contractuales',type:'clause'},
   {name:'Fechas de pago y entregas',type:'clause'},{name:'Renovaciones',type:'stage'}]},
  {name:'Renovación / Terminación',type:'stage',children:[
   {name:'Aviso con 30 días',type:'clause'},{name:'Acuerdo de terminación',type:'doc'},
   {name:'Lecciones aprendidas',type:'doc'}]}]}}
,

/* ─────────── DISEÑO GRÁFICO Y EDITORIAL ─────────── */
{id:'labels',name:'Diseño de Etiquetas',icon:'🏷️',group:'🎨 Diseño Gráfico',
 desc:'Etiquetas de producto con materiales, formatos, acabados y normativa.',
 types:{project:ty('Proyecto','🏷️',C.blue),label:ty('Etiqueta','📎',C.indigo),
  section:ty('Sección','📐',C.purple),element:ty('Elemento','🔤',C.teal),
  material:ty('Material','📄',C.green),finish:ty('Acabado','✨',C.orange),
  norm:ty('Normativa','⚖️',C.red),variant:ty('Variante','🎨',C.pink)},
 tree:{name:'Etiqueta — Vino Reserva',type:'project',children:[
  {name:'Frontal principal',type:'label',children:[
   {name:'Marca / Logotipo',type:'section',children:[
    {name:'Nombre de marca',type:'element'},{name:'Símbolo gráfico',type:'element'}]},
   {name:'Denominación del producto',type:'section',children:[
    {name:'Vino Tinto Reserva',type:'element'},{name:'Añada 2019',type:'element'},
    {name:'D.O. Rioja',type:'element'}]},
   {name:'Datos obligatorios',type:'section',children:[
    {name:'Grado alcohólico 14%',type:'element'},{name:'Contenido 750 ml',type:'element'},
    {name:'Lote y trazabilidad',type:'element'},{name:'Alérgenos (sulfitos)',type:'norm'}]},
   {name:'Elementos decorativos',type:'section',children:[
    {name:'Ilustración de viñedo',type:'element'},{name:'Orla decorativa',type:'element'}]},
   {name:'Material y acabado',type:'material',children:[
    {name:'Papel texturizado 300g',type:'material'},
    {name:'Laminado mate + reserva UV',type:'finish'},
    {name:'Relieve en seco en el logo',type:'finish'}]}]},
  {name:'Contraetiqueta',type:'label',children:[
   {name:'Ingredientes / Composición',type:'element'},
   {name:'Información nutricional',type:'norm'},
   {name:'Conservación y consumo',type:'element'},
   {name:'Código de barras EAN-13',type:'element'},
   {name:'QR con ficha del producto',type:'element'},
   {name:'Datos del elaborador',type:'norm'}]},
  {name:'Cuello (cápsula)',type:'label',children:[
   {name:'Sello de garantía',type:'element'},
   {name:'Contraetiqueta de origen',type:'element'}]},
  {name:'Variantes',type:'variant',children:[
   {name:'Reserva',type:'variant'},{name:'Crianza',type:'variant'},
   {name:'Gran Reserva',type:'variant'}]}]}},

{id:'logo',name:'Diseño de Logotipo / Marca',icon:'✨',group:'🎨 Diseño Gráfico',
 desc:'Construcción de un logotipo: símbolo, tipografía, versiones y aplicaciones.',
 types:{brand:ty('Marca','✨',C.blue),symbol:ty('Símbolo','🔷',C.indigo),
  typo:ty('Tipografía','🔤',C.purple),color:ty('Color','🎨',C.orange),
  version:ty('Versión','📐',C.teal),usage:ty('Aplicación','📎',C.green),
  rule:ty('Regla','📏',C.red),format:ty('Formato','🗂️',C.gray)},
 tree:{name:'Marca — Aurora Studio',type:'brand',children:[
  {name:'Símbolo',type:'symbol',children:[
   {name:'Construcción geométrica',type:'rule'},
   {name:'Área de respeto (X)',type:'rule'},
   {name:'Tamaño mínimo 24px',type:'rule'},
   {name:'Rejilla y proporciones',type:'rule'}]},
  {name:'Tipografía',type:'typo',children:[
   {name:'Tipografía principal — Sans Serif',type:'typo'},
   {name:'Tipografía secundaria — Serif',type:'typo'},
   {name:'Kerning y tracking',type:'rule'},{name:'Peso mínimo',type:'rule'}]},
  {name:'Color',type:'color',children:[
   {name:'Color principal',type:'color'},{name:'Color secundario',type:'color'},
   {name:'Versión monocroma',type:'version'},{name:'Versión negativa',type:'version'}]},
  {name:'Versiones',type:'version',children:[
   {name:'Horizontal',type:'version'},{name:'Vertical',type:'version'},
   {name:'Solo símbolo',type:'version'},{name:'Isotipo',type:'version'},
   {name:'Logotipo',type:'version'}]},
  {name:'Aplicaciones',type:'usage',children:[
   {name:'Papelería corporativa',type:'usage'},{name:'Redes sociales',type:'usage'},
   {name:'Merchandising',type:'usage'},{name:'Firma de email',type:'usage'},
   {name:'Señalética',type:'usage'}]},
  {name:'Formatos de entrega',type:'format',children:[
   {name:'AI / Illustrator',type:'format'},{name:'SVG vectorial',type:'format'},
   {name:'PNG transparente',type:'format'},{name:'PDF para imprenta',type:'format'},
   {name:'Manual de marca (PDF)',type:'format'}]}]}},

{id:'motion',name:'Animación y Motion Graphics',icon:'🎬',group:'🎨 Diseño Gráfico',
 desc:'Planificación de una animación: guion, storyboard, keyframes y exportación.',
 types:{project:ty('Proyecto','🎬',C.blue),phase:ty('Fase','📅',C.indigo),
  scene:ty('Escena','🎞️',C.purple),keyframe:ty('Keyframe','🔑',C.orange),
  asset:ty('Asset','🧩',C.teal),audio:ty('Audio','🎵',C.green),
  render:ty('Render / Export','📤',C.red),rule:ty('Regla de animación','📏',C.gray)},
 tree:{name:'Intro animada — 15s',type:'project',children:[
  {name:'Preproducción',type:'phase',children:[
   {name:'Guion visual',type:'asset'},{name:'Storyboard (12 viñetas)',type:'asset'},
   {name:'Moodboard de referencias',type:'asset'},
   {name:'Paleta y estilo de animación',type:'rule'}]},
  {name:'Escenas',type:'scene',children:[
   {name:'Escena 1 — Logo aparece (0-4s)',type:'scene',children:[
    {name:'Fade in del símbolo',type:'keyframe'},
    {name:'Rotación suave 45° → 0°',type:'keyframe'},
    {name:'Escala 0.8 → 1.0 ease-out',type:'keyframe'},
    {name:'Quieto 1s (hold)',type:'keyframe'}]},
   {name:'Escena 2 — Tipografía (4-9s)',type:'scene',children:[
    {name:'Tracking letra a letra',type:'keyframe'},
    {name:'Masking reveal',type:'keyframe'},
    {name:'Cambio de color por keyframe',type:'keyframe'}]},
   {name:'Escena 3 — Tagline y cierre (9-15s)',type:'scene',children:[
    {name:'Línea decorativa animada',type:'keyframe'},
    {name:'Tagline fade-in',type:'keyframe'},
    {name:'Zoom out final',type:'keyframe'}]}]},
  {name:'Audio',type:'audio',children:[
   {name:'Whoosh de apertura',type:'audio'},{name:'Loop de fondo',type:'audio'},
   {name:'Swoosh de cierre',type:'audio'}]},
  {name:'Assets',type:'asset',children:[
   {name:'Logo vectorial (SVG/AI)',type:'asset'},
   {name:'Tipografía animada',type:'asset'},
   {name:'Texturas y overlays',type:'asset'}]},
  {name:'Reglas de animación',type:'rule',children:[
   {name:'Easing estándar: cubic-bezier(0.4,0,0.2,1)',type:'rule'},
   {name:'Duración mínima por transición 200ms',type:'rule'},
   {name:'FPS: 30 para web / 60 para video',type:'rule'}]},
  {name:'Render y export',type:'render',children:[
   {name:'MP4 H.264 1080p',type:'render'},{name:'WebM VP9 (web)',type:'render'},
   {name:'GIF optimizado',type:'render'},{name:'Lottie JSON (web/app)',type:'render'},
   {name:'ProRes 422 HQ (máster)',type:'render'}]}]}},

{id:'symbols',name:'Sistema de Símbolos e Iconografía',icon:'🔷',group:'🎨 Diseño Gráfico',
 desc:'Colección de iconos y símbolos con grid, grosor y familias consistentes.',
 types:{system:ty('Sistema','🔷',C.blue),family:ty('Familia','📦',C.indigo),
  icon:ty('Icono','🔹',C.purple),grid:ty('Grid','📐',C.orange),
  rule:ty('Regla','📏',C.red),format:ty('Formato','🗂️',C.gray),usage:ty('Uso','📎',C.green)},
 tree:{name:'Icon System — Aurora',type:'system',children:[
  {name:'Especificaciones base',type:'grid',children:[
   {name:'Grid de 24×24 px',type:'grid'},{name:'Área de dibujo 20×20',type:'grid'},
   {name:'Padding 2px en los bordes',type:'grid'},{name:'Grosor de trazo: 1.5px',type:'rule'},
   {name:'Esquinas redondeadas r=2px',type:'rule'},
   {name:'Estilo: outline + relleno',type:'rule'}]},
  {name:'Familias de iconos',type:'family',children:[
   {name:'Navegación',type:'family',children:[
    {name:'home',type:'icon'},{name:'search',type:'icon'},
    {name:'menu',type:'icon'},{name:'arrow-left',type:'icon'},
    {name:'chevron-down',type:'icon'}]},
   {name:'Acciones',type:'family',children:[
    {name:'add',type:'icon'},{name:'edit',type:'icon'},{name:'delete',type:'icon'},
    {name:'save',type:'icon'},{name:'share',type:'icon'},{name:'download',type:'icon'}]},
   {name:'Comunicación',type:'family',children:[
    {name:'chat',type:'icon'},{name:'mail',type:'icon'},{name:'notification',type:'icon'},
    {name:'bell',type:'icon'}]},
   {name:'Estados',type:'family',children:[
    {name:'success',type:'icon'},{name:'warning',type:'icon'},
    {name:'error',type:'icon'},{name:'info',type:'icon'}]},
   {name:'Social',type:'family',children:[
    {name:'instagram',type:'icon'},{name:'linkedin',type:'icon'},
    {name:'youtube',type:'icon'},{name:'tiktok',type:'icon'}]},
   {name:'Archivos y media',type:'family',children:[
    {name:'image',type:'icon'},{name:'video',type:'icon'},{name:'audio',type:'icon'},
    {name:'pdf',type:'icon'}]}]},
  {name:'Formatos de entrega',type:'format',children:[
   {name:'SVG optimizado',type:'format'},{name:'Font icon (woff2)',type:'format'},
   {name:'React components',type:'format'},{name:'Sprite SVG',type:'format'},
   {name:'Figma / Sketch library',type:'format'}]},
  {name:'Reglas de uso',type:'usage',children:[
   {name:'Tamaños: 16 · 20 · 24 · 32 · 48 px',type:'usage'},
   {name:'Color heredado (currentColor)',type:'usage'},
   {name:'No deformar ni rotar',type:'rule'},
   {name:'Contraste mínimo AA (4.5:1)',type:'rule'}]}]}},

{id:'typography',name:'Sistema Tipográfico / Palabras',icon:'🔤',group:'🎨 Diseño Gráfico',
 desc:'Jerarquía tipográfica, familias, escalas y usos por contexto.',
 types:{system:ty('Sistema','🔤',C.blue),family:ty('Familia','📚',C.indigo),
  size:ty('Tamaño','📏',C.purple),weight:ty('Peso','⚖️',C.orange),
  usage:ty('Uso','📎',C.teal),rule:ty('Regla','📐',C.red),pair:ty('Pareja','🎯',C.green)},
 tree:{name:'Tipografía — Proyecto Editorial',type:'system',children:[
  {name:'Familias',type:'family',children:[
   {name:'Display — Serif alta contrastada',type:'family',children:[
    {name:'Titulares principales',type:'usage'},
    {name:'Portadas y portadillas',type:'usage'},
    {name:'Uso moderado (una línea)',type:'rule'}]},
   {name:'Text — Serif legible',type:'family',children:[
    {name:'Cuerpo de texto',type:'usage'},{name:'Citas y epígrafes',type:'usage'},
    {name:'Interlineado 1.55',type:'rule'}]},
   {name:'Sans — Interfaz y datos',type:'family',children:[
    {name:'UI, tablas, formularios',type:'usage'},
    {name:'Pies de foto y notas',type:'usage'}]},
   {name:'Monoespaciada',type:'family',children:[
    {name:'Código y datos técnicos',type:'usage'}]}]},
  {name:'Jerarquía y escala',type:'size',children:[
   {name:'H1 — 48 px / 56 lh',type:'size'},{name:'H2 — 36 px / 44 lh',type:'size'},
   {name:'H3 — 28 px / 36 lh',type:'size'},{name:'H4 — 22 px / 30 lh',type:'size'},
   {name:'Body — 16 px / 26 lh',type:'size'},{name:'Small — 14 px / 22 lh',type:'size'},
   {name:'Caption — 12 px / 18 lh',type:'size'},
   {name:'Escala modular ×1.25',type:'rule'}]},
  {name:'Pesos y estilos',type:'weight',children:[
   {name:'Light 300 — Portadas grandes',type:'weight'},
   {name:'Regular 400 — Cuerpo',type:'weight'},
   {name:'Medium 500 — Énfasis',type:'weight'},
   {name:'Bold 700 — Titulares',type:'weight'},
   {name:'Black 900 — Portadas',type:'weight'},
   {name:'Italic — Citas y énfasis',type:'weight'},
   {name:'Small caps — Acrónimos',type:'weight'}]},
  {name:'Parejas tipográficas',type:'pair',children:[
   {name:'Serif Display + Sans UI',type:'pair'},
   {name:'Sans Display + Serif Body',type:'pair'},
   {name:'Serif + Serif contrastadas',type:'pair'}]},
  {name:'Reglas editoriales',type:'rule',children:[
   {name:'Longitud de línea 60-75 caracteres',type:'rule'},
   {name:'No más de 3 familias por proyecto',type:'rule'},
   {name:'Kerning óptico en titulares',type:'rule'},
   {name:'Viudas y huérfanas prohibidas',type:'rule'}]}]}},

{id:'copywriting',name:'Copywriting y Textos',icon:'✍️',group:'🎨 Diseño Gráfico',
 desc:'Estructura de mensajes: tono, jerarquía, variantes y llamadas a la acción.',
 types:{project:ty('Proyecto','✍️',C.blue),section:ty('Sección','📑',C.indigo),
  headline:ty('Titular','🎯',C.purple),body:ty('Cuerpo','📝',C.teal),
  cta:ty('CTA','🔘',C.orange),tone:ty('Tono','🎙️',C.green),
  variation:ty('Variante A/B','🔀',C.pink),rule:ty('Regla','📏',C.red)},
 tree:{name:'Copy — Landing de producto',type:'project',children:[
  {name:'Tono y voz de marca',type:'tone',children:[
   {name:'Cercano pero profesional',type:'tone'},
   {name:'Sin jerga técnica',type:'rule'},
   {name:'Frases cortas (máx 20 palabras)',type:'rule'},
   {name:'Voz activa predominante',type:'rule'}]},
  {name:'Hero principal',type:'section',children:[
   {name:'Titular — “Automatiza tu agencia en 5 minutos”',type:'headline'},
   {name:'Subtítulo — “Sin código. Sin complicaciones. Con resultados.”',type:'headline'},
   {name:'Párrafo de apertura — 2 líneas describiendo el problema',type:'body'},
   {name:'CTA primario — “Empezar gratis”',type:'cta'},
   {name:'Microcopy — “Sin tarjeta de crédito”',type:'body'}]},
  {name:'Propuesta de valor',type:'section',children:[
   {name:'Beneficio 1 — “Ahorra 12 h/semana”',type:'headline'},
   {name:'Descripción del beneficio 1',type:'body'},
   {name:'Beneficio 2 — “Escala sin contratar”',type:'headline'},
   {name:'Descripción del beneficio 2',type:'body'},
   {name:'Beneficio 3 — “Integra tus herramientas”',type:'headline'},
   {name:'Descripción del beneficio 3',type:'body'}]},
  {name:'Prueba social',type:'section',children:[
   {name:'Titular — “Más de 2.000 agencias confían en nosotros”',type:'headline'},
   {name:'Testimonio 1 — cita + nombre + cargo',type:'body'},
   {name:'Testimonio 2 — cita + nombre + cargo',type:'body'},
   {name:'Logos de clientes',type:'body'}]},
  {name:'Cierre y CTA final',type:'section',children:[
   {name:'Titular — “Empieza hoy. Cancela cuando quieras.”',type:'headline'},
   {name:'CTA principal — “Probar 14 días gratis”',type:'cta'},
   {name:'CTA secundario — “Ver demo”',type:'cta'}]},
  {name:'Variantes A/B',type:'variation',children:[
   {name:'Titular alternativo 1 — enfoque dolor',type:'variation'},
   {name:'Titular alternativo 2 — enfoque beneficio',type:'variation'},
   {name:'Titular alternativo 3 — enfoque curiosidad',type:'variation'}]}]}},

{id:'flyer',name:'Diseño de Flyer / Folleto',icon:'📄',group:'🎨 Diseño Gráfico',
 desc:'Estructura de un flyer o folleto: caras, módulos, jerarquía visual y CTA.',
 types:{project:ty('Proyecto','📄',C.blue),side:ty('Cara','📃',C.indigo),
  block:ty('Bloque','🧱',C.purple),element:ty('Elemento','🔸',C.teal),
  image:ty('Imagen','🖼️',C.orange),cta:ty('CTA','🎯',C.green),
  spec:ty('Especificación','📐',C.red)},
 tree:{name:'Flyer — Apertura local',type:'project',children:[
  {name:'Especificaciones',type:'spec',children:[
   {name:'Formato A5 (148×210 mm)',type:'spec'},
   {name:'Sangrado 3 mm',type:'spec'},
   {name:'CMYK + tintas directas',type:'spec'},
   {name:'300 dpi imágenes',type:'spec'},
   {name:'Papel estucado mate 150g',type:'spec'}]},
  {name:'Cara A — Frontal',type:'side',children:[
   {name:'Imagen principal a sangre completa',type:'image'},
   {name:'Marca / Logotipo (esq. sup. izq.)',type:'element'},
   {name:'Titular grande — “Gran apertura”',type:'block'},
   {name:'Subtítulo — fecha y hora',type:'block'},
   {name:'Ilustración o foto del producto',type:'image'},
   {name:'Sello / Badge “-20% primeros 50”',type:'element'},
   {name:'Dirección y teléfono (pie)',type:'element'}]},
  {name:'Cara B — Contenido',type:'side',children:[
   {name:'Titular de bienvenida',type:'block'},
   {name:'Párrafo descriptivo (2-3 líneas)',type:'block'},
   {name:'Listado de servicios / productos',type:'block'},
   {name:'Horarios y ubicación con mapa',type:'element'},
   {name:'Código QR a la web',type:'element'},
   {name:'Redes sociales (iconos)',type:'element'},
   {name:'CTA — “Reserva tu mesa hoy”',type:'cta'},
   {name:'Términos y condiciones legales',type:'element'}]},
  {name:'Jerarquía visual',type:'spec',children:[
   {name:'1º Titular (peso visual alto)',type:'spec'},
   {name:'2º Imagen principal',type:'spec'},
   {name:'3º CTA destacado',type:'spec'},
   {name:'4º Marca',type:'spec'},
   {name:'5º Textos secundarios',type:'spec'}]}]}},

{id:'book',name:'Diseño Editorial de Libro',icon:'📚',group:'🎨 Diseño Gráfico',
 desc:'Estructura completa de un libro: partes, capítulos y especificaciones.',
 types:{book:ty('Libro','📚',C.blue),part:ty('Parte','📖',C.indigo),
  chapter:ty('Capítulo','📄',C.purple),element:ty('Elemento','🔸',C.teal),
  page:ty('Tipo de página','📃',C.orange),spec:ty('Especificación','📐',C.red),
  asset:ty('Recurso','🖼️',C.green)},
 tree:{name:'Libro — “El Viaje Interior”',type:'book',children:[
  {name:'Especificaciones técnicas',type:'spec',children:[
   {name:'Formato 15×23 cm',type:'spec'},{name:'Mancha 12×18 cm',type:'spec'},
   {name:'Papel offset 90g interior',type:'spec'},{name:'Tapa cartoné 2,5mm',type:'spec'},
   {name:'Encuadernación cosida + tapa dura',type:'spec'},
   {name:'Serigrafía + estampación oro',type:'spec'}]},
  {name:'Preliminares',type:'part',children:[
   {name:'Portada',type:'page',children:[
    {name:'Título',type:'element'},{name:'Autor',type:'element'},
    {name:'Ilustración de cubierta',type:'asset'}]},
   {name:'Página de cortesía',type:'page'},
   {name:'Portadilla',type:'page'},
   {name:'Página de créditos y copyright',type:'page'},
   {name:'Dedicatoria',type:'page'},
   {name:'Índice',type:'page'},{name:'Prólogo',type:'page'}]},
  {name:'Cuerpo del libro',type:'part',children:[
   {name:'Parte I — El despertar',type:'part',children:[
    {name:'Capítulo 1 — El primer paso',type:'chapter',children:[
     {name:'Número de capítulo (display)',type:'element'},
     {name:'Título de capítulo',type:'element'},
     {name:'Capitular / Letra capital',type:'element'},
     {name:'Cuerpo de texto (serif 10/14)',type:'element'},
     {name:'Notas al pie',type:'element'}]},
    {name:'Capítulo 2 — Los mapas',type:'chapter'},
    {name:'Capítulo 3 — La travesía',type:'chapter'}]},
   {name:'Parte II — La transformación',type:'part',children:[
    {name:'Capítulo 4 — El silencio',type:'chapter'},
    {name:'Capítulo 5 — La revelación',type:'chapter'},
    {name:'Capítulo 6 — El regreso',type:'chapter'}]},
   {name:'Páginas especiales',type:'page',children:[
    {name:'Página par de cortesía (verso)',type:'page'},
    {name:'Página impar de inicio (recto)',type:'page'},
    {name:'Ilustración a sangre completa',type:'asset'}]}]},
  {name:'Aparato crítico',type:'part',children:[
   {name:'Epílogo',type:'page'},{name:'Agradecimientos',type:'page'},
   {name:'Notas del autor',type:'page'},{name:'Bibliografía',type:'page'},
   {name:'Índice onomástico',type:'page'},{name:'Sobre el autor',type:'page'}]},
  {name:'Recursos gráficos',type:'asset',children:[
   {name:'Ilustraciones interiores (x12)',type:'asset'},
   {name:'Ornamentos de apertura',type:'asset'},
   {name:'Floreos decorativos',type:'asset'},{name:'Guardas',type:'asset'}]}]}},

{id:'magazine',name:'Diseño de Revista',icon:'📰',group:'🎨 Diseño Gráfico',
 desc:'Maquetación de revista: secciones, retículas, portada y jerarquía editorial.',
 types:{magazine:ty('Revista','📰',C.blue),section:ty('Sección','📑',C.indigo),
  spread:ty('Doble página','📖',C.purple),article:ty('Artículo','📄',C.teal),
  layout:ty('Retícula','📐',C.orange),spec:ty('Especificación','📏',C.red),
  asset:ty('Recurso','🖼️',C.green)},
 tree:{name:'Revista “Lente” — Nº 12',type:'magazine',children:[
  {name:'Especificaciones',type:'spec',children:[
   {name:'Formato 21×28 cm (A4)',type:'spec'},
   {name:'Retícula base 12 columnas',type:'layout'},
   {name:'Calle 4mm entre columnas',type:'layout'},
   {name:'Márgenes: ext 10, int 14, sup 12, inf 16',type:'spec'},
   {name:'Papel estucado brillo 115g',type:'spec'},
   {name:'Encuadernación grapa (revista 40 págs)',type:'spec'}]},
  {name:'Portada',type:'spread',children:[
   {name:'Foto principal a sangre',type:'asset'},
   {name:'Cabecera — Logotipo Lente',type:'asset'},
   {name:'Titular de portada (3-4 palabras)',type:'article'},
   {name:'Antetítulo / Gancho corto',type:'article'},
   {name:'Numbering: Nº 12 · Mes · Año',type:'spec'},
   {name:'Códigos EAN + precio',type:'spec'}]},
  {name:'Sumario y editorial',type:'spread',children:[
   {name:'Carta del director (media columna)',type:'article'},
   {name:'Listado de contenidos con páginas',type:'article'},
   {name:'Miniaturas de los artículos destacados',type:'asset'}]},
  {name:'Secciones fijas',type:'section',children:[
   {name:'Actualidad',type:'section',children:[
    {name:'Nota breve 1 (¼ página)',type:'article'},
    {name:'Nota breve 2 (¼ página)',type:'article'},
    {name:'Infografía destacada',type:'asset'}]},
   {name:'Reportaje central',type:'section',children:[
    {name:'Apertura a doble página',type:'spread'},
    {name:'Titular + entradilla + firma',type:'article'},
    {name:'Cuerpo del texto en 3 columnas',type:'article'},
    {name:'Citas destacadas (pull quotes)',type:'article'},
    {name:'Fotografías a sangre',type:'asset'},
    {name:'Pie de foto y créditos',type:'article'}]},
   {name:'Entrevista',type:'section',children:[
    {name:'Ficha del entrevistado',type:'article'},
    {name:'Retrato a gran tamaño',type:'asset'},
    {name:'Preguntas en negrita + respuestas',type:'article'}]},
   {name:'Opinión',type:'section',children:[
    {name:'Columna semanal',type:'article'},
    {name:'Viñeta editorial',type:'asset'}]},
   {name:'Cultura y agenda',type:'section',children:[
    {name:'Reseñas (libro, cine, música)',type:'article'},
    {name:'Agenda de eventos',type:'article'},{name:'Recomendaciones',type:'article'}]},
   {name:'Última página',type:'section',children:[
    {name:'Contraportada — foto grande + texto breve',type:'spread'}]}]},
  {name:'Publicidad',type:'spread',children:[
   {name:'Página completa (contratada)',type:'spread'},
   {name:'Media página',type:'spread'},
   {name:'Robapáginas y faldones',type:'spread'}]}]}},

{id:'packaging',name:'Diseño de Packaging',icon:'📦',group:'🎨 Diseño Gráfico',
 desc:'Estructura de un envase: caras, troquel, materiales y ciclos de vida.',
 types:{project:ty('Proyecto','📦',C.blue),face:ty('Cara','🧱',C.indigo),
  element:ty('Elemento','🔸',C.purple),material:ty('Material','📄',C.teal),
  die:ty('Troquel','✂️',C.orange),cert:ty('Certificación','🏅',C.green),
  info:ty('Información obligatoria','⚖️',C.red)},
 tree:{name:'Packaging — Café de especialidad',type:'project',children:[
  {name:'Estructura',type:'die',children:[
   {name:'Bolsa stand-up pouch',type:'die'},
   {name:'Dimensiones 12×22×6 cm',type:'die'},
   {name:'Fuelle inferior con zip',type:'die'},
   {name:'Válvula desgasificadora',type:'material'}]},
  {name:'Cara frontal',type:'face',children:[
   {name:'Marca / Logotipo centrado',type:'element'},
   {name:'Nombre del origen y variedad',type:'element'},
   {name:'Nivel de tueste (icono)',type:'element'},
   {name:'Notas de cata (3-4 palabras)',type:'element'},
   {name:'Ilustración o patrón de origen',type:'element'}]},
  {name:'Cara trasera',type:'face',children:[
   {name:'Método de preparación recomendado',type:'element'},
   {name:'Ingredientes (100% arábica)',type:'info'},
   {name:'Información nutricional',type:'info'},
   {name:'País de origen y altitud',type:'info'},
   {name:'Fecha de tueste y caducidad',type:'info'},
   {name:'Código QR con trazabilidad',type:'element'},
   {name:'Redes y web',type:'element'}]},
  {name:'Información obligatoria',type:'info',children:[
   {name:'Denominación legal del producto',type:'info'},
   {name:'Contenido neto (250 g)',type:'info'},
   {name:'Razón social y domicilio',type:'info'},
   {name:'Lote y consumo preferente',type:'info'},
   {name:'Reciclaje (símbolo)',type:'info'}]},
  {name:'Materiales',type:'material',children:[
   {name:'Kraft reciclado 90g con laminado interior',type:'material'},
   {name:'Tinta al agua',type:'material'},
   {name:'Impresión flexográfica 4 tintas',type:'material'},
   {name:'Ventana PLA compostable (opcional)',type:'material'}]},
  {name:'Sostenibilidad y certificación',type:'cert',children:[
   {name:'FSC® Mix',type:'cert'},{name:'Rainforest Alliance',type:'cert'},
   {name:'Comercio Justo (Fairtrade)',type:'cert'},{name:'100% reciclable',type:'cert'}]}]}},

];