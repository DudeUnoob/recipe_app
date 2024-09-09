from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load pre-trained model for recipe summarization
summarizer = pipeline('summarization')

# AI Endpoint for Summarizing Recipe Steps
@app.route('/summarize_recipe', methods=['POST'])
def summarize_recipe():
    data = request.json
    steps = data.get('steps', '')

    # Summarize the steps
    summary = summarizer(steps, max_length=100, min_length=30, do_sample=False)

    return jsonify({"summary": summary[0]['summary_text']})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
