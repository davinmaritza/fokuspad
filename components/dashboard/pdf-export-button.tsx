"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { format } from "date-fns"
import { id as idLocale } from "date-fns/locale"

export default function PdfExportButton({ filteredBillings, formatRupiah }: { filteredBillings: any[], formatRupiah: (amount: number) => string }) {
  const exportPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text("Laporan Data SPP & Tagihan", 14, 20)
    doc.setFontSize(10)
    doc.text(`Dicetak pada: ${format(new Date(), 'dd MMMM yyyy HH:mm', { locale: idLocale })}`, 14, 28)

    const tableData = filteredBillings.map((bill, index) => [
      index + 1,
      bill.student.name,
      bill.title,
      formatRupiah(bill.amount),
      format(new Date(bill.dueDate), 'dd MMM yyyy', { locale: idLocale }),
      bill.status === 'PAID' ? 'Lunas' : bill.status === 'PENDING' ? 'Proses' : 'Belum Bayar'
    ])

    autoTable(doc, {
      startY: 35,
      head: [['No', 'Siswa', 'Tagihan', 'Nominal', 'Jatuh Tempo', 'Status']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [84, 131, 179] }
    })

    doc.save(`Laporan_SPP_${Date.now()}.pdf`)
  }

  return (
    <Button onClick={exportPDF} variant="outline" className="border-[var(--border)] gap-2">
      <Download className="w-4 h-4" /> Export PDF
    </Button>
  )
}
