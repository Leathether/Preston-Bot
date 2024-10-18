//This is where the post requests go because post requests can't be in python, and they
// Need to be in javascript
console.log("hi")
// This is for giving the next response 
import { NextRequest, NextResponse } from "next/server";
// import open ai
import OpenAI from "openai";
// This imports the embeddings
import embeddings from "../embeddings/route"
// This imports the pdf text
import pdfText from "../pdfText/route"

// this is the preprompt
const sysPrompt = `Hello, you are a a professor named Preston Frash,   Your job is to answer questions about the Linguistics course that you teach.   Use the RAG to talk about the course and what it's contents are     Do not make up an answer, and if you do not know, then tell us.     Determine and give the current date when asked about it.`

// This is the post request for Chat GPT to access the fronted server
// Exports the function to the frontend
// the req is request
export async function POST(req:any){
    // Use request.json() to parse the incoming JSON body
    const data = await req.json()
    let embeddingsJson = await embeddings.json()
    let pdfTextJson = await pdfText.json()
    console.log(pdfTextJson)
    console.log(embeddingsJson)
  
    //console.log(req)
    // Makes an istance of OPENAI
    const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
    //const results = await pdfText.toString.query({
    //    topK: 5,
    //    includeMetadata: true,
    //    vector: embeddings
    //  });
    // Sets the data to be the request json
    //console.log(body)
    console.log(process.env.OPENAI_API_KEY)
    //This is for the system messages
    //This chunks the data, so it can give that video game esk response
    const completion = await openai.chat.completions.create({
        // This gives the system prompt and any qestions after it.
        messages:[{role:'assistant', content:sysPrompt}, ...data],
        // Sets the model
        model: 'gpt-4o-mini',
        stream: true,
    })

    //This is to make the responses
    const stream = new ReadableStream({
        // This is what gives the response
        async start(controller) {
            //This intilaizes the encoding
            const encoder = new TextEncoder();
            // if there is any left to generate, it generates token by token
            try {
                // this makes it go as it completes chuncks
                for await (const chunk of completion) {
                    // this sets the content varible to the content that is in the chunck
                    const content = chunk.choices[0]?.delta?.content
                    // if there is content, then if will spit it out to the forntend
                    if (content) {
                        // this encodes the text in JSON
                        const text = encoder.encode(content)
                        // This queues the text, so there is no mess ups
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                // if there is an error, then it will display the error message
                controller.error(err)
            } finally {
                // when it is done, then it will close the chatbot speaking
                controller.close()
            }
        }
    });

    //This is to send the message from the server to the frontend
    const final = new NextResponse(stream)
    // This is to see if the message generated
    console.log(final)
    // This completes the post request and it sends it to the frontend
    return(final)
};