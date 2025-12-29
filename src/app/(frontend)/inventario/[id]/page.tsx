import { getPayload } from 'payload'
import config from '@payload-config'
import { getMe } from '@/lib/getMe'
import { redirect } from 'next/navigation'
import EditInventoryClient from './EditInventoryClient'

export default async function EditPage({ params }: { params: { id: string } }) {
  
  const { id } = await params 
  
  const user = await getMe()
  if (!user) redirect('/login')

  const payload = await getPayload({ config })

  // 1. Verificar Permiso de Edición (canUpdate)
  let canUpdate = false
  if (user.role === 'admin') {
    canUpdate = true
  } else {
    const permissionDocs = await payload.find({
      collection: 'permissions',
      where: { relatedUser: { equals: user.id } },
    })
    const perms = permissionDocs.docs[0]?.inventory_module
    canUpdate = perms?.canUpdate || false
  }

  // Si no tiene permiso, mostrar error
  if (!canUpdate) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl text-red-500 font-bold mb-4">🚫 Sin Permisos</h1>
        <p>No tienes autorización para editar productos.</p>
        <a href="/inventario" className="mt-4 text-blue-400 underline">Volver al inventario</a>
      </div>
    )
  }

  // 2. Buscar el producto por ID
  let product = null
  try {
    product = await payload.findByID({
      collection: 'inventory',
      id: id,
    })
  } catch (error) {
    return <div className="text-white p-8">Producto no encontrado.</div>
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-8 text-center text-gray-400">Modificar Inventario</h1>
      {/* Cargar el formulario cliente con los datos */}
      <EditInventoryClient product={product} />
    </div>
  )
}