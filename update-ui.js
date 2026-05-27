const fs = require('fs');

const path = 'components/dashboard/admin-users-client.tsx';
let content = fs.readFileSync(path, 'utf8');

const ALL_ROLES = `const ALL_ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "KETUA_YAYASAN", label: "Ketua Yayasan" },
  { value: "KEPALA_SEKOLAH", label: "Kepala Sekolah" },
  { value: "WAKASEK_KURIKULUM", label: "Wakasek Kurikulum" },
  { value: "WAKASEK_KESISWAAN", label: "Wakasek Kesiswaan" },
  { value: "WAKASEK_HUBIN", label: "Wakasek Hubin" },
  { value: "KAPROG", label: "Kaprog" },
  { value: "KEPALA_LAB", label: "Kepala Lab" },
  { value: "TATA_USAHA", label: "Tata Usaha" },
  { value: "BENDAHARA_YAYASAN", label: "Bendahara Yayasan" },
  { value: "BENDAHARA_SEKOLAH", label: "Bendahara Sekolah" },
  { value: "PANITIA_PPDB", label: "Panitia PPDB" },
  { value: "GURU_MAPEL", label: "Guru Mapel" },
  { value: "WALI_KELAS", label: "Wali Kelas" },
  { value: "GURU_BK", label: "Guru BK" },
  { value: "PUSTAKAWAN", label: "Pustakawan" },
  { value: "PETUGAS_UKS", label: "Petugas UKS" },
  { value: "STAF_SARPRAS", label: "Staf Sarpras" },
  { value: "SISWA", label: "Siswa" },
  { value: "ORANG_TUA", label: "Orang Tua" },
  { value: "ALUMNI", label: "Alumni" },
  { value: "STUDENT", label: "Student (Legacy)" },
  { value: "TEACHER", label: "Teacher (Legacy)" },
  { value: "ADMIN", label: "Admin (Legacy)" },
  { value: "COACH", label: "Coach (Legacy)" }
];`;

// Add ALL_ROLES to the top of the file right after imports if it doesn't exist
if (!content.includes('const ALL_ROLES = [')) {
  content = content.replace(/export function AdminUsersClient/, ALL_ROLES + '\n\nexport function AdminUsersClient');
}

// 1. Replace Filter Roles
const filterRolesRegex = /<SelectItem value="ALL">Semua Peran<\/SelectItem>\s*<SelectItem value="STUDENT">Siswa<\/SelectItem>\s*<SelectItem value="TEACHER">Guru<\/SelectItem>\s*<SelectItem value="ADMIN">Admin<\/SelectItem>/;
content = content.replace(filterRolesRegex, '<SelectItem value="ALL">Semua Peran</SelectItem>\n                          {ALL_ROLES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}');

// 2. Replace Add Form Roles
const addRolesRegex = /<SelectItem value="STUDENT">Siswa<\/SelectItem>\s*<SelectItem value="TEACHER">Guru<\/SelectItem>\s*<SelectItem value="COACH">Pelatih<\/SelectItem>\s*<SelectItem value="ADMIN">Admin<\/SelectItem>/;
content = content.replace(addRolesRegex, '{ALL_ROLES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}');

// 3. Replace Edit Form Roles
const editRolesRegex = /<SelectItem value="STUDENT">STUDENT<\/SelectItem>\s*<SelectItem value="TEACHER">TEACHER<\/SelectItem>\s*<SelectItem value="COACH">COACH<\/SelectItem>\s*<SelectItem value="ADMIN">ADMIN<\/SelectItem>/;
content = content.replace(editRolesRegex, '{ALL_ROLES.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}');

fs.writeFileSync(path, content);
console.log('Updated admin-users-client.tsx');
