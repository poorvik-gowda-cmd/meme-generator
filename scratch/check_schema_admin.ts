import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkSchema() {
  const { data, error } = await supabase.from('memes').select('*').limit(1);
  if (error) {
    console.error('Error fetching schema:', error);
  } else {
    console.log('Schema sample (Service Role):', data);
    // If it's still empty, try to get column names by inserting and rolling back or just use a query that returns columns
    const { data: cols, error: colError } = await supabase.rpc('get_columns', { table_name: 'memes' }); 
    // Usually rpc needs a function, but I can try to use a query
  }
}

checkSchema();
