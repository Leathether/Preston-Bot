// this is to get the text from the python server. This pulls from a put request
export default await fetch("http://127.0.0.1:8080/api/text")