# importing flask to give the flask to the user.
from flask import Flask, jsonify
from flask_cors import CORS
from embeddings import syllabusText, calenderText

# app instance
app = Flask(__name__)
CORS(app)


@app.route("/api/syllabusText", methods=["GET"])
def return_syllabusText():
    return jsonify({
        'syllabusText': syllabusText
        })

@app.route("/api/calenderText", methods=["GET"])
def return_calenderText():
    return jsonify({
        'calenderText': calenderText
        })


if __name__ == "__main__":
    app.run(debug=True, port=8080)