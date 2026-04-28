import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function probe() {
  const columns = ['caption', 'text', 'url', 'image_url', 'user_id', 'uid', 'creator', 'template'];
  for (const col of columns) {
    const { error } = await supabase.from('memes').insert([{ [col]: 'test' }]);
    if (error) {
      console.log(`Probe ${col}: FAIL - ${error.message}`);
    } else {
      console.log(`Probe ${col}: SUCCESS!`);
    }
  }
}

probe();
