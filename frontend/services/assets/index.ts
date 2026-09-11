import { createClient } from '@/lib/supabase/client'

export async function fetchAssets(): Promise<any[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('assets')
    .select(`
      *,
      equipment_models (
        model_name,
        manufacturer,
        equipment_types (
          name,
          equipment_categories ( name )
        )
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching assets:', error)
    throw error
  }

  return data
}
