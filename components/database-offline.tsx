'use client'

import { AlertTriangle, RefreshCw, Server, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DatabaseOfflinePage() {
  return (
    <div className="min-h-screen bg-[#FDFCF7] flex items-center justify-center p-6 text-[#1E293B] font-sans">
      <div className="w-full max-w-md bg-white border border-[#E2E8F0] p-8 md:p-10 rounded-3xl shadow-xl text-center space-y-6 relative overflow-hidden">
        {/* Top visual accents */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-rose-500" />
        
        {/* Animated Icon Container */}
        <div className="relative inline-flex mx-auto">
          <div className="h-20 w-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center animate-pulse">
            <Server className="h-10 w-10" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-md">
            <WifiOff className="h-4.5 w-4.5" />
          </div>
        </div>

        {/* Heading & description */}
        <div className="space-y-3">
          <h1 className="text-2xl font-black tracking-tight text-[#0F172A] font-serif">
            Server Sedang Pemeliharaan
          </h1>
          <p className="text-xs text-[#64748B] font-semibold leading-relaxed max-w-sm mx-auto">
            Kami sedang melakukan pemeliharaan sistem atau pembaruan basis data untuk meningkatkan performa layanan. Silakan coba beberapa saat lagi.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2">
          <Button 
            onClick={() => window.location.reload()}
            className="w-full h-11 bg-[#1E293B] hover:bg-[#0F172A] text-white font-bold rounded-xl text-xs gap-2 transition-all hover:shadow-lg hover:shadow-slate-300"
          >
            <RefreshCw className="h-4 w-4" />
            Muat Ulang Halaman
          </Button>
        </div>

        {/* Footer */}
        <p className="text-[10px] text-slate-400 font-semibold">
          Status Code: 503 Service Unavailable
        </p>
      </div>
    </div>
  )
}
