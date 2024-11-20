
'use client'
import { JSXElementConstructor, useState } from 'react';
//Imports the SysMessage react element from the systemMessage Folder
// This is the chat bubbles TSX class
import displayMessage from './systemMessage/default';
// Import the GPT Backend
//import SysMessage from '@/elements/systemMessage/default.tsx';
//Exports a JSX Element because this is the landing page. 
export default function Home(): JSX.Element {
  const [messages, setMessages] = useState([
    //This is for the first initial message to prompt the user.
    {
      role: 'assistant',
      content: 'Hello, my name is Professor Preston, and I will help you with your Linguistics Class'
    }
  ]);
  //This is for the latest message
  const [message, setMessage] = useState('')

  //Handles talking to the chat GPT wrapper on the backend and this 
  //basiclly handles sending all of the messages and communicating with the server.
  const sendMessage = async (event: any) => {
    event?.preventDefault();
    if (!message.trim()) return;
    
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ]);
  
    try {
      const response = await fetch('/api/chat', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }])
      });
  
      if (!response.body) {
        throw new Error("ReadableStream not supported in this browser.");
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
      let lastMessageIndex = messages.length + 1;
  
      const processText:any = async ({ done, value }: { done: boolean, value: Uint8Array }) => {
        if (done) {
          return;
        }
  
        const text = decoder.decode(value, { stream: true });
        result += text;
  
        setMessages((messages) => {
          let lastMessage = messages[lastMessageIndex];
          let otherMessages = messages.slice(0, lastMessageIndex);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
  
        return reader.read().then(processText);
      };
  
      reader.read().then(processText);
  
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setMessage('');
    }
  };
  

  return (
    //Can't comment in the divs
    <>
    <div className="h-5/6 flex flex-col bg-slate-200 rounded-xl border-4 items-center">

      <section className="w-[90vw] bg-white flex z-5 rounded-3xl border-4 h-fit mt-8 flex flex-col">
        <header className="bg-emerald-400 h-20 z-10 w-full rounded-t-3xl content-center">
          <h1 className="font-mono m-4 ml-16 text-white text-3xl ">Chat</h1>
        </header>
        <section className="flex flex-col bg-inherit min-h-[55vh] m-8">
        {
          //retruns the messages
          messages.map((msg: any, idx: number):JSX.Element => {
            return (displayMessage(msg.content, msg.role, idx));

          })}
          </section>
        <form className="h-28 bg-emerald-400 rounded-b-3xl z-10 w-full flex items-center justify-end pr-8" onSubmit={sendMessage}>
          <button className="bg-slate-700 w-[12vw] h-16 ml-8 rounded-2xl items-center justify-center mr-auto flex" type="submit" onClick={(sendMessage)}>
            <h1 className="font-sans uppercase font-black text-2xl tracking-tighter">
              Send
            </h1>
          </button>
          <input id="messageBar" className="bg-white rounded-full h-16 w-[68vw] pl-6 text-xl text-black" onChange={
            (event) => {
            setMessage(event.target.value)
            }} value={message} />
        </form>
      </section>
    </div>
    </>
  )
}