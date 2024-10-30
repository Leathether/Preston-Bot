"use module"

// this is to get the text from the python server. This pulls from a put request

export default async function text () {
    let home = await fetch("http://127.0.0.1:8080/api/home")
    //sconsole.log(syllabus)
    home = await home.json()
    const homeBody = home.body
    //(await syllabus).body
    return (homeBody)
}
