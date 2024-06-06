import { createClient } from '@/utils/supabase/client';
import axios from 'axios';

export const createMessage = async (role, content, chatId,time) => {
    const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

    const { data: chatData, error: chatError } = await supabase
    .from('chats')
    .select('id')
    .eq('id', chatId)
    .single();
    // consoe

    console.log("chatData");
    console.log(chatData);
    console.log(chatError);

    const currentDate=new Date().toISOString();
    console.log(currentDate);

    if (!chatData && chatError?.code === 'PGRST116') {
      // If chatId does not exist, create a new chat entry
      const { data: newChatData, error: newChatError } = await supabase
        .from('chats')
        .insert([{ id: chatId, user_id: user?.id,message:content}]);
        
  
      if (newChatError) {
        throw new Error(newChatError.message);
      }
    }
    const { data, error } = await supabase
    .from('messages')
    .insert([{ role, content, chat_id: chatId, user_id: user?.id,created_at: time}]);

    console.log("called3");
  // if (error) {
  //   throw new Error(error.message);
  // }

  return content;
};

export const retname=async()=>{
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user);
  return user;
}

export const fetchChatHistory = async (chatId) => {
    const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('user_id', user.id)
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
export const fetchHistory = async () => {
    const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
