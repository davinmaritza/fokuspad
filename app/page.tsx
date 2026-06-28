import Link from 'next/link'
import Image from 'next/image'
import {
  GraduationCap, ArrowRight, TrendingUp, ShieldCheck, BarChart3,
  LayoutDashboard, CalendarDays, MessagesSquare, FileCheck2, Wand2, Users2,
  ClipboardCheck, MonitorPlay, BellRing, Globe2, TriangleAlert, Github, Twitter,
  Instagram, Crosshair, Building, School, BadgeCheck, Pencil
} from 'lucide-react'
import { auth } from '@/lib/auth'

import { FadeUp } from '@/components/landing/fade-up'
import { LandingNavbar } from '@/components/landing/landing-navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { DashboardMockup } from '@/components/landing/dashboard-mockup'
import { FAQSection } from '@/components/landing/faq-section'
import { Badge } from '@/components/ui/badge'

/* ─── Data ─── */
const PROBLEMS = [
  { icon: ClipboardCheck, color: 'text-red-500 bg-red-50', title: 'Administrasi masih dikerjakan manual', desc: 'Guru menghabiskan berjam-jam tiap minggu hanya untuk rekap nilai di spreadsheet dan cetak absensi — waktu yang seharusnya bisa dipakai untuk mengajar.' },
  { icon: MessagesSquare, color: 'text-orange-500 bg-orange-50', title: 'Informasi ke orang tua sering terlambat', desc: 'Pengumuman nilai atau jadwal ujian kadang baru diketahui orang tua seminggu kemudian. Di era sekarang, ini seharusnya tidak terjadi.' },
  { icon: BarChart3, color: 'text-amber-500 bg-amber-50', title: 'Tidak ada gambaran kemajuan siswa', desc: 'Tanpa data yang tersusun, guru susah tahu siapa yang butuh perhatian lebih sebelum ujian tiba. Semuanya baru ketahuan pas nilai sudah jelek.' },
  { icon: TriangleAlert, color: 'text-purple-500 bg-purple-50', title: 'Dokumen sekolah tersebar di mana-mana', desc: 'Data siswa ada di satu file, jadwal di file lain, absensi di buku fisik. Saat dibutuhkan mendadak, tidak ada yang tahu harus buka yang mana.' },
]

const FEATURES = [
  { icon: LayoutDashboard, title: 'Dashboard per Peran', desc: 'Tampilan berbeda untuk siswa, guru, orang tua, dan admin — masing-masing hanya lihat apa yang mereka butuhkan.', color: 'bg-blue-50 text-blue-600' },
  { icon: TrendingUp, title: 'Pantau Progres Real-time', desc: 'Grafik perkembangan nilai, jam belajar, dan penguasaan materi diperbarui otomatis tanpa perlu input manual.', color: 'bg-emerald-50 text-emerald-600' },
  { icon: CalendarDays, title: 'Kalender Akademik Terpusat', desc: 'Semua jadwal — kelas, ujian, ekskul, libur — ada di satu tempat. Tidak ada yang kelewatan lagi.', color: 'bg-violet-50 text-violet-600' },
  { icon: FileCheck2, title: 'Tugas & Penilaian Online', desc: 'Siswa kumpul tugas digital, guru nilai langsung di platform. Hasilnya tersimpan rapi dan bisa diunduh kapan saja.', color: 'bg-rose-50 text-rose-600' },
  { icon: BadgeCheck, title: 'Absensi Digital', desc: 'Presensi tercatat per mata pelajaran, direkap otomatis, dan langsung bisa dilihat orang tua di hari yang sama.', color: 'bg-amber-50 text-amber-600' },
  { icon: Pencil, title: 'Catatan Seperti Notion', desc: 'Editor blok untuk guru dan siswa — tulis materi, rangkuman, atau agenda kelas dengan format yang fleksibel.', color: 'bg-cyan-50 text-cyan-600' },
  { icon: MessagesSquare, title: 'Diskusi Kelas', desc: 'Ruang tanya jawab per mata pelajaran. Pertanyaan siswa bisa dibalas guru kapan saja, tidak terpotong waktu kelas.', color: 'bg-fuchsia-50 text-fuchsia-600' },
  { icon: MonitorPlay, title: 'Jadwal Video Conference', desc: 'Buat link Google Meet atau Zoom langsung dari jadwal kelas. Siswa tidak perlu cari-cari link di grup WhatsApp.', color: 'bg-indigo-50 text-indigo-600' },
  { icon: Wand2, title: 'Asisten AI Belajar', desc: 'Bantu siswa merangkum materi panjang, bikin kisi-kisi latihan soal, atau minta penjelasan ulang dengan bahasa yang lebih mudah.', color: 'bg-orange-50 text-orange-600' },
  { icon: BellRing, title: 'Notifikasi Email Otomatis', desc: 'Nilai baru masuk? Ada tugas yang belum dikumpulkan? Pengumuman sekolah? Semua langsung ke inbox orang tua dan siswa.', color: 'bg-teal-50 text-teal-600' },
  { icon: School, title: 'Portal PPDB Online', desc: 'Pendaftaran siswa baru langsung terintegrasi dengan sistem sekolah. Tidak perlu antre panjang atau isi formulir kertas.', color: 'bg-lime-50 text-lime-600' },
  { icon: Globe2, title: 'Rapor Digital', desc: 'Rapor semester bisa dibagikan ke orang tua lewat platform — aman, bisa diunduh, tidak bisa dipalsukan.', color: 'bg-sky-50 text-sky-600' },
  { icon: ShieldCheck, title: 'Ujian Online (CBT)', desc: 'Sistem ujian komprehensif dengan fitur anti-cheat (deteksi pindah tab), analitik per soal, dan nilai langsung terhubung ke orang tua.', color: 'bg-indigo-50 text-indigo-600' },
]

