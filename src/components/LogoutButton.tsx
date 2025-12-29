'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // 1. Petición silenciosa a la API para matar la sesión
      await fetch('/api/users/logout', { method: 'POST' })
      
      // 2. Refrescar
      router.refresh()
      
      // 3. Redirigir al login
      router.push('/login')
    } catch (error) {
      console.error('Error cerrando sesión:', error)
    }
  }

  return (
    <button 
      onClick={handleLogout} 
      className="text-xs text-red-400 hover:text-red-300 underline mt-2 transition-colors"
    >
      Cerrar Sesión
    </button>
  )
}