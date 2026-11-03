import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.tools/browsers');
const require=createRequire(path.resolve('.tools/qa/package.json'));
const playwright=require('playwright');
const engine=process.env.QA_BROWSER||'chromium';
const out=process.env.QA_OUTPUT||`.tools/w12-3/signoff/${engine}`;
const origin=process.env.QA_ORIGIN||'http://localhost:3112';
fs.mkdirSync(out,{recursive:true});
const browser=await playwright[engine].launch({headless:true,...(engine==='chromium'?{channel:'chromium'}:{})});
const results=[];
const viewports=[[320,568],[360,800],[390,844],[430,932],[768,1024],[1024,768],[1440,900]];
try {
  for(const theme of ['light','dark']) for(const [width,height] of viewports) {
    const context=await browser.newContext({viewport:{width,height},hasTouch:width<=1024,reducedMotion:'reduce',...(engine!=='firefox'&&width<=1024?{isMobile:true}:{})});
    await context.addInitScript(t=>localStorage.setItem('youverse-theme',t),theme);
    const page=await context.newPage();const runtime=[];const external=[];const fonts=[];
    page.on('pageerror',e=>runtime.push(e.message));
    page.on('console',m=>{if(m.type()==='error')runtime.push(m.text());});
    page.on('request',r=>{if(!r.url().startsWith(origin))external.push(r.url());});
    page.on('response',r=>{if(/\.(ttf|woff2?)(\?|$)/.test(r.url()))fonts.push({url:new URL(r.url()).pathname,status:r.status()});});
    await page.goto(origin);
    await page.getByRole('tab',{name:'For You',exact:true}).waitFor();
    await page.waitForFunction(t=>document.documentElement.dataset.theme===t,theme);
    await page.evaluate(()=>document.fonts.ready);
    const metrics=await page.evaluate(()=>({font:getComputedStyle(document.body).fontFamily,faces:[...document.fonts].map(f=>({family:f.family,status:f.status})),width:innerWidth,documentWidth:document.documentElement.scrollWidth,theme:document.documentElement.dataset.theme,reducedMotion:matchMedia('(prefers-reduced-motion:reduce)').matches,controlTransition:getComputedStyle(document.querySelector('.yv-button')).transitionDuration}));
    assert.equal(metrics.theme,theme);assert(metrics.documentWidth<=width+1);
    assert(metrics.faces.some(f=>f.status==='loaded'));assert(fonts.some(f=>f.status===200));
    const primaryFamily=metrics.font.split(',')[0].trim().replaceAll('"','');
    assert(primaryFamily.toLowerCase().includes('jakarta'));
    assert(metrics.faces.some(f=>f.status==='loaded'&&f.family.replaceAll('"','')===primaryFamily));
    assert(metrics.reducedMotion);
    assert(metrics.controlTransition.split(',').every(value=>value.trim()==='0s'));
    const controls=[];
    if(width<=700) {
      for(const selector of ['.mobile-menu','.bottom-nav a','.post-actions button','.post-options .icon-button','.premium-post .follow-button']) {
        const locator=page.locator(selector+':visible').first();
        const box=await locator.boundingBox();assert(box&&box.width>=44&&box.height>=44,`${engine} ${width} ${selector} has a small target: ${JSON.stringify(box)}`);
        controls.push({selector,width:box.width,height:box.height});
      }
      const search=await page.getByRole('textbox',{name:'Search YOUVERSE'}).boundingBox();assert(search.width>=150);
      const create=await page.getByRole('link',{name:'Create reflection',exact:true}).boundingBox();assert(create.width<=46,'Composer icon must not stretch across the card');
    } else if(width===1440) {
      const name=await page.locator('.suggestion>div').first().boundingBox();assert(name.width>=180,'Discovery copy is squeezed');
    }
    assert.equal(runtime.length,0);assert.equal(external.length,0);
    results.push({engine,theme,width,height,metrics,fonts,controls,runtime,external,status:'PASS'});
    await context.close();console.log('PASS design',engine,theme,width);
  }
} finally {
  await browser.close();fs.writeFileSync(`${out}/design.json`,JSON.stringify({engine,results},null,2)+'\n');
}
assert.equal(results.length,14);
