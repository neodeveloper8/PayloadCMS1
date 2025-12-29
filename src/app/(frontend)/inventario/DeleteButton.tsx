'use client'
import { useRouter } from 'next/navigation'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('¿Seguro que quieres borrar este ítem?')) return
    try {
      await fetch(`/api/inventory/${id}`, { method: 'DELETE' })
      router.refresh()
    } catch (e) {
      alert('Error')
    }
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-400 font-bold ml-4">
      [Borrar]
    </button>
  )
}