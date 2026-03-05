const fs = require('fs');
const pages = [
    'src/pages/Home.jsx',
    'src/pages/BlogDetail.jsx',
    'src/pages/admin/AdminLogin.jsx',
    'src/pages/admin/AdminDashboard.jsx',
    'src/pages/admin/ManageDresses.jsx',
    'src/pages/admin/ManageGallery.jsx',
    'src/pages/admin/ManageBlogs.jsx'
];
pages.forEach(p => {
    const name = p.split('/').pop().replace('.jsx', '');
    const content = `export default function ${name}() { return <div className="p-4 text-xl">${name}</div>; }`;
    fs.writeFileSync(p, content);
});
console.log('Scaffolded base pages');
