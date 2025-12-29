'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditInventoryClient({ product }: { product: any }) {
  const router = useRouter()
  // Iniciamos el estado con los datos actuales del producto
  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description || '')
  const [sku, setSku] = useState(product.sku)
  const [price, setPrice] = useState(product.price)
  const [stock, setStock] = useState(product.stock)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Usar PATCH para actualizar solo los campos cambiados
      const res = await fetch(`/api/inventory/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          description, 
          sku, 
          price: Number(price), 
          stock: Number(stock) 
        }),
      })

      if (res.ok) {
        alert('¡Producto actualizado!')
        router.refresh() // Refresca datos del servidor
        router.push('/inventario') // Nos devuelve a la lista
      } else {
        alert('Error al actualizar.')
      }
    } catch (error) {
      alert('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-white border-b border-gray-700 pb-2">
        ✏️ Editar Producto: {product.name}
      </h2>
      
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Nombre</label>
            <input value={name} onChange={e => setName(e.target.value)} className="p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">SKU</label>
            <input value={sku} onChange={e => setSku(e.target.value)} className="p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" required />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Descripción</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none h-24 resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Precio ($)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" required />
            </div>
            <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Stock</label>
            <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" required />
            </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button 
            type="button"
            onClick={() => router.back()}
            className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-all"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="w-2/3 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  )
}