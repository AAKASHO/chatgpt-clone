"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logout(formData) {
    const supabase = createClient();
  
    // Extracting data from formData
  
    console.log("caught");
    const { error } = await supabase.auth.signOut()  
    if (error) {
      redirect('/error');
    }
  
    revalidatePath('/login', 'layout');
    redirect('/login');
  }