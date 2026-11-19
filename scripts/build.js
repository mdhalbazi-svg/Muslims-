
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const out = path.join(root, 'www');

fs.rmSync(out, {
  recursive: true,
  force: true
});

fs.mkdirSync(out, {
  recursive: true
});

const files = [
  'index.html',
  'style.css',
  'manifest.webmanifest'
];

for (const file of files) {
  const source = path.join(root, file);

  if (!fs.existsSync(source)) {
    throw new Error('Missing required file: ' + file);
  }

  fs.copyFileSync(
    source,
    path.join(out, file)
  );
}

for (const folder of ['src', 'assets']) {
  const source = path.join(root, folder);

  if (fs.existsSync(source)) {
    fs.cpSync(
      source,
      path.join(out, folder),
      { recursive: true }
    );
  }
}

console.log('Islamic Life web app built successfully.');
