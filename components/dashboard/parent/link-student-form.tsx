'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link as LinkIcon, UserPlus, AlertCircle } from "lucide-react"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function LinkStudentForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nis: '',
    parentPin: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/parent/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast.success('Berhasil menautkan data siswa!')
        router.refresh()
      } else {
        const err = await res.text()
        toast.error(err || 'Gagal menautkan data')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan sistem')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <Card className="w-full max-w-md bg-[var(--card)] border-[var(--border)] shadow-xl rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#5483B3] to-[#3B6FA0]" />
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-[#5483B3]/10 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="h-8 w-8 text-[#5483B3]" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-[var(--foreground)]">Tautkan Data Siswa</CardTitle>
          <CardDescription className="text-sm font-medium text-[var(--muted-foreground)] mt-2">
            Silakan masukkan NIS dan PIN Orang Tua yang diberikan oleh sekolah untuk memantau perkembangan anak Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">NIS Siswa</Label>
              <Input 
                required
                placeholder="Contoh: 12345678"
                value={formData.nis}
                onChange={(e) => setFormData({...formData, nis: e.target.value})}
                className="h-12 rounded-xl bg-[var(--background)] border-[var(--border)] focus-visible:ring-[#5483B3] font-medium"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">PIN Orang Tua</Label>
              </div>
              <Input 
                required
                type="password"
                placeholder="Masukkan PIN (Default: 123456)"
                value={formData.parentPin}
                onChange={(e) => setFormData({...formData, parentPin: e.target.value})}
                className="h-12 rounded-xl bg-[var(--background)] border-[var(--border)] focus-visible:ring-[#5483B3] font-medium"
              />
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-start gap-3 mt-6">
              <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium leading-relaxed">
                Jika Anda tidak mengetahui NIS atau PIN anak Anda, silakan hubungi Wali Kelas atau Admin Sekolah.
              </p>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 mt-6 rounded-xl bg-[#5483B3] hover:bg-[#3B6FA0] text-white font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? 'Memverifikasi...' : 'Tautkan Akun'}
              {!isLoading && <LinkIcon className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
