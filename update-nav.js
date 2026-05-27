const fs = require('fs');

function updateNav(path) {
  let content = fs.readFileSync(path, 'utf8');
  
  const newItem = `
  {
    title: 'Pustakawan',
    href: '/dashboard/pustakawan',
    icon: Library,
    roles: ['PUSTAKAWAN', 'SUPER_ADMIN']
  },
  {
    title: 'Unit Kesehatan (UKS)',
    href: '/dashboard/uks',
    icon: HeartPulse,
    roles: ['PETUGAS_UKS', 'SUPER_ADMIN']
  },
  {
    title: 'Portal Alumni',
    href: '/dashboard/alumni',
    icon: GraduationCap,
    roles: ['ALUMNI', 'WAKASEK_HUBIN', 'SUPER_ADMIN']
  },`;

  if (!content.includes('/dashboard/pustakawan')) {
     const insertPoint = 'export const menuItems = [';
     content = content.replace(insertPoint, insertPoint + newItem);
     
     if (!content.includes('Library,')) {
        content = content.replace(/from 'lucide-react'/, ', Library, HeartPulse, GraduationCap } from \'lucide-react\'');
        content = content.replace(/from "lucide-react"/, ', Library, HeartPulse, GraduationCap } from "lucide-react"');
     }
     
     fs.writeFileSync(path, content);
     console.log('Updated ' + path);
  }
}

updateNav('components/dashboard/sidebar.tsx');
updateNav('components/dashboard/mobile-nav.tsx');
