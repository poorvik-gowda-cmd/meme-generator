import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function probe() {
  const columns = ['title', 'name', 'prompt', 'description', 'content', 'body', 'data', 'metadata'];
  for (const col of columns) {
    const { error } = await supabase.from('memes').insert([{ [col]: 'test' }]);
    if (error && error.message.includes('Could not find')) {
      console.log(`Probe ${col}: NO`);
    } else if (error) {
       console.log(`Probe ${col}: YES (failed with ${error.message})`);
    } else {
      console.log(`Probe ${col}: SUCCESS!`);
    }
  }
}

probe();
