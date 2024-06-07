"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Menu,
  Plus,
  CircleHelp,
  Activity,
  Settings,
  MessageSquare,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Context } from "@/context/ContextProvider";
import { redirect, useRouter } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { setDisplayResult, setInput, prevPrompts, setRecentPrompts, submit,fetchChats,setResult,setMessages } =
    useContext(Context);

    const router = useRouter();

    useEffect(()=>{
      fetchChats();
      console.log("hello sidebar");
    },[]);
  const loadPrompt = (prompt) => {
    // window.location.href=`/?chat_id=${prompt?.id}`;
    // redirect(``)
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const chatId = searchParams.get("chat_id");
    if(chatId!=prompt?.id){
      router.push(`/?chat_id=${prompt?.id}`);
      setResult(null);
      setDisplayResult(false);
    }
    
  };
  return (
    <div className="min-h-[100vh] inline-flex flex-col justify-between bg-bgSecondaryColor py-6 px-4">
      <div>
        <Menu
          size={25}
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer text-softTextColor"
        />
        <div
          className="mt-2.5 inline-flex py-2.5 items-center gap-2.5 px-4 bg-bgPrimaryColor rounded-full text-md text-gray-400 cursor-pointer"
          onClick={() => {
            setDisplayResult(false);
            setResult(null);
            setInput("");
            router.push(`/`);
            setMessages([]);
          }}
        >
          <Plus size={20} className="cursor-pointer text-softTextColor" />
          {isOpen ? <p>New chat</p> : null}
        </div>
        {isOpen ? (
          <div className="flex flex-col">
            <p className="mt-8 mb-5">Recent</p>
            <div className="overflow-y-auto max-h-[55vh] scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

            {prevPrompts?.map((item, index) => (
              <div
              key={index}
              onClick={() => loadPrompt(item)}
              className="my-2 flex items-center gap-2.5 pr-10 rounded-full text-gray-700 cursor-pointer hover:bg-slate-200 p-2 bg-bgPrimaryColor"
              >
                <MessageSquare
                  size={20}
                  className="cursor-pointer text-softTextColor"
                  />
                <p>{item?.message?.slice(0, 15)}...</p>
              </div>
            ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-5">
        <div className="pr-2.5 cursor-pointer flex gap-2 text-gray-400 items-center">
          <CircleHelp size={20} className="text-softTextColor" />
          {isOpen ? <p>Help</p> : null}
        </div>
        <div className="pr-2.5 cursor-pointer flex gap-2 text-gray-400 items-center">
          <Activity size={20} className="text-softTextColor" />
          {isOpen ? <p>Activity</p> : null}
        </div>
        <div className="pr-2.5 cursor-pointer flex gap-2 text-gray-400 items-center">
          <Settings size={20} className="text-softTextColor" />
          {isOpen ? 
          <div>
          <ThemeToggle /> 
          </div>
          : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