const HOW = [
  { step: '01', icon: Building, title: 'Sekolah daftar dan setup', desc: 'Admin atau operator sekolah daftarkan institusi, buat akun guru, dan susun data kelas sesuai struktur yang sudah ada. Biasanya selesai dalam sehari.' },
  { step: '02', icon: Users2, title: 'Guru siapkan kelasnya', desc: 'Guru masuk, buat jadwal, upload materi, dan atur sistem penilaian sesuai kurikulum. Tidak perlu training khusus — antarmukanya cukup intuitif.' },
  { step: '03', icon: GraduationCap, title: 'Siswa langsung bisa pakai', desc: 'Siswa login, lihat jadwal hari ini, kumpulkan tugas, dan pantau perkembangan nilai mereka sendiri. Orang tua bisa ikut memantau dari akun terpisah.' },
]

export default async function LandingPage() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#1E293B] selection:bg-[#5483B3]/25 font-sans antialiased overflow-x-hidden">

      <LandingNavbar hasSession={!!session} />

      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-20 pb-0 overflow-hidden">
          <HeroSection />
          <DashboardMockup />
        </section>

        {/* ── MASALAH ── */}
        <section id="masalah" className="py-28 md:py-36 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <FadeUp className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[10.5px] font-black uppercase tracking-[0.18em] text-rose-500 block mb-4">Yang sering terjadi di sekolah</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] font-serif leading-tight">
                Kenapa sekolah butuh<br />sesuatu yang lebih baik?
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-5 leading-relaxed">
                Bukan soal teknologi canggih. Tapi soal waktu yang terbuang, informasi yang tertunda, dan keputusan yang dibuat tanpa data yang cukup.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PROBLEMS.map((p, i) => (
                <FadeUp key={i} delay={i * 0.07}>
                  <div className="double-bezel h-full group">
                    <div className="double-bezel-inner p-7 bg-[#FDFCF7] transition-all duration-500 group-hover:bg-white h-full flex flex-col">
                      <div className={`h-11 w-11 rounded-xl ${p.color} flex items-center justify-center mb-5 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                        <p.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-[15px] font-bold text-[#0F172A] mb-2.5 leading-snug">{p.title}</h3>
                      <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={0.25} className="flex flex-col items-center mt-14 gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <div className="flex items-center gap-2.5 text-sm font-bold text-[#5483B3]">
                <Wand2 className="h-4 w-4" />
                Fokuspad dibuat untuk menyelesaikan ini semua
                <Wand2 className="h-4 w-4" />
              </div>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            </FadeUp>
          </div>
        </section>

        {/* ── FITUR ── */}
        <section id="fitur" className="py-28 md:py-36 bg-[#F9F9F7]">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <FadeUp className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[10.5px] font-black uppercase tracking-[0.18em] text-[#5483B3] block mb-4">Apa saja yang ada di dalamnya</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] font-serif leading-tight">
                Satu platform,<br />semua kebutuhan sekolah
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-5 leading-relaxed">
                Lebih dari 12 fitur yang dirancang bersama — bukan sekadar ditumpuk, tapi saling terhubung satu sama lain.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {FEATURES.map((f, i) => (
                <FadeUp key={i} delay={i * 0.035}>
                  <div className="double-bezel h-full group">
                    <div className="double-bezel-inner p-6 bg-white transition-all duration-500 hover:bg-slate-50/50 h-full flex flex-col">
                      <div className={`h-10 w-10 rounded-xl ${f.color} flex items-center justify-center mb-4 shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <f.icon className="h-[18px] w-[18px]" />
                      </div>
                      <h3 className="text-[13.5px] font-bold text-[#0F172A] mb-2 leading-snug">{f.title}</h3>
                      <p className="text-[11.5px] text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── PANTAU PROGRES ── */}
        <section className="py-28 md:py-36 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <FadeUp>
                <span className="text-[10.5px] font-black uppercase tracking-[0.18em] text-[#5483B3] block mb-5">Untuk guru yang peduli</span>
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] font-serif leading-tight mb-5">
                  Tahu persis siapa<br />yang perlu dibantu
                </h2>
                <p className="text-[13.5px] text-slate-500 font-medium leading-relaxed mb-8">
                  Tidak perlu lagi nunggu ujian akhir buat tahu siswa mana yang tertinggal. Fokuspad kasih gambar lengkap per kompetensi, per minggu — biar intervensi bisa dilakukan jauh lebih awal.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Crosshair, title: 'Per kompetensi, bukan cuma angka akhir', desc: 'Lihat penguasaan tiap materi secara individual, bukan sekadar rata-rata kelas yang menyembunyikan masalah.' },
                    { icon: BellRing, title: 'Peringatan dini otomatis', desc: 'Sistem kasih notifikasi saat nilai siswa turun signifikan — sebelum terlambat.' },
                    { icon: BarChart3, title: 'Laporan bisa langsung diunduh', desc: 'Rekap semester dalam format yang rapi, tidak perlu bikin ulang di Word atau Excel.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#F9F9F7] border border-slate-100 hover:border-[#5483B3]/20 transition-colors">
                      <div className="h-9 w-9 rounded-xl bg-[#5483B3]/10 flex items-center justify-center text-[#5483B3] shrink-0 mt-0.5">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-bold text-[#0F172A]">{item.title}</h4>
                        <p className="text-[11.5px] text-slate-500 font-medium mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.14}>
                <div className="double-bezel shadow-2xl shadow-slate-900/10">
                  <div className="double-bezel-inner bg-white overflow-hidden p-6 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10.5px] font-bold uppercase tracking-widest text-slate-400">Laporan Kelas</p>
                        <p className="text-[13.5px] font-bold text-slate-900 mt-0.5">XI RPL 1 — Pemrograman Web</p>
                      </div>
                      <Badge className="bg-blue-50 text-blue-700 border-none text-[10px] font-bold rounded-full px-3 py-1">Aktif</Badge>
                    </div>

                    <div className="space-y-4 pt-2">
                      {[
                        { name: 'HTML & CSS Dasar', val: 94, color: 'bg-emerald-500' },
                        { name: 'JavaScript', val: 71, color: 'bg-[#5483B3]' },
                        { name: 'React / Framework', val: 55, color: 'bg-amber-500' },
                        { name: 'Database & API', val: 38, color: 'bg-rose-400' },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-[10.5px] font-bold text-slate-700 mb-2">
                            <span>{item.name}</span>
                            <span>{item.val}%</span>
                          </div>
                          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            {/* In Server Component, we use CSS for static rendering, or we can just render the final state! Since this isn't dynamic, we can just use static width! */}
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Perlu perhatian khusus</p>
                      {[
                        { name: 'Hendri Saputra', score: 36, no: 11 },
                        { name: 'Nadia Kusuma', score: 41, no: 19 },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl mb-2 shadow-sm transition-transform hover:-translate-y-0.5 duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-rose-100 flex items-center justify-center text-rose-600 text-[11px] font-black shadow-sm">
                              {s.no}
                            </div>
                            <span className="text-[12px] font-bold text-slate-800">{s.name}</span>
                          </div>
                          <span className="text-[11px] font-black text-rose-500 bg-rose-100/50 px-2.5 py-1 rounded-md">{s.score}% ↓</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── CARA KERJA ── */}
        <section id="cara-kerja" className="py-28 md:py-36 bg-[#F9F9F7]">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <FadeUp className="text-center max-w-2xl mx-auto mb-20">
              <span className="text-[10.5px] font-black uppercase tracking-[0.18em] text-[#5483B3] block mb-4">Tidak perlu training panjang</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] font-serif leading-tight">
                3 langkah,<br />sekolah sudah jalan
              </h2>
              <p className="text-sm text-slate-500 font-medium mt-5 leading-relaxed">
                Desain yang intuitif bikin onboarding terasa ringan — bahkan bagi guru yang tidak terlalu akrab dengan teknologi.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-px bg-gradient-to-r from-[#5483B3]/15 via-[#5483B3]/40 to-[#5483B3]/15" />
              {HOW.map((item, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="text-center space-y-5 p-8">
                    <div className="relative inline-flex">
                      <div className="h-[76px] w-[76px] rounded-2xl bg-white border border-slate-100 shadow-md shadow-slate-900/5 flex items-center justify-center mx-auto">
                        <item.icon className="h-8 w-8 text-[#5483B3]" />
                      </div>
                      <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-[#5483B3] text-white text-[11px] font-black flex items-center justify-center shadow-md shadow-[#5483B3]/25">
                        {i + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[15.5px] font-bold text-[#0F172A] mb-2.5">{item.title}</h3>
                      <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA DARK ── */}
        <section className="py-20 md:py-28 bg-[#0F172A]">
          <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
            <FadeUp>
              <div className="space-y-7">
                <span className="inline-block rounded-full px-4 py-1.5 bg-[#5483B3]/20 border border-[#5483B3]/25 text-[#93C5FD] text-[11px] font-bold tracking-[0.15em] uppercase">
                  Mulai hari ini, gratis
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white font-serif leading-tight">
                  Saatnya sekolah Anda<br />beralih ke cara yang lebih baik
                </h2>
                <p className="text-sm md:text-[15px] text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
                  Tidak ada kontrak, tidak ada biaya tersembunyi. Daftar sekarang dan rasakan sendiri bedanya dalam seminggu pertama.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
                  <Link href="/register-ppdb">
                    <button className="group h-[52px] px-8 bg-[#5483B3] hover:bg-[#4272A2] text-white font-bold text-sm rounded-full shadow-lg shadow-[#5483B3]/28 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] flex items-center gap-2.5">
                      Daftar PPDB
                      <span className="h-7 w-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </Link>
                  <Link href="/login">
                    <button className="h-[52px] px-8 bg-white/8 border border-white/15 text-white font-bold text-sm rounded-full hover:bg-white/12 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]">
                      Sudah punya akun? Masuk
                    </button>
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        <FAQSection />

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0F172A] text-slate-400 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logo-cube-transparent.png"
                  alt="Fokuspad Logo"
                  width={34}
                  height={34}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-[21px] font-black tracking-tight text-white font-sans">
                  Fokus<span className="text-[#5483B3]">pad</span>
                </span>
              </div>
              <p className="text-[12px] leading-relaxed font-medium max-w-xs text-slate-500">
                Platform manajemen akademik sekolah yang menggantikan proses manual dengan sistem yang terhubung dan mudah dipakai semua pihak.
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                {[
                  { href: 'https://github.com/davinmaritza', icon: Github },
                  { href: 'https://x.com/workwithsuzirz', icon: Twitter },
                  { href: 'https://instagram.com/davinmaritza', icon: Instagram },
                  { href: 'https://davinn.net', icon: Globe2 },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="h-9 w-9 rounded-full bg-white/6 hover:bg-white/12 flex items-center justify-center text-slate-500 hover:text-white transition-all duration-200">
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-white">Platform</h5>
              <nav className="flex flex-col gap-2.5 text-[12px] font-semibold text-slate-500">
                <a href="#fitur" className="text-left hover:text-white transition-colors">Fitur Lengkap</a>
                <a href="#cara-kerja" className="text-left hover:text-white transition-colors">Cara Kerja</a>
                <Link href="/register-ppdb" className="hover:text-white transition-colors">Daftar PPDB</Link>
                <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              </nav>
            </div>

            <div className="space-y-4">
              <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-white">Kontak & Bantuan</h5>
              <nav className="flex flex-col gap-2.5 text-[12px] font-semibold text-slate-500">
                <a href="#faq" className="text-left hover:text-white transition-colors">FAQ</a>
                <a href="mailto:hello@davinn.net" className="text-left hover:text-white transition-colors">Hubungi Kami</a>
                <a href="#" className="text-left hover:text-white transition-colors">Kebijakan Privasi</a>
                <a href="#" className="text-left hover:text-white transition-colors">Ketentuan Layanan</a>
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-medium">&copy; {new Date().getFullYear()} Fokuspad by Davin Maritza. All rights reserved.</p>
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Sistem Online
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
