# import redis
import openai

# redis_client = redis.Redis(host='localhost', port=6379, db=0)

def execute(prompt):
    # Call OpenAI API
    openai.api_key = "your-api-key"
    response = openai.Completion.create(
        engine="davinci",
        prompt=prompt,
        temperature=0.7,
        max_tokens=256,
        n=1,
        stop=None,
    )

    # Extract the embedding from the response
    embedding = response.choices[0].embedding
    return embedding
    
    # Store the embedding in Redis
    # redis_client.set("embedding", embedding)
