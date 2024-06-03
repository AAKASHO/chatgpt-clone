'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function signup(formData) {
    console.log(formData);
    const supabase = createClient();
  
    // Extracting data from formData
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
  
    const { error } = await supabase.auth.signUp(data);
    console.log(error);
  
    if (error) {
    //   redirect('/error');
    }
  
    // revalidatePath('/', 'layout');
    // redirect('/');
  }
  