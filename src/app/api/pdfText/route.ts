"use module"

import { AnyNsRecord } from "dns"

// this is to get the text from the python server. This pulls from a put request

export default async function text() {
    const calender = await fetch("http://127.0.0.1:8080/api/calenderText")
    const syllabus = await fetch("http://127.0.0.1:8080/api/syllabusText")
    console.log(calender)
    return ([calender, syllabus])
}
