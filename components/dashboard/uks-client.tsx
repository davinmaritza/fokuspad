'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  HeartPulse, 
  Search, 
  Plus, 
  Trash2, 
  Stethoscope,
  Pill,
  Activity,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
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

export function UksClient({ inventory: initialInventory, records: initialRecords, students }: any) {
  const [inventory, setInventory] = useState(initialInventory)
  const [records, setRecords] = useState(initialRecords)
  
  const [activeTab, setActiveTab] = useState('rekam')
  const [search, setSearch] = useState('')

  const [isAddInventoryOpen, setIsAddInventoryOpen] = useState(false)
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [inventoryForm, setInventoryForm] = useState({ name: '', stock: 0, unit: 'Tablet' })
  const [recordForm, setRecordForm] = useState({ studentId: '', medicineId: 'none', complaint: '', actionTaken: '' })

  const filteredInventory = inventory.filter((i: any) => 
    i.name.toLowerCase().includes(search.toLowerCase())
  )

  const filteredRecords = records.filter((r: any) => 
    r.student.name.toLowerCase().includes(search.toLowerCase()) || 
    r.complaint.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddInventory = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/uks/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inventoryForm)
      })
      if (res.ok) {
        const newItem = await res.json()
        setInventory([...inventory, newItem].sort((a, b) => a.name.localeCompare(b.name)))
        toast.success('Obat/Alat berhasil ditambahkan')
        setIsAddInventoryOpen(false)
        setInventoryForm({ name: '', stock: 0, unit: 'Tablet' })
      } else {
        toast.error('Gagal menambahkan data')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteInventory = async (id: string) => {
    if (!confirm('Hapus item ini dari inventaris?')) return
    try {
      const res = await fetch(`/api/uks/inventory?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setInventory(inventory.filter((i: any) => i.id !== id))
        toast.success('Item dihapus')
      } else {
        toast.error('Gagal menghapus item')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    }
  }

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const payload = {
        ...recordForm,
        medicineId: recordForm.medicineId === 'none' ? null : recordForm.medicineId
      }

      const res = await fetch('/api/uks/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      if (res.ok) {
        const data = await res.json()
        setRecords([data.record, ...records])
        
        if (payload.medicineId) {
          setInventory(inventory.map((i: any) => i.id === payload.medicineId ? { ...i, stock: i.stock - 1 } : i))
        }
        
        toast.success('Rekam medis dicatat')
        setIsAddRecordOpen(false)
        setRecordForm({ studentId: '', medicineId: 'none', complaint: '', actionTaken: '' })
      } else {
        const err = await res.json()
        toast.error(err.error || 'Gagal mencatat rekam medis')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan sistem')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10 pb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <p className="text-emerald-500 font-bold uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
            <HeartPulse className="h-4 w-4" />
            MODUL KESEHATAN
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
            Dashboard UKS
          </h1>
          <p className="text-sm text-[var(--muted-foreground)] font-medium mt-3">
            Kelola rekam medis harian siswa dan inventaris obat-obatan.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[var(--card)] border-[var(--border)] rounded-2xl shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Activity className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--muted-foreground)]">Total Kasus Bulan Ini</p>
              <h3 className="text-2xl font-extrabold text-[var(--foreground)]">{records.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--card)] border-[var(--border)] rounded-2xl shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#5483B3]/10 flex items-center justify-center">
              <Pill className="h-6 w-6 text-[#5483B3]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--muted-foreground)]">Jenis Obat/Alat</p>
              <h3 className="text-2xl font-extrabold text-[var(--foreground)]">{inventory.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--card)] border-[var(--border)] rounded-2xl shadow-sm">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--muted-foreground)]">Stok Obat Menipis</p>
              <h3 className="text-2xl font-extrabold text-[var(--foreground)]">
                {inventory.filter((i: any) => i.stock < 10).length}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 border-b border-[var(--border)]">
        <button 
          onClick={() => setActiveTab('rekam')}
          className={`pb-4 px-2 text-sm font-bold transition-all border-b-2 ${activeTab === 'rekam' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
        >
          Rekam Medis
        </button>
        <button 
          onClick={() => setActiveTab('inventaris')}
          className={`pb-4 px-2 text-sm font-bold transition-all border-b-2 ${activeTab === 'inventaris' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'}`}
        >
          Inventaris Obat
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <Input 
            placeholder={`Cari ${activeTab === 'rekam' ? 'nama siswa/keluhan' : 'nama obat'}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-xl h-11 bg-[var(--card)]"
          />
        </div>
        {activeTab === 'rekam' ? (
          <Button onClick={() => setIsAddRecordOpen(true)} className="w-full md:w-auto h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold text-xs gap-2">
            <Plus className="h-4 w-4" /> Catat Kasus
          </Button>
        ) : (
          <Button onClick={() => setIsAddInventoryOpen(true)} className="w-full md:w-auto h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-bold text-xs gap-2">
            <Plus className="h-4 w-4" /> Tambah Obat
          </Button>
        )}
      </div>

      {activeTab === 'rekam' ? (
        <Card className="rounded-2xl border-[var(--border)] overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-[var(--muted)]/50">
              <TableRow>
                <TableHead className="font-bold">Tanggal</TableHead>
                <TableHead className="font-bold">Siswa</TableHead>
                <TableHead className="font-bold">Keluhan</TableHead>
                <TableHead className="font-bold">Tindakan / Obat</TableHead>
                <TableHead className="font-bold">Petugas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                 <TableRow>
                   <TableCell colSpan={5} className="text-center py-10 text-[var(--muted-foreground)] font-medium">Belum ada rekam medis</TableCell>
                 </TableRow>
              ) : (
                filteredRecords.map((record: any) => (
                  <TableRow key={record.id}>
                    <TableCell className="text-sm">{new Date(record.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</TableCell>
                    <TableCell>
                      <p className="font-bold text-[var(--foreground)] text-sm">{record.student.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{record.student.class?.name || '-'} | NIS: {record.student.nis || '-'}</p>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{record.complaint}</TableCell>
                    <TableCell>
                      <p className="text-sm">{record.actionTaken}</p>
                      {record.medicine && (
                        <Badge variant="outline" className="mt-1 bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]">
                          + {record.medicine.name}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">{record.handledBy.name}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="rounded-2xl border-[var(--border)] overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-[var(--muted)]/50">
              <TableRow>
                <TableHead className="font-bold">Nama Obat/Alat</TableHead>
                <TableHead className="font-bold">Sisa Stok</TableHead>
                <TableHead className="font-bold">Satuan</TableHead>
                <TableHead className="text-right font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length === 0 ? (
                 <TableRow>
                   <TableCell colSpan={4} className="text-center py-10 text-[var(--muted-foreground)] font-medium">Belum ada inventaris</TableCell>
                 </TableRow>
              ) : (
                filteredInventory.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-bold text-[var(--foreground)] text-sm">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={item.stock > 10 ? "bg-green-500/10 text-green-500 border-green-500/20" : item.stock > 0 ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}>
                        {item.stock}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{item.unit}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteInventory(item.id)} className="text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Add Inventory Modal */}
      <Dialog open={isAddInventoryOpen} onOpenChange={setIsAddInventoryOpen}>
        <DialogContent className="bg-[var(--card)] border-[var(--border)] rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle>Tambah Obat / Alat</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddInventory} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Nama Obat / Alat</Label>
              <Input required value={inventoryForm.name} onChange={e => setInventoryForm({...inventoryForm, name: e.target.value})} className="rounded-xl h-11" placeholder="Cth: Paracetamol 500mg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Stok Awal</Label>
                <Input required type="number" min="0" value={inventoryForm.stock} onChange={e => setInventoryForm({...inventoryForm, stock: Number(e.target.value)})} className="rounded-xl h-11" />
              </div>
              <div className="space-y-2">
                <Label>Satuan</Label>
                <Input required value={inventoryForm.unit} onChange={e => setInventoryForm({...inventoryForm, unit: e.target.value})} className="rounded-xl h-11" placeholder="Cth: Tablet, Botol, Pcs" />
              </div>
            </div>
            <Button disabled={isSubmitting} className="w-full h-11 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600">
              Simpan Item
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Record Modal */}
      <Dialog open={isAddRecordOpen} onOpenChange={setIsAddRecordOpen}>
        <DialogContent className="bg-[var(--card)] border-[var(--border)] rounded-2xl shadow-xl max-w-lg">
          <DialogHeader>
            <DialogTitle>Catat Rekam Medis</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddRecord} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Siswa Pasien</Label>
              <Select value={recordForm.studentId} onValueChange={v => setRecordForm({...recordForm, studentId: v})}>
                <SelectTrigger className="rounded-xl h-11">
                  <SelectValue placeholder="Pilih siswa..." />
                </SelectTrigger>
                <SelectContent>
                  {students.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>{s.name} ({s.class?.name || '-'})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Keluhan Sakit</Label>
              <Input required value={recordForm.complaint} onChange={e => setRecordForm({...recordForm, complaint: e.target.value})} className="rounded-xl h-11" placeholder="Cth: Pusing dan mual" />
            </div>
            <div className="space-y-2">
              <Label>Tindakan yang Diberikan</Label>
              <Textarea required value={recordForm.actionTaken} onChange={e => setRecordForm({...recordForm, actionTaken: e.target.value})} className="rounded-xl" placeholder="Cth: Disuruh istirahat 30 menit, diberi teh hangat" />
            </div>
            <div className="space-y-2">
              <Label>Obat yang Diberikan (Opsional)</Label>
              <Select value={recordForm.medicineId} onValueChange={v => setRecordForm({...recordForm, medicineId: v})}>
                <SelectTrigger className="rounded-xl h-11">
                  <SelectValue placeholder="Pilih obat..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Tidak ada obat</SelectItem>
                  {inventory.filter((i: any) => i.stock > 0).map((i: any) => (
                    <SelectItem key={i.id} value={i.id}>{i.name} (Sisa: {i.stock})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button disabled={isSubmitting || !recordForm.studentId} className="w-full h-11 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600">
              Proses Rekam Medis
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
