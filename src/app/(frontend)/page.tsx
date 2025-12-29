
import { getPayload } from 'payload'
import config from '@payload-config'
import { getMe } from '@/lib/getMe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'
export default async function Dashboard() {
  const user = await getMe()
  if (!user) redirect('/login')

  const payload = await getPayload({ config })

  // Leer permisos de módulos
  let permissions = { inventory: false, sales: false, collections: false }

  if (user.role === 'admin') {
    permissions = { inventory: true, sales: true, collections: true }
  } else {
    const permissionDocs = await payload.find({
      collection: 'permissions',
      where: { relatedUser: { equals: user.id } },
    })
    const p = permissionDocs.docs[0]
    // Verificar si tiene permiso de lectura (canRead)
    permissions.inventory = p?.inventory_module?.canRead || false
    permissions.sales = p?.sales_module?.canRead || false
    permissions.collections = p?.collections_module?.canRead || false // 
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8 text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Sistema ERP</h1>
          <p className="text-gray-400 mt-1">Panel de Control General</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Usuario conectado:</p>
          <p className="font-bold text-blue-400">{user.email} <span className="text-gray-600 text-xs uppercase">({user.role})</span></p>
          <LogoutButton />
        </div>
      </div>

      {/* Grid de Módulos */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* INVENTARIO */}
        <Link href="/inventario" className="group">
          <div className={`h-full p-6 rounded-2xl border transition-all duration-300 ${permissions.inventory ? 'bg-gray-900 border-gray-800 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20' : 'bg-gray-900/50 border-gray-800 opacity-50 cursor-not-allowed'}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                📦
              </div>
              <h2 className="text-xl font-bold">Inventario</h2>
            </div>
            <p className="text-gray-400 text-sm">Gestión de productos, stock, precios y SKUs.</p>
            <div className="mt-4 text-xs font-mono text-blue-400 group-hover:translate-x-1 transition-transform inline-block">
               {permissions.inventory ? 'Acceder →' : 'Sin acceso 🔒'}
            </div>
          </div>
        </Link>

        {/* VENTAS */}
        <Link href="/ventas" className="group">
          <div className={`h-full p-6 rounded-2xl border transition-all duration-300 ${permissions.sales ? 'bg-gray-900 border-gray-800 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20' : 'bg-gray-900/50 border-gray-800 opacity-50 cursor-not-allowed'}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
                💰
              </div>
              <h2 className="text-xl font-bold">Ventas</h2>
            </div>
            <p className="text-gray-400 text-sm">Registro de operaciones comerciales y facturación.</p>
             <div className="mt-4 text-xs font-mono text-green-400 group-hover:translate-x-1 transition-transform inline-block">
               {permissions.sales ? 'Acceder →' : 'Sin acceso 🔒'}
            </div>
          </div>
        </Link>

        {/* COBRANZAS */}
        <Link href="/cobranzas" className="group">
          <div className={`h-full p-6 rounded-2xl border transition-all duration-300 ${permissions.collections ? 'bg-gray-900 border-gray-800 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-900/20' : 'bg-gray-900/50 border-gray-800 opacity-50 cursor-not-allowed'}`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                💳
              </div>
              <h2 className="text-xl font-bold">Cobranzas</h2>
            </div>
            <p className="text-gray-400 text-sm">Seguimiento de pagos y cuentas por cobrar.</p>
             <div className="mt-4 text-xs font-mono text-purple-400 group-hover:translate-x-1 transition-transform inline-block">
               {permissions.collections ? 'Acceder →' : 'Sin acceso 🔒'}
            </div>
          </div>
        </Link>

      </div>
    </div>
  )
}