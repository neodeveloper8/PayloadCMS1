import { getPayload } from 'payload'
import config from '@payload-config'
import { getMe } from '@/lib/getMe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import InventoryClient from './InventoryClient'
import DeleteButton from './DeleteButton'

// Recibimos searchParams para leer 
export default async function InventoryPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const user = await getMe()
  if (!user) redirect('/login')

  // Leer la página de la URL (si no existe, es la 1)
  const resolvedParams = await searchParams
  const page = resolvedParams.page ? parseInt(resolvedParams.page) : 1

  const payload = await getPayload({ config })

  // 1. Permisos
  let canCreate = false
  let canDelete = false
  let canUpdate = false

  if (user.role === 'admin') {
    canCreate = true; canDelete = true; canUpdate = true
  } else {
    const permissionDocs = await payload.find({
      collection: 'permissions',
      where: { relatedUser: { equals: user.id } },
    })
    const perms = permissionDocs.docs[0]?.inventory_module
    canCreate = perms?.canCreate || false
    canDelete = perms?.canDelete || false
    canUpdate = perms?.canUpdate || false
  }

  // 2. Traer productos CON PAGINACIÓN
  let products: any[] = []
  let accessError = false
  
  
  let paginationData: {
    hasNextPage: boolean
    hasPrevPage: boolean
    nextPage: number | null | undefined
    prevPage: number | null | undefined
    totalPages: number
  } = {
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null,
    totalPages: 1
  }
  // -----------------------------------------------------------

  try {
    const result = await payload.find({
      collection: 'inventory',
      user,
      overrideAccess: false,
      page: page, 
      limit: 5,   // 5 productos por página
    })
    products = result.docs
    
    
    paginationData = {
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
      nextPage: result.nextPage,
      prevPage: result.prevPage,
      totalPages: result.totalPages
    }

  } catch (error) {
    accessError = true
  }

  if (accessError) {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl text-red-500 font-bold mb-4">🚫 Acceso Denegado</h1>
        <p>No tienes permiso para ver el módulo de inventario.</p>
        <Link href="/" className="mt-4 text-blue-400 underline">Volver al Dashboard</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">📦 Gestión de Inventario</h1>
          <Link href="/" className="text-gray-400 hover:text-white">← Volver</Link>
        </div>

        <InventoryClient canCreate={canCreate} canDelete={canDelete} />

        <div className="bg-gray-900 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2 flex justify-between">
            <span>Listado de Productos</span>
            <span className="text-sm text-gray-400 font-normal mt-1">Página {page} de {paginationData.totalPages}</span>
          </h2>
          
          {products.length === 0 && <p className="text-gray-500">No hay productos en esta página.</p>}

          <ul className="space-y-3 mb-6">
            {products.map((item: any) => (
              <li key={item.id} className="flex justify-between items-center bg-gray-800 p-3 rounded hover:bg-gray-700 transition">
                <div className="flex flex-col w-2/3">
                  <span className="font-bold text-lg text-white">{item.name}</span>
                  {item.description && <p className="text-gray-400 text-sm mt-1 mb-1 italic">{item.description}</p>}
                  <div className="text-sm text-gray-500">
                    <span className="bg-gray-700 px-2 py-0.5 rounded text-xs mr-2">SKU: {item.sku}</span>
                    <span>Stock: {item.stock}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-green-400 font-bold text-lg">${item.price}</span>
                  <div className="flex flex-col gap-2">
                    {canUpdate && (
                      <Link href={`/inventario/${item.id}`} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs text-center font-bold">
                        Editar
                      </Link>
                    )}
                    {canDelete && <DeleteButton id={item.id} />}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* CONTROLES DE PAGINACIÓN */}
          <div className="flex justify-center gap-4 border-t border-gray-800 pt-4">
            {paginationData.hasPrevPage ? (
              <Link 
                href={`/inventario?page=${paginationData.prevPage}`}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-bold"
              >
                ⬅ Anterior
              </Link>
            ) : (
              <button disabled className="bg-gray-800 text-gray-600 px-4 py-2 rounded cursor-not-allowed">⬅ Anterior</button>
            )}

            {paginationData.hasNextPage ? (
              <Link 
                href={`/inventario?page=${paginationData.nextPage}`}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-bold"
              >
                Siguiente ➡
              </Link>
            ) : (
              <button disabled className="bg-gray-800 text-gray-600 px-4 py-2 rounded cursor-not-allowed">Siguiente ➡</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}