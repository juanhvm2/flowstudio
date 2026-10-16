/* =========================================================
   ARCHIVO: data.js
   CONTENIDO: Constantes y datos compartidos de la aplicación,
              incluidos colores y definiciones auxiliares.
   DEPENDENCIAS: ninguna
   ========================================================= */
export const C={blue:'#0a84ff',indigo:'#5e5ce6',purple:'#bf5af2',pink:'#ff375f',red:'#ff453a',
  orange:'#ff9f0a',yellow:'#ffd60a',green:'#30d158',mint:'#00c7be',teal:'#64d2ff',
  gray:'#8e8e93',brown:'#ac8e68',cyan:'#32ade6',gold:'#ffcc00',rose:'#ff2d55'};

export function ty(label, icon, color) { return {label, icon, color}; }

export const EMOJIS=['📁','📂','📄','📝','📋','📊','📈','🗂️','🗃️','🗄️','🗔','🖼️','🎨','🎬','🎞️','🎵','🎤','🎧','🎸','🎹',
  '⚙️','🔧','🔨','🔌','💡','⚡','🔥','💧','🌊','🌍','🌟','⭐','❤️','🚀','🎯','🏆','🥇','🎪','🎉','🎁',
  '👤','👥','🤝','💼','💰','💵','🏷️','🔑','🔐','✅','❌','⚠️','💬','📡','📞','📱','💻','🖥️','⚛️',
  '🧠','🤖','🎓','📚','📖','🍽️','🍳','🍷','🍲','🏨','🏠','✈️','🚚','🚌','🏟️','🎭','⚽','⚖️','🔬','🏥'];

export const DEV={
  phone:{w:390,h:844,cls:'phone'},
  tablet:{w:820,h:1080,cls:'tablet'},
  desktop:{w:1280,h:800,cls:'desktop'}
};
