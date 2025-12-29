import { Access } from 'payload'

// Funcion que  verifica si el usuario tiene permiso de LECTURA en inventario
export const canReadInventory: Access = async ({ req: { user, payload } }) => {
  // 1. Si no hay usuario logueado, se deniega el acceso
  if (!user) return false

  // 2. Si es Admin, permitir TODO
  if (user.role === 'admin') return true

  // 3. Si es un usuario normal, buscar su documento en la colección 'permissions'
  try {
    const permissionDocs = await payload.find({
      collection: 'permissions',
      where: {
        relatedUser: {
          equals: user.id, 
        },
      },
      limit: 1, 
    })

    const permission = permissionDocs.docs[0]

    // 4. Denegar si no tiene documento de permisos
    if (!permission) return false

    // 5. Verificar el flag específico 'canRead' del módulo de inventario
    // Devuelve true si canRead es true, false si no
    return permission.inventory_module?.canRead || false

  } catch (error) {
    
    console.error(error)
    return false
  }
}

// Esta función verifica si el usuario tiene permiso de ESCRITURA como crear/editar/borrar

export const checkInventoryPermission = (flagName: 'canCreate' | 'canUpdate' | 'canDelete'): Access => {
  return async ({ req: { user, payload } }) => {
    if (!user) return false
    if (user.role === 'admin') return true

    try {
      const permissionDocs = await payload.find({
        collection: 'permissions',
        where: { relatedUser: { equals: user.id } },
        limit: 1,
      })
      const permission = permissionDocs.docs[0]
      if (!permission) return false

      // Aquí se accede dinámicamente al flag correspondiente
      return permission.inventory_module?.[flagName] || false
    } catch (error) {
      return false
    }
  }
}