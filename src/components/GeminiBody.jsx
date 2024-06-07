"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  CircleUserRound,
  Compass,
  Lightbulb,
  Youtube,
  Code,
  SendHorizontal,
} from "lucide-react";
import { Context } from "@/context/ContextProvider";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { useSearchParams } from 'next/navigation'



const GeminiBody =() => {
  const {
    submit,
    recentPrompts,
    displayResult,
    loading,
    result,
    input,
    setInput,
    messages,
    theme,
    fetchMessages,
    setPrevPrompts,
    setMessages,
    GetUser,
    user
  } = useContext(Context);

  const [ChatId,setChatId]=useState(null);

  const router = useRouter();
  const [messageSent, setMessageSent] = useState(false);
  // const [user, setUser] = useState(false);

  useEffect(()=>{
    console.log(messageSent);
    console.log(ChatId);
    if(messageSent&&ChatId){
      // fetchMessages();
      submit();
      setMessageSent(false);
    }
  },[messageSent])

  const searchParams = useSearchParams();

const search = searchParams.get('chat_id');
// console.log(search)
// console.log("search");

  useEffect(()=>{
    if(!messageSent){
      fetchMessages();
      // setMessages([]);
    }
      

  },[search]);

  useEffect(()=>{
    GetUser();
  },[])
  // console.log(user);


  const handleMessageSend = () => {
    // e.preventDefault();
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const chatId = searchParams.get("chat_id");

    if (!chatId) {
      const newChatId = uuidv4();
      router.push(`/?chat_id=${newChatId}`);
      setMessageSent(true);
      setChatId(newChatId);
      setPrevPrompts((pre)=>[{id:newChatId,message:input},...pre]);
    }
    else{
      submit();
    }
  };
  // console.log(messages);
  // console.log(loading, "loading");
  return (
    <div className="flex-1 min-w-[100vh] pb-[15vh] relative">
      <div className="flex items-center justify-between p-5 text-xl text-gray-400">
        <p>ChatGpt</p>
        <CircleUserRound size={40} className="text-softTextColor" />
      </div>
      <div className="max-w-[900px] m-auto">
        {!displayResult&&messages.length<=0 ? (

          <>
            <div className="my-12 text-5xl font-medium p-5">
              <p>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Hello, {user?.user_metadata?.name||"Aakash Kumar Prasad"}
                </span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="grid grid-cols-4 gap-5 p-5">
              <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={()=>{setInput("Suggest beautiful places to see on an upcoming road trip")}}>
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <Compass
                  size={35}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"
                />
              </div>
              <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={()=>{setInput("What’s the reaction to and impact of autonomous vehicles")}}>
                <p>What’s the reaction to and impact of autonomous vehicles</p>
                <Lightbulb
                  size={35}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"
                />
              </div>
              <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={()=>{setInput("Come up with a recipe for an upcoming event")}}>
                <p>Come up with a recipe for an upcoming event</p>
                <Youtube
                  size={35}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"
                />
              </div>
              <div className="h-48 p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer" onClick={()=>{setInput("Evaluate and rank common camera categories")}}>
                <p>Evaluate and rank common camera categories</p>
                <Code
                  size={35}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="overflow-y-auto max-h-[73vh] scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div>
              {messages.map((message, index) => (
                <div key={index} className="my-10 flex items-center gap-5">
              {message.role==="user"?
              <div className="flex items-start gap-5">
                <div className="flex items-center justify-center w-10 h-10  ">
              <CircleUserRound size={40} className="text-softTextColor" />
              {/* <p dangerouslySetInnerHTML={{ __html:  message.content}}></p> */}
            </div>
                <p
                className="text-md font-normal loading-6 text-gray-400"
                dangerouslySetInnerHTML={{ __html: message.content }}
                ></p>
                </div>
            :
            <div className="flex items-start gap-5">
             {theme=="dark"?
            <img src="/chatgptlogobs.png" alt="" />:
            <img src="/chatgptlogows.png" alt="" />}
            <p
                className={`text-md font-normal loading-6 ${theme === "dark" ? "text-gray-400" : "text-black"}`}
                dangerouslySetInnerHTML={{ __html: message.content }}
              ></p> 
            </div>                 
              }
                </div>

              ))}
            </div>

            {/* <div className="my-10 flex items-center gap-5">
              <CircleUserRound size={40} className="text-softTextColor" />
              <p>{recentPrompts}</p>
            </div> */}
            {displayResult&&<div className="flex items-start gap-5">
              {
                 theme=="dark"?
                 <img src="/chatgptlogobs.png" alt="" />:
                 <img src="/chatgptlogows.png" alt="" />   
              }

              <p
                className={`text-md font-normal loading-6 ${theme === "dark" ? "text-gray-400" : "text-black"}`}
                dangerouslySetInnerHTML={{ __html: result }}
              ></p>
            </div>}
          </div>
        )}
        <div className="absolute bottom-0 w-full max-w-[900px] px-5 m-auto">
          <form action={handleMessageSend}>
            <div className="flex items-center justify-between gap-5 bg-bgSecondaryColor py-2.5 px-5 rounded-full">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className={`flex-1 bg-transparent border-none outline-none p-2 text-md ${theme === "dark" ? "text-gray-400" : "text-black"}`}
                placeholder="Enter a prompt here"
              />
              <div className="flex cursor-pointer">
                <SendHorizontal type="submit" size={20} />
              </div>
            </div>
          </form>
          <p className="text-gray-400 text-sm text-center p-3">
            ChatGpt may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Chatgpt Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeminiBody;
