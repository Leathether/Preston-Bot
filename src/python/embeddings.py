from openai import OpenAI
import pandas as pd
import os
from dotenv import load_dotenv, find_dotenv
import PyPDF2

load_dotenv(find_dotenv())
key = os.getenv("OPENAI_API_KEY")

print(key)

pdfFile = PyPDF2.PdfReader("Syllabus.pdf")

words = ""

for i in pdfFile.pages:
    words += i.extract_text()


words = words.split("\n")

text = ""

for i in words:
    text += i  + " "

print(text)

client = OpenAI(api_key=key)


embeddings = client.embeddings.create(input=[text], model='text-embedding-3-small').data[0].embedding

print(embeddings)