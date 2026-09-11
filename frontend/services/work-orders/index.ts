import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'

export const getWorkOrders = cache(async () => {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('work_orders')
    .select(`
      *,
      assets ( asset_number, model_id ),
      users ( first_name, last_name )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching work orders:', error)
    return []
  }

  return data
})

export const getWorkOrderStats = cache(async () => {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('work_orders')
    .select('status')

  if (error) {
    return { total: 0, open: 0, inProgress: 0, completed: 0 }
  }

  return {
    total: data.length,
    open: data.filter(wo => wo.status === 'Open').length,
    inProgress: data.filter(wo => wo.status === 'In Progress').length,
    completed: data.filter(wo => wo.status === 'Completed').length,
  }
})
