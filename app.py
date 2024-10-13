from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import voyageai
from pinecone import Pinecone

app = Flask(__name__)
CORS(app)

# Initialize Pinecone and Voyage AI clients
PINECONE_API_KEY = ""
pc = Pinecone(api_key=PINECONE_API_KEY)
vo = voyageai.Client(api_key="")
index = pc.Index("semantic-laws")

def process_query(query, conversation_history):
    query_vector = vo.embed(texts=[query], model="voyage-law-2", input_type="query").embeddings[0]
    search_results = index.query(vector=query_vector, top_k=100, include_metadata=True)
    relevant_chunks = [m.metadata['summary'] for m in search_results.matches]

    augmented_prompt = f"""
        Conversation History:
        {conversation_history}
        User Question: {query}
        Context :{' '.join(relevant_chunks)}
        """

    return augmented_prompt

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_query = data['query']
    conversation_history = data.get('conversation_history', [])

    augmented_prompt = process_query(user_query, conversation_history)

    url = "https://api.perplexity.ai/chat/completions"
    payload = {
        "model": "llama-3.1-sonar-small-128k-online",
        "messages": [
            {
                "role": "system",
                "content": f"""
        You are a sophisticated AI legal assistant with expertise in European tech law. Your task is to answer the following question using the provided context and, if necessary, your ability to search for current online information. 
        Response Guidelines:
        1. Analyze the provided context, citing relevant information as [Context: Document Name].
        2. If the context is insufficient, state "Supplementing with online information" and provide additional details, citing as [Online: Source Name].
        3. Present your answer in a structured format, using numbered or bulleted lists where appropriate.
        4. Include at least one relevant legal precedent or case study, if applicable.
        5. Address any potential counterarguments or alternative interpretations.
        6. Conclude with:
           a) Confidence Level: (High/Medium/Low)
           b) Key Takeaways: (2-3 bullet points)
           c) Suggested Further Reading: (1-2 relevant sources)"""
            },
            {
                "role": "user",
                "content": augmented_prompt
            }
        ],
        "temperature": 0.2,
        "top_p": 0.9,
        "return_citations": True,
        "search_domain_filter": ["perplexity.ai"],
        "return_images": False,
        "return_related_questions": False,
        "search_recency_filter": "month",
        "top_k": 0,
        "stream": False,
        "presence_penalty": 0,
        "frequency_penalty": 1
    }
    headers = {
        "Authorization": "Bearer",
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    ai_response = response.json()['choices'][0]['message']['content']
    return jsonify({"response": ai_response})

if __name__ == '__main__':
    app.run(debug=True)
