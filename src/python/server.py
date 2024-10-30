# importing flask to give the flask to the user.
from flask import Flask, jsonify
# This is for exporting the Type Script
from flask_cors import CORS
# This is to import the text from embeddings
from embeddings import syllabusText, calenderText

# app instance
app = Flask(__name__)

# Uses CORS because I heard that there is a glitch without using it.
CORS(app)


# this is the route to give the stuff to the Typescript Server
# This uses a one way GET request
@app.route("/api/home", methods=["GET"])
def return_syllabusText():
    return jsonify({
        'body': [syllabusText, calenderText],
        })


# This uses a request

# !!!!!!!!!!!WHEN IN PROD MAKE DEBUG EQUAL FALSE!!!!!!!!!!!!!!!!!!!!!!!!
if __name__ == "__main__":
    app.run(debug=True, port=8080)