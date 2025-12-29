'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  canCreate: boolean
  canDelete: boolean
}

export default function InventoryClient({ canCreate, canDelete }: Props) {
  const router = useRouter()
  // Estados del formulario
  const [name, setName] = useState('')
  const [description, setDescription] = useState('') 
  const [sku, setSku] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [loading, setLoading] = useState(false)

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canCreate) return
    setLoading(true)

    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
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
        // Limpiamos todo
        setName(''); setDescription(''); setSku(''); setPrice(''); setStock('')
        router.refresh()
      } else {
        const errorData = await res.json()
        alert(`Error: ${errorData.errors?.[0]?.message || 'Verifica los datos'}`)
      }
    } catch (error) {
      alert('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-8">
      {canCreate ? (
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            ✨ Agregar Nuevo Producto
          </h3>
          <form onSubmit={createProduct} className="flex flex-col gap-4">
            
            {/* Primera Fila */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Nombre</label>
                <input value={name} onChange={e => setName(e.target.value)} className="p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" required />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">SKU (Código único)</label>
                <input value={sku} onChange={e => setSku(e.target.value)} className="p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none" required />
              </div>
            </div>

            {/* Segunda Fila */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">Descripción</label>
              <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                className="p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 outline-none h-24 resize-none" 
              />
            </div>

            {/* Tercera Fila */}
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

            <button 
              type="submit" 
              disabled={loading}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold transition-all disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Crear Producto'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-600/50 flex items-center gap-3 text-yellow-200">
          <span className="font-medium">🔒 Modo Lectura: No tienes permisos para crear productos.</span>
        </div>
      )}
    </div>
  )
}