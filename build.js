const fs=require('fs'),path=require('path');
const root=process.cwd(), out=path.join(root,'www');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const f of ['index.html','style.css','manifest.webmanifest']) if(fs.existsSync(path.join(root,f))) fs.copyFileSync(path.join(root,f),path.join(out,f));
for(const d of ['src','assets']) if(fs.existsSync(path.join(root,d))) fs.cpSync(path.join(root,d),path.join(out,d),{recursive:true});
console.log('Web app copied to www');