from openai import OpenAI
import pandas as pd



client = OpenAI()

text = "test"

enbeddings = client.embeddings.create(input=[text], model='text-embedding-ada-002').data[0].embedding

print(enbeddings)