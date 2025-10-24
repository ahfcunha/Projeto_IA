import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from gemini_agent import resposta_ia

# inicialização do framework Flask
app = Flask(__name__)

# habilita o CORS para autorizar a comunicação entre front end e back end
CORS(app)

# criação da rota para determinado endpoint
@app.route('/chat', methods=['POST'])
# esta função receberá o prompt digitado pelo usuário e retornará a resposta da IA
def processamento():
    # transformar o json enviado pelo front em um dicionário que o python consiga interpretar
    # em seguida pegará o conteúdo associado a chave 'prompt' desse dicionário
    dados = request.json
    prompt = dados.get('prompt')

    resposta = resposta_ia(prompt)

    # envia a reposta para o front end
    return jsonify({
        'message': f"{resposta}"
    })

if __name__ == '__main__':
    # Roda o servidor na porta 5000 em modo de debug
    app.run(port=5000, debug=True)