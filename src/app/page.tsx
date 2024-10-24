
'use client'
import { JSXElementConstructor, useState } from 'react';
//Imports the SysMessage react element from the systemMessage Folder
// This is the chat bubbles TSX class
import SysMessage from './systemMessage/default';
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
  const sendMessage = async () => {
    console.log(message)
    if (!message.trim()){return}    
    // adds a new message to the stream of messages.
    setMessages((messages) => [
      //Older messages
      ...messages,
      //New user message
      {role:'user', content:message},
      //New system message
      {role: 'assistant', content:''},
    ]);
    //This POST request talks to the local server that talks with the cloud compute
    //OPENAI server that is run by open AI
    //There is a lot going on in this API call
    const response = fetch('/api/chat', {
      //Makes it a post request
      method:"POST",
      // Stores the response in a MongoDB/ JSON format
      headers: {
        "Content-Type": "application/json",
      },

      //Appends the message to the old string of messages that is the user message.
      body: JSON.stringify([...messages, { role: 'user', content: message }])
      
      
      // This happens after the user message has been sent to the server, and
      // The message from the server has been put out to the frontend.
      // res means response, but I don't know the exact type, so I put any.
    }).then(async(res:any) => {

      // Makes the input box blank
      setMessage('')
      // gets the body of the response and gets a reader to read it soon.
      const reader = res.body.getReader();
      // This is for decoding it, so it gives out messages like a video game
      const decoder = new TextDecoder();
      // Gives a starting value for the result which is the empty string.
      let result = ''
      // Uses the getReader object set as reader, and it reads it, and after that,
      // it will make a recursive function that has 2 inputs that are done, and
      // value. Done is a boolean because if it is done, then it will just rerutn the 
      // result. Value is any, because I do not know what the exact type is for that.
      // It will retrun a string because the chat is a string.
      // This is recursive because it will make it talk like a video game.
       
      //recursive function
    return reader.read().then(function processText({ done, value }: { done: boolean, value: any }): any {
      // If it is done, then it ends the recursive loop.
      if (done) {
        return result
      }
      // it decodes a value and an array that is all of the chuncks that will go one after another.
      // stream is true, so it can talk like chatboxes in videogames.
      const text = decoder.decode(value || new Uint8Array(), {stream: true})
      // sets the HTML message content
      setMessages((messages) => {
        //sets the last message that is being typed by the computer to the last message in the messages array
        let lastMessage = messages[messages.length - 1]
        //Makes a varible of messages that are not the last message
        let otherMessages = messages.slice(0, messages.length - 1)
        // returns an array of the messages to be displayed on the website
        return [
          //Messages that are not the last message come before the current typing status of system resposne
          ...otherMessages,
          //The current amount typed of the last message plus the chunck loaded
          {...lastMessage, content: lastMessage.content + text},
        ]
      })
    })

    })
  }

  return (
    //Can't comment in the divs
    <>
    <div className="h-5/6 flex flex-col bg-slate-200 rounded-xl border-4 items-center">

      <section className="w-2/3 bg-white flex z-5 rounded-3xl border-4 h-fit mt-8 flex flex-col">
        <header className="bg-emerald-400 h-20 z-10 w-full rounded-t-3xl content-center">
          <h1 className="font-mono m-4 ml-16 text-white text-3xl ">Chat</h1>
        </header>
        <section className="flex flex-col bg-inherit min-h-[55vh] m-8">
        {
          //retruns the messages
          messages.map((msg: any, idx: number):JSX.Element => {
            const bubble = new SysMessage(msg.role, msg.content, idx);
            return (bubble.displayMessage());

          })}
          </section>
        <form className="h-28 bg-emerald-400 rounded-b-3xl z-10 w-full flex items-center justify-end pr-8">
          <button className="bg-slate-700 w-[5vw] h-16 ml-8 rounded-2xl items-center justify-center mr-auto flex" type="button" onClick={sendMessage}>
            <h1 className="font-sans uppercase font-black text-2xl">
              Send
            </h1>
          </button>
          <input id="messageBar" className="bg-white rounded-full h-16 w-[56vw] pl-6 text-xl text-black" onChange={
            (event) => {
            setMessage(event.target.value)
            }} value={message} />
        </form>
      </section>
    </div>
    </>
  )
}