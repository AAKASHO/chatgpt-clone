// node --version # Should be >= 18
// npm install @google/generative-ai

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
// import { useState } from "react";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
console.log(API_KEY);

// let hist=[];
async function runChat(prompt,hist) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },

    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  console.log("hist")
  console.log(hist);
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: hist,
  });
  
  const model1 = genAI.getGenerativeModel({ model: "embedding-001"});

  // const text = "The quick brown fox jumps over the lazy dog."

  const result1 = await model1.embedContent(prompt);
  const embedding = result1.embedding;
  console.log(embedding.values);
  const result2 = await chat.sendMessageStream(prompt);
  const result = await chat.sendMessage(prompt);
  let text = '';
  for await (const chunk of result2.stream) {
    const chunkText = chunk.text();
    console.log("chunkText");
    console.log(chunkText);
    text += chunkText;
    console.log("text");
    console.log(text);
  }
  const response = result.response;
  return response.text();
}

export default runChat;
