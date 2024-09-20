'use client'

//The system message system that will give the message JSX Elements
export default class SysMessage {
    //Defining the paramters
    //Role can be 'user' or 'system'
    role:string;
    //this is the current message to be displayed
    message:string;
    //This is a key, because class JSX needs to have keys
    key:number;
    //This is the constructor class that gets the message and the string
    //It sets each instance of the class with the data
    //this is public because the hero page will call this function
    public constructor (role:string, message:string, key:number) {
        // Used for formatting
        this.role = role;
        // The content of the message
        this.message = message;
        // This sets the key.
        this.key = key;
    };
    //This displays a message that will show on the screen depending if the 
    //Messages role is 'user' or 'system' 

    //This is public because the hero page will call this function.
    //Did not know the data types, so used any
    public displayMessage(this:any):any {
        //if the role is 'user', the styling will be different
        console.log(this.user)
        if (this.role === 'user'){
            return (
                <section className="bg-blue-900 rounded-full border-2 border-black content-center w-fit h-fit p-4 rounded-tr-none justify-self-end" key={this.key}>
                    <p className="text-white">{this.message}</p>
                </section>
            )
        }
        //if the role is 'system', the styling will be different
        else if (this.role === 'system'){
            return (
                <section className="bg-slate-200 rounded-full border-2 border-black h-fit p-4 flex content-center grow-0 w-fit rounded-tl-none" key={this.key}>
                    <p className="text-black">{this.message}</p>
                </section>
            )
        }

    }
};