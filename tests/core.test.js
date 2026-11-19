
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const vm = require('vm');

const context = {
  window: {},
  localStorage: {
    getItem() { return null; },
    setItem() {}
  }
};

vm.createContext(context);

const source = fs.readFileSync('src/core.js', 'utf8');
vm.runInContext(source, context);

const Core = context.window.Core;

test('Core module loads', () => {
  assert.ok(Core);
});

test('Zakat calculation', () => {
  const result = Core.zakat({
    cash: 100000,
    deductibleDebt: 20000
  });

  assert.equal(result.net, 80000);
  assert.equal(result.zakat, 2000);
});

test('Qibla bearing is valid', () => {
  const result = Core.qibla(34.6, 71.9);
  assert.ok(result >= 0 && result < 360);
});

test('Arabic search normalization', () => {
  assert.equal(Core.normalize('إِسْلَام'), 'اسلام');
});
