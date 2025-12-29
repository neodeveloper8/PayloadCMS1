import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import type { User } from '@/payload-types' 

export const getMe = async (): Promise<User | null> => {
  try {
    const payload = await getPayload({ config })
    const requestHeaders = await headers()
    
    // Lee la cookie de la petición y devuelve el usuario 
    const { user } = await payload.auth({ headers: requestHeaders })

    return user
  } catch (error) {
    return null
  }
}