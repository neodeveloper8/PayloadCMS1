import type { CollectionConfig } from 'payload'
import { canReadInventory, checkInventoryPermission } from '@/access/inventoryAccess'

export const Inventory: CollectionConfig = {
  slug: 'inventory',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: canReadInventory,
    create: checkInventoryPermission('canCreate'),
    update: checkInventoryPermission('canUpdate'),
    delete: checkInventoryPermission('canDelete'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre del Producto',
    },
    {
      name: 'description', // 
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'sku',
      type: 'text',
      required: true,
      unique: true,
      label: 'Código SKU',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Precio',
    },
    {
      name: 'stock',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Stock Disponible',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media', 
      required: false,
      label: 'Foto del Producto',
    },
  ],
}