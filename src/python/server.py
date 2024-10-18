# importing flask to give the flask to the user.
from flask import Flask, jsonify
from flask_cors import CORS
from embeddings import embeddings, text


# app instance
app = Flask(__name__)
CORS(app)


@app.route("/api/embeddings", methods=["GET"])
def return_embeddings():
    return jsonify({
        'pretraining': embeddings
    })

@app.route("/api/text", methods=["GET"])
def return_text():
    return jsonify({
        'text': text 
    })


if __name__ == "__main__":
    app.run(debug=True, port=8080)