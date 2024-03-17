from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Load the translation model
translator = pipeline("translation_en_to_vi", model="vinai/translate-en2vi-v2")

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    input_text = data['text']
    translation = translator(input_text, max_length=512)
    return jsonify(translation)

if __name__ == '__main__':
    app.run(debug=True)
