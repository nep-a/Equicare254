import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import { apiClient } from './apiClient';

export function useRealtimeWorkOrders() {
  const [workOrders, setWorkOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkOrders = async () => {
    try {
      setLoading(true);
      const data = await apiClient('/work-orders');
      setWorkOrders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkOrders();

    const channel = supabase
      .channel('public:work_orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'work_orders' },
        (payload) => {
          console.log('Realtime update received!', payload);
          // Refetch to get populated fields (like asset names) or optimistically update
          fetchWorkOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { workOrders, loading, error, refetch: fetchWorkOrders };
}
