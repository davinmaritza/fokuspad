'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Briefcase,
  Users,
  MapPin,
  Building2,
  Calendar,
  ExternalLink,
  Trash2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'

export function AlumniClient({ profile: initialProfile, jobs: initialJobs, directory, isAlumni, userId }: any) {
  const [profile, setProfile] = useState(initialProfile)
  const [jobs, setJobs] = useState(initialJobs)
  
  const [activeTab, setActiveTab] = useState(isAlumni ? 'profil' : 'lowongan')
  const [search, setSearch] = useState('')

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isAddJobOpen, setIsAddJobOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [profileForm, setProfileForm] = useState({
    graduationYear: profile?.graduationYear || new Date().getFullYear(),
    status: profile?.status || 'WORKING',
    company: profile?.company || '',
    position: profile?.position || '',
    university: profile?.university || '',
    major: profile?.major || ''
  })

  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    description: '',
    link: ''
  })

  const filteredJobs = jobs.filter((j: any) => 
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.company.toLowerCase().includes(search.toLowerCase())
  )

  const filteredDirectory = directory.filter((d: any) => 
    d.user.name.toLowerCase().includes(search.toLowerCase()) || 
    d.graduationYear.toString().includes(search)
  )

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/alumni/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      })
      if (res.ok) {
        const newProfile = await res.json()
        setProfile(newProfile)
        toast.success('Profil tracer study berhasil diperbarui')
        setIsEditProfileOpen(false)
      } else {
        toast.error('Gagal memperbarui profil')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/alumni/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobForm)
      })
      if (res.ok) {
        const newJob = await res.json()
        setJobs([newJob, ...jobs])
        toast.success('Lowongan kerja berhasil ditambahkan')
        setIsAddJobOpen(false)
        setJobForm({ title: '', company: '', location: '', type: 'Full-time', description: '', link: '' })
      } else {
        toast.error('Gagal menambahkan lowongan')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Hapus lowongan ini?')) return
    try {
      const res = await fetch(`/api/alumni/jobs?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setJobs(jobs.filter((j: any) => j.id !== id))
        toast.success('Lowongan dihapus')
      } else {
        toast.error('Gagal menghapus lowongan')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'WORKING': return <Badge className="bg-emerald-500/10 text-emerald-500 border-none">Bekerja</Badge>
      case 'STUDYING': return <Badge className="bg-[#5483B3]/10 text-[#5483B3] border-none">Kuliah</Badge>
      case 'ENTREPRENEUR': return <Badge className="bg-amber-500/10 text-amber-500 border-none">Wirausaha</Badge>
      case 'SEEKING': return <Badge className="bg-red-500/10 text-red-500 border-none">Mencari Kerja</Badge>
      default: return <Badge variant="outline">Lainnya</Badge>
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <p className="text-indigo-500 font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            TRACER STUDY & ALUMNI
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Portal Alumni
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] font-medium mt-3">
            Jejaring alumni, rekam jejak karier, dan bursa lowongan kerja khusus lulusan.
          </p>
        </motion.div>
      </div>

      <div className="flex gap-4 border-b border-[var(--border)] overflow-x-auto">
        {isAlumni && (
          <button 
            onClick={() => setActiveTab('profil')}
            className={`pb-4 px-2 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'profil' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
          >
            Profil Tracer Study Saya
          </button>
        )}
        <button 
          onClick={() => setActiveTab('lowongan')}
          className={`pb-4 px-2 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'lowongan' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
        >
          Bursa Kerja (BKK)
        </button>
        <button 
          onClick={() => setActiveTab('direktori')}
          className={`pb-4 px-2 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${activeTab === 'direktori' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
        >
          Direktori Alumni
        </button>
      </div>

      {activeTab === 'profil' && isAlumni && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl">
          <Card className="rounded-2xl border-[var(--border)] shadow-sm">
            <CardHeader className="border-b border-[var(--border)] bg-[var(--muted)]/30">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-extrabold text-[var(--foreground)]">Data Tracer Study</CardTitle>
                <Button onClick={() => setIsEditProfileOpen(true)} variant="outline" className="border-[var(--border)] rounded-xl h-9 text-xs font-bold gap-2">
                  Edit Profil
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {profile ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase mb-1">Tahun Lulus</p>
                      <p className="font-semibold text-[var(--foreground)]">{profile.graduationYear}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase mb-1">Status Saat Ini</p>
                      <div>{getStatusBadge(profile.status)}</div>
                    </div>
                  </div>
                  
                  {profile.status === 'WORKING' && (
                    <div className="p-4 bg-[var(--muted)] rounded-xl space-y-2">
                      <h4 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2"><Building2 className="h-4 w-4" /> Data Pekerjaan</h4>
                      <p className="text-sm"><strong>Perusahaan:</strong> {profile.company || '-'}</p>
                      <p className="text-sm"><strong>Posisi/Jabatan:</strong> {profile.position || '-'}</p>
                    </div>
                  )}

                  {profile.status === 'STUDYING' && (
                    <div className="p-4 bg-[var(--muted)] rounded-xl space-y-2">
                      <h4 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Data Perkuliahan</h4>
                      <p className="text-sm"><strong>Universitas:</strong> {profile.university || '-'}</p>
                      <p className="text-sm"><strong>Jurusan:</strong> {profile.major || '-'}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10">
                  <GraduationCap className="h-12 w-12 text-[var(--muted-foreground)] mx-auto mb-4 opacity-50" />
                  <h3 className="font-bold text-[var(--foreground)] mb-2">Belum Ada Data Tracer Study</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mb-6">Bantu sekolah mendata perkembangan karier Anda dengan mengisi form tracer study.</p>
                  <Button onClick={() => setIsEditProfileOpen(true)} className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold">
                    Isi Tracer Study Sekarang
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeTab === 'lowongan' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative group w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <Input 
                placeholder="Cari posisi atau nama perusahaan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 rounded-xl h-11 bg-[var(--card)]"
              />
            </div>
            {!isAlumni && (
              <Button onClick={() => setIsAddJobOpen(true)} className="w-full md:w-auto h-11 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-bold text-xs gap-2 text-white">
                <Plus className="h-4 w-4" /> Pasang Lowongan
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-[var(--card)] rounded-2xl border border-[var(--border)]">
                <p className="text-[var(--muted-foreground)] font-medium">Belum ada lowongan kerja tersedia.</p>
              </div>
            ) : (
              filteredJobs.map((job: any) => (
                <Card key={job.id} className="rounded-2xl border-[var(--border)] shadow-sm hover:border-indigo-500/50 transition-colors group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/50 group-hover:bg-indigo-500 transition-colors"></div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-extrabold text-[var(--foreground)] text-lg mb-1">{job.title}</h3>
                        <p className="text-indigo-500 font-bold text-sm flex items-center gap-1"><Building2 className="h-3.5 w-3.5"/> {job.company}</p>
                      </div>
                      {!isAlumni && (
                        <button onClick={() => handleDeleteJob(job.id)} className="text-[var(--muted-foreground)] hover:text-red-500 transition-colors p-1 bg-[var(--muted)] rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-2"><MapPin className="h-3.5 w-3.5"/> {job.location}</p>
                      <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-2"><Briefcase className="h-3.5 w-3.5"/> {job.type}</p>
                      <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-2"><Calendar className="h-3.5 w-3.5"/> {new Date(job.createdAt).toLocaleDateString('id-ID')}</p>
                    </div>

                    <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 mb-6">{job.description}</p>

                    <Button className="w-full rounded-xl bg-[var(--muted)] text-[var(--foreground)] hover:bg-indigo-500 hover:text-white font-bold transition-all" asChild>
                      <a href={job.link} target="_blank" rel="noopener noreferrer">Lamar Sekarang <ExternalLink className="h-3.5 w-3.5 ml-2"/></a>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </motion.div>
      )}

      {activeTab === 'direktori' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="relative group w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <Input 
              placeholder="Cari nama alumni atau tahun lulus..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl h-11 bg-[var(--card)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDirectory.map((dir: any) => (
              <Card key={dir.id} className="rounded-2xl border-[var(--border)] shadow-sm">
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-[var(--muted)] mb-3 overflow-hidden">
                    {dir.user.image ? <img src={dir.user.image} alt={dir.user.name} className="h-full w-full object-cover" /> : <Users className="h-8 w-8 m-4 text-[var(--muted-foreground)]" />}
                  </div>
                  <h3 className="font-bold text-[var(--foreground)] text-sm">{dir.user.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] mb-2">Angkatan {dir.graduationYear}</p>
                  <div className="mt-2 scale-90">{getStatusBadge(dir.status)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Edit Profile Modal */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="bg-[var(--card)] border-[var(--border)] rounded-2xl shadow-xl max-w-lg">
          <DialogHeader>
            <DialogTitle>Update Data Tracer Study</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateProfile} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tahun Kelulusan</Label>
                <Input required type="number" min="2000" max={new Date().getFullYear()} value={profileForm.graduationYear} onChange={e => setProfileForm({...profileForm, graduationYear: Number(e.target.value)})} className="rounded-xl h-11" />
              </div>
              <div className="space-y-2">
                <Label>Status Saat Ini</Label>
                <Select value={profileForm.status} onValueChange={v => setProfileForm({...profileForm, status: v})}>
                  <SelectTrigger className="rounded-xl h-11">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WORKING">Bekerja</SelectItem>
                    <SelectItem value="STUDYING">Kuliah</SelectItem>
                    <SelectItem value="ENTREPRENEUR">Wirausaha</SelectItem>
                    <SelectItem value="SEEKING">Mencari Kerja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {profileForm.status === 'WORKING' && (
              <div className="space-y-4 p-4 border border-[var(--border)] rounded-xl bg-[var(--muted)]/30">
                <div className="space-y-2">
                  <Label>Nama Perusahaan</Label>
                  <Input value={profileForm.company} onChange={e => setProfileForm({...profileForm, company: e.target.value})} className="rounded-xl h-11 bg-[var(--card)]" placeholder="PT XYZ..." />
                </div>
                <div className="space-y-2">
                  <Label>Posisi / Jabatan</Label>
                  <Input value={profileForm.position} onChange={e => setProfileForm({...profileForm, position: e.target.value})} className="rounded-xl h-11 bg-[var(--card)]" placeholder="Staff IT..." />
                </div>
              </div>
            )}

            {profileForm.status === 'STUDYING' && (
              <div className="space-y-4 p-4 border border-[var(--border)] rounded-xl bg-[var(--muted)]/30">
                <div className="space-y-2">
                  <Label>Nama Universitas/Kampus</Label>
                  <Input value={profileForm.university} onChange={e => setProfileForm({...profileForm, university: e.target.value})} className="rounded-xl h-11 bg-[var(--card)]" placeholder="Universitas..." />
                </div>
                <div className="space-y-2">
                  <Label>Program Studi / Jurusan</Label>
                  <Input value={profileForm.major} onChange={e => setProfileForm({...profileForm, major: e.target.value})} className="rounded-xl h-11 bg-[var(--card)]" placeholder="Teknik Informatika..." />
                </div>
              </div>
            )}

            <Button disabled={isSubmitting} className="w-full h-11 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600">
              Simpan Profil
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Job Modal */}
      <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
        <DialogContent className="bg-[var(--card)] border-[var(--border)] rounded-2xl shadow-xl max-w-lg">
          <DialogHeader>
            <DialogTitle>Pasang Lowongan Pekerjaan</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddJob} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Posisi / Judul Lowongan</Label>
              <Input required value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} className="rounded-xl h-11" placeholder="Cth: Junior Web Developer" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nama Perusahaan</Label>
                <Input required value={jobForm.company} onChange={e => setJobForm({...jobForm, company: e.target.value})} className="rounded-xl h-11" />
              </div>
              <div className="space-y-2">
                <Label>Tipe Pekerjaan</Label>
                <Select value={jobForm.type} onValueChange={v => setJobForm({...jobForm, type: v})}>
                  <SelectTrigger className="rounded-xl h-11">
                    <SelectValue placeholder="Pilih..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Internship">Internship (Magang)</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Lokasi Penempatan</Label>
              <Input required value={jobForm.location} onChange={e => setJobForm({...jobForm, location: e.target.value})} className="rounded-xl h-11" placeholder="Cth: Bandung, Jawa Barat" />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi Persyaratan</Label>
              <Textarea required value={jobForm.description} onChange={e => setJobForm({...jobForm, description: e.target.value})} className="rounded-xl" rows={4} placeholder="Jelaskan kualifikasi yang dibutuhkan..." />
            </div>
            <div className="space-y-2">
              <Label>Link Pendaftaran / Email HR</Label>
              <Input required value={jobForm.link} onChange={e => setJobForm({...jobForm, link: e.target.value})} className="rounded-xl h-11" placeholder="https://..." />
            </div>
            <Button disabled={isSubmitting} className="w-full h-11 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600">
              Terbitkan Lowongan
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
