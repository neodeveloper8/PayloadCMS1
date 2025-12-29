import { getMe } from '@/lib/getMe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function VentasPage() {
  // --- GUARDIA DE SEGURIDAD ---
  const user = await getMe()
  if (!user) redirect('/login')
  // ----------------------------

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">💰 Módulo de Ventas</h1>
      <p className="text-gray-400">Este módulo requiere permisos específicos.</p>
      <Link href="/" className="mt-4 text-blue-400 underline">Volver al Dashboard</Link>
    </div>
  )
}