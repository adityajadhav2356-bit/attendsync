import { supabase } from '@/lib/supabase';

export type AbsenceRequest = {
  id?: number;
  name: string;
  roll: string;
  type: string;
  days: string;
  reason: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  proof_filename: string | null;
  proof_url?: string | null;
};

// Async Postgres Cloud operations
export async function getStoredRequests(): Promise<AbsenceRequest[]> {
  const { data, error } = await supabase
    .from('mock_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Supabase Error:", error.message);
    return [];
  }
  return data as AbsenceRequest[];
}

export async function addStoredRequest(req: Omit<AbsenceRequest, "id">) {
  // Truncate massively oversized base64 strings to prevent column overflow since prototype didn't wire Storage Buckets yet
  if (req.proof_url && req.proof_url.length > 500000) {
     req.proof_url = null;
     alert("Notice: File was too large for DB Text Column Prototype. Stripped raw media but request was still transmitted safely!");
  }
  
  const { error } = await supabase.from('mock_requests').insert([req]);
  if (error) console.error("Supabase Insert Error:", error.message);
}

export async function updateStoredRequest(id: number, status: 'approved' | 'rejected') {
  const { error } = await supabase.from('mock_requests').update({ status }).eq('id', id);
  if (error) console.error("Supabase Update Error:", error.message);
}
