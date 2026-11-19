const test=require('node:test');const assert=require('node:assert/strict');
const fs=require('fs'),vm=require('vm');
const context={window:{},localStorage:{getItem(){return null},setItem(){}}};vm.createContext(context);vm.runInContext(fs.readFileSync('src/core.js','utf8'),context);
const C=context.window.Core;
test('zakat is 2.5 percent of positive net assets',()=>{const r=C.zakat({cash:100000,deductibleDebt:20000});assert.equal(r.net,80000);assert.equal(r.zakat,2000)});
test('qibla bearing is normalized',()=>{const x=C.qibla(21.4225,39.8262);assert.ok(x>=0&&x<360)});
test('Arabic search normalization',()=>{assert.equal(C.normalize('إِسْلَام'), 'اسلام')});