'use client'

// Chanhging this to a function based system
export default function displayMessage(message:string, role:string, idx:number ):any {
    //if the role is 'user', the styling will be different
    if (role === 'user'){
        return (
            <section className="bg-blue-900 rounded-full border-2 border-black content-center w-fit h-fit p-4 rounded-tr-none ml-auto justify-self-end mb-5" key={idx}>
                <p className="text-white">{message}</p>
            </section>
        )
    }
    //if the role is 'system', the styling will be different
    else if (role === 'assistant'){
        return (
            <section className="bg-slate-200 rounded-full border-2 border-black h-fit p-4 flex content-center w-fit rounded-tl-none mb-5" key={idx}>
                <p className="text-black">{message}</p>
            </section>
        )
    }
}