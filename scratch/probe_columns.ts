import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function probeColumns() {
  // Try to insert a row with a non-existent column to see if it lists valid columns
  const { data, error } = await supabase.from('memes').insert([{ non_existent_column: 'test' }]);
  console.log('Probe Error:', JSON.stringify(error, null, 2));
}

probeColumns();
