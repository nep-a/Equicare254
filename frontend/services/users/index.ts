import { createClient } from '@/lib/supabase/client'

export async function fetchUsers(): Promise<any[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      roles ( name ),
      facilities ( name ),
      departments ( name )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching users:', error)
    throw error
  }

  return data
}
