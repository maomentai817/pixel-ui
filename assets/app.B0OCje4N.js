import{R as i}from"./chunks/theme.JH0wvEXh.js";import{L as o,a8 as u,a9 as c,aa as l,ab as f,ac as d,ad as m,ae as h,af as g,ag as A,ah as v,d as w,H as y,h as C,x as P,ai as R,aj as b,ak as j,al as x}from"./chunks/framework.C46OzmrF.js";function p(e){if(e.extends){const a=p(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=p(i),D=w({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=y();return C(()=>{P(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&R(),b(),j(),s.setup&&s.setup(),()=>x(s.Layout)}});async function E(){const e=S(),a=L();a.provide(c,e);const t=l(e.route);return a.provide(f,t),a.component("Content",d),a.component("ClientOnly",m),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:h}),{app:a,router:e,data:t}}function L(){return v(D)}function S(){let e=o,a;return g(t=>{let n=A(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),o&&(e=!1),r},s.NotFound)}o&&E().then(({app:e,router:a,data:t})=>{a.go().then(()=>{u(a.route,t.site),e.mount("#app")})});export{E as createApp};
