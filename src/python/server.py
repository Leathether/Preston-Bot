# importing flask to give the flask to the user.
from flask import Flask, jsonify
from embeddings import embeddings


# app instance
app = Flask(__name__)

@app.route("/api/home", methods=["GET"])
def return_home():
    return jsonify({
        'pretraining': embeddings
    })


if __name__ == "__main__":
    app.run(debug=True)