//this fetchs the python embeddings. This pulls from a put request
export default await fetch("http://127.0.0.1:8080/api/embeddings")