import type { CollectionConfig } from 'payload'

export const Permissions: CollectionConfig = {
  slug: 'permissions',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    // Solo  admin puede gestionar permisos
    read: ({ req: { user } }) => user?.role === 'admin',
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'relatedUser',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
    },
    // --- MÓDULO INVENTARIO ---
    {
      name: 'inventory_module',
      type: 'group',
      label: 'Permisos de Inventario',
      fields: [
        { name: 'canRead', type: 'checkbox', label: 'Ver', defaultValue: false },
        { name: 'canCreate', type: 'checkbox', label: 'Crear', defaultValue: false },
        { name: 'canUpdate', type: 'checkbox', label: 'Editar', defaultValue: false },
        { name: 'canDelete', type: 'checkbox', label: 'Borrar', defaultValue: false },
      ],
    },
    // --- MÓDULO VENTAS  ---
    {
      name: 'sales_module',
      type: 'group',
      label: 'Permisos de Ventas',
      fields: [
        { name: 'canRead', type: 'checkbox', label: 'Ver', defaultValue: false },
        { name: 'canCreate', type: 'checkbox', label: 'Crear', defaultValue: false },
        { name: 'canUpdate', type: 'checkbox', label: 'Editar', defaultValue: false },
        { name: 'canDelete', type: 'checkbox', label: 'Borrar', defaultValue: false },
      ],
    },
    // --- MÓDULO COBRANZAS  ---
    {
      name: 'collections_module', // 
      type: 'group',
      label: 'Permisos de Cobranzas',
      fields: [
        { name: 'canRead', type: 'checkbox', label: 'Ver', defaultValue: false },
        { name: 'canCreate', type: 'checkbox', label: 'Crear', defaultValue: false },
        { name: 'canUpdate', type: 'checkbox', label: 'Editar', defaultValue: false },
        { name: 'canDelete', type: 'checkbox', label: 'Borrar', defaultValue: false },
      ],
    },
  ],
}