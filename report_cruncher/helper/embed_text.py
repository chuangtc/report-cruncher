# import redis
import openai

# redis_client = redis.Redis(host='localhost', port=6379, db=0)
from report_cruncher.constants import OPENAI_API_KEY

def execute(prompt):
    # Call OpenAI API
    openai.api_key = OPENAI_API_KEY
    # response = openai.Completion.create(
    #     engine="davinci",
    #     prompt=prompt,
    #     temperature=0.7,
    #     max_tokens=256,
    #     n=1,
    #     stop=None,
    # )
    # Extract the embedding from the response
    # embedding = response.choices[0].embedding

    # Store the embedding in Redis
    # redis_client.set("embedding", embedding)

    # return embedding
    response=openai.Completion.create(
        model="curie:ft-tpisoftware-2023-03-02-16-10-55",
        prompt="Summarize the following text:{prompt}",
        max_tokens=256,
        temperature=0
    )
    # print(response)
    text = response.choices[0].text
    # Store the text in Redis
    # redis_client.set("text", text)

    return text

def execute_question(article,question):
    # Call OpenAI API
    openai.api_key = OPENAI_API_KEY
   
    response=openai.Completion.create(
        model="curie:ft-tpisoftware-2023-03-02-16-10-55",
        prompt="{question}",
        max_tokens=64,
        temperature=0
    )
    # print(response)
    text = response.choices[0].text.strip(" \n")
    # Store the text in Redis
    # redis_client.set("text", text)

    return text
