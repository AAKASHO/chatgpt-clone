import GeminiBody from "@/components/GeminiBody";
import Sidebar from "@/components/Sidebar";
import PrivatePage from "./private/page";
import { createClient } from "@/utils/supabase/server";
import { redirect } from 'next/navigation'


export default async function Home() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login');
  }
  return (
    <div className="flex contain">
      <Sidebar />
      <GeminiBody />
    </div>
  );
}
