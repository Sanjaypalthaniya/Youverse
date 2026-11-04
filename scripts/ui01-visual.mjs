import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
process.env.PLAYWRIGHT_BROWSERS_PATH=path.resolve('.tools/browsers');
const require=createRequire(path.resolve('.tools/qa/package.json'));
const {chromium}=require('playwright');
const phase='after';
const out=`docs/qa/ui01/${phase}`;
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chromium'});
const frames=[['feed','/',1440,1000,'light'],['feed-mobile','/',390,844,'light'],['explore','/explore',1440,1000,'light'],['profile','/profile',1440,1000,'light'],['projects','/projects',1440,1000,'light'],['circle','/circles/the-creative-corner',390,844,'light'],['connect','/connect',1440,1000,'dark'],['premium','/premium',1440,1000,'light'],['messages','/messages',390,844,'dark'],['create','/create',390,844,'light'],['settings','/settings/appearance',768,1024,'dark'],['notifications','/notifications',390,844,'light'],['reels','/reels',390,844,'dark'],['welcome','/welcome',1440,1000,'light']];
frames.push(['feed-dark','/',1440,1000,'dark'],['feed-mobile-dark','/',390,844,'dark']);
const results=[];
try{
 for(const [name,route,width,height,theme] of frames){
  const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
  await context.addInitScript(t=>localStorage.setItem('youverse-theme',t),theme);
  const page=await context.newPage();const errors=[];const external=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',r=>{if(!r.url().startsWith(process.env.QA_ORIGIN||'http://localhost:3112'))external.push(r.url());});
  await page.goto((process.env.QA_ORIGIN||'http://localhost:3112')+route);
  await page.getByRole('heading',{level:1}).first().waitFor();
  await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:`${out}/${name}.png`});
  if(phase==='after') {
   const selector={feed:'.premium-post',projects:'.project-card',premium:'.pricing-grid',reels:'.immersive-reel'}[name];
   if(selector){await page.locator(selector).first().evaluate((el,offset)=>scrollTo(0,el.getBoundingClientRect().top+scrollY-offset),name==='reels'?144:100);await page.screenshot({path:`${out}/${name}-content.png`});}
  }
  results.push({name,route,width,height,theme,errors,external,font:await page.evaluate(()=>getComputedStyle(document.body).fontFamily)});
  await context.close();console.log(phase,name);
 }
 if(phase==='after') {
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage();
  await page.goto((process.env.QA_ORIGIN||'http://localhost:3112')+'/connect');
  await page.getByRole('button',{name:'Incoming',exact:true}).click();
  await page.locator('.connect-request-card').first().getByRole('button',{name:'Accept demo request'}).click();
  await page.getByRole('dialog').screenshot({path:`${out}/match-celebration.png`});
  await page.getByRole('dialog').getByRole('link',{name:'Message your match',exact:true}).click();
  await page.getByLabel('Your message').fill('A small hello. What have you been making room for lately?');
  await page.getByRole('button',{name:'Send locally'}).click();
  await page.locator('.message-bubble').waitFor();
  await page.screenshot({path:`${out}/messages-matched.png`});
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:`${out}/messages-matched-mobile.png`});
  await context.close();console.log('after matched conversation states');
 }
}finally{await browser.close();fs.writeFileSync(`${out}/frames.json`,JSON.stringify(results,null,2)+'\n');}
if(results.length!==frames.length||results.some(r=>r.errors.length||r.external.length))process.exitCode=1;
