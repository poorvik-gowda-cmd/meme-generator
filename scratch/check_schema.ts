import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { supabase } from '../lib/supabase';

async function checkSchema() {
  const { data, error } = await supabase.from('memes').select('*').limit(1);
  if (error) {
    console.error('Error fetching schema:', error);
  } else {
    console.log('Schema sample:', data);
  }
}

checkSchema();
