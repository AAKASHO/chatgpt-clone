"use client";
import runChat from "@/lib/gemini";
import React, { createContext, useEffect, useState } from "react";
// import supabase from '';
import { createClient } from "@/utils/supabase/client";
import { createMessage, fetchChatHistory, fetchHistory } from "@/lib/chat";
// import { useRouter } from "next/router";


export const Context = createContext();
const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [recentPrompts, setRecentPrompts] = useState("");
  const [displayResult, setDisplayResult] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [history,setHistory]=useState([]);

  // paragraph delay
  const paragraphDelay = (index, newWord) => {
    setTimeout(() => {
      setResult((prev) => prev + newWord);
    }, 70 * index);
  };
  // on submit
  // console.log(messages);
  const submit = async (prompt) => {

    setLoading(true);
    if(result)setMessages((pre)=>[...pre,{content:result,role:"ai"}]);
    setMessages((pre)=>[...pre,{content:input,role:"user"}]);
    const message = { role:"user", parts:[{text:input}] };
    setHistory(prev => {
      const updatedHistory = [...prev, message];
      // If the length of history exceeds 10, remove the first message
      if (updatedHistory.length > 20) {
        updatedHistory.shift();
      }
      return updatedHistory;
    });
    setInput("");
    // setMessages((pre)=>[...pre,result]);
    setResult("");
    setDisplayResult(true);
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
      // console.log(searchParams);
    const chatId = searchParams.get('chat_id');
    // console.log(chatId);
    // console.log(chatId)
    const currentDate=new Date().toISOString();
    // console.log("print1")

    await createMessage('user', input,chatId,currentDate);
    setRecentPrompts(input);
    console.log("history");
    console.log(history);
    const response = input ? await runChat(input,history) : await runChat(prompt,history);
    const boldResponse = response.split("**");
    let newArray = "";
    for (let i = 0; i < boldResponse.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArray += boldResponse[i];
      } else {
        newArray += "<b>" + boldResponse[i] + "</b>";
      }
    }
    let newRes = newArray.split("*").join("</br>");
    let newRes2 = newRes.split(" ");
    const currentDatetime=new Date().toISOString();
    console.log("print2")
    await createMessage('ai', newRes,chatId,currentDatetime);

    const message1 = { role:"model", parts:[{text:newRes}] };
    setHistory(prev => {
      const updatedHistory = [...prev, message1];
      // If the length of history exceeds 10, remove the first message
      if (updatedHistory.length > 20) {
        updatedHistory.shift();
      }
      return updatedHistory;
    });

    for (let i = 0; i < newRes2.length; i++) {
      const newWord = newRes2[i];
      paragraphDelay(i, newWord + " ");
    }
    // console.log(messages);
    setLoading(false);
  };

  const fetchMessages = async () => {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
      // console.log(searchParams);
    const chatId = searchParams.get('chat_id');
    if (chatId) {
      const data=await fetchChatHistory(chatId);
      // console.log(data);
      setMessages(data);
    }
  };

  const fetchChats = async () => {
      const data=await fetchHistory();
      // console.log(data);
      setPrevPrompts(data);
  };



  // light and dark mode
  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const contextValue = {
    theme,
    toggle,
    submit,
    setInput,
    input,
    result,
    loading,
    displayResult,
    recentPrompts,
    setRecentPrompts,
    setPrevPrompts,
    prevPrompts,
    messages,
    setDisplayResult,
    setCurrentChatId,
    fetchMessages,
    fetchChats,
    setResult,
    setMessages
  };
  return (
    <Context.Provider value={contextValue}>
      <div className={theme}>{children}</div>
    </Context.Provider>
  );
};

export default ContextProvider;
