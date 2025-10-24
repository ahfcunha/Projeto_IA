const campo_texto = document.querySelector('#form-prompt')  
const prompt_enviado = document.querySelector('#prompt')
const botao = document.querySelector('#btn-gerar')
const loading = document.querySelector('.loading')
const erro = document.querySelector('.erro')
const resposta_gerada = document.querySelector('.resposta-gerada')
const protocolo = "http://";
const baseURL = "localhost:5000";
const chatEndpoint = "/chat";

// so habilitará o botão quando o usuário tiver escrevido alguma coisa no campo do prompt
prompt_enviado.addEventListener('input', function(){
    // trim() elimina espaços em branco
    if(prompt_enviado.value.trim().length > 0) {
        botao.disabled = false;
    } else {
        botao.disabled = true;
    }
})

// declaração da função callback 
// (função passada como parâmetro de outra função para ser posteriormente executada em resposta a ocorrência de determinado evento)
async function preparacaoPrompt(event) {
    const URLcompleta = `${protocolo}${baseURL}${chatEndpoint}`
  
    // para que o navegador não recarregue a página
    event.preventDefault(); 

    const prompt = prompt_enviado.value;
    

    prompt_enviado.value = ''
    botao.disabled = true

    // mostra a mensagem de loading
    loading.style.display = 'block';
    resposta_gerada.innerHTML = '';
    erro.innerHTML = '';

    try {
        // requisição post para o back que devolve a reposta gerada pela IA
        const response = await axios.post(URLcompleta, { prompt: prompt})

        resposta_gerada.innerHTML = `
            <h3>${response.data.message}</h3>
        `;

    } catch (e) {
        console.log(e);
    // é executado independentemente do bloco try ou catch
    } finally {
        loading.style.display = 'none';
        botao.classList.add('disabled')
    }
}

// função é chamada sem os parenteses dos parâmtros pois é uma função callback
// não queremos que ele receba imediatamente o resultado da função
// ela só será executada após o botão ser clicado
campo_texto.addEventListener('submit', preparacaoPrompt)