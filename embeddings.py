from openai import OpenAI
import pandas as pd
import os

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())
key = os.getenv("OPENAI_API_KEY")

print(key)

client = OpenAI(api_key=key)

text = "test"

enbeddings = client.embeddings.create(input=[text], model='text-embedding-ada-002').data[0].embedding

print(enbeddings)