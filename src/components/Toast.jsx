import React from 'react'
import { useToast } from './ToastContext'
import { HiHeart, HiCheck, HiX, HiInformationCircle } from 'react-icons/hi'

const icons = {
  success: <HiCheck className="w-5 h-5" />,
  error: <HiX className="w-5 h-5" />,
  info: <HiInformationCircle className="w-5 h-5" />,
  favorite: <HiHeart className="w-5 h-5" />,
}

const bgColors = {
  success: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
  error: 'bg-red-500/20 border-red-500/30 text-red-400',
  info: 'bg-amber-500/20 border-amber-500/30 text-amber-400',
  favorite: 'bg-rose-500/20 border-rose-500/30 text-rose-400',
}

const iconBg = {
  success: 'bg-emerald-500/30',
  error: 'bg-red-500/30',
  info: 'bg-amber-500/30',
  favorite: 'bg-rose-500/30',
}

export default function Toast() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl ${bgColors[toast.type] || bgColors.info} ${
            toast.exiting ? 'animate-toast-out' : 'animate-toast-in'
          }`}
          style={{ minWidth: '280px', maxWidth: '400px' }}
        >
          <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${iconBg[toast.type] || iconBg.info} flex items-center justify-center`}>
            {icons[toast.type] || icons.info}
          </div>
          <span className="text-sm font-medium text-white flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <HiX className="w-4 h-4 text-white/50" />
          </button>
        </div>
      ))}
    </div>
  )
}
