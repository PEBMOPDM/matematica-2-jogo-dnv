// Variáveis principais do jogo
let respostaCorreta;
let pontuacao = 0;
let modoAtual = 'basico';

// Inicia o jogo no modo selecionado
function iniciarJogo(modo) {
  modoAtual = modo;
  pontuacao = 0;
  document.getElementById("area-jogo").style.display = "block";
  document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;
  novaPergunta();
}

// Gera e exibe uma nova pergunta
function novaPergunta() {
  const { num1, num2 } = gerarNumeros(modoAtual);
  const operacao = escolherOperacao();
  respostaCorreta = calcularResposta(num1, num2, operacao);

  document.getElementById("pergunta").innerText = `${num1} ${operacao} ${num2}`;
  document.getElementById("resposta").value = "";
  document.getElementById("resultado").innerText = "";
}

// Gera dois números aleatórios (dobrados/triplados no modo 'desafio')
function gerarNumeros(modo) {
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;

  if (modo === 'desafio') {
    num1 *= 2;
    num2 *= 3;
  }

  return { num1, num2 };
}

// Escolhe uma operação aritmética aleatória
function escolherOperacao() {
  const operacoes = ['+', '-', '*'];
  return operacoes[Math.floor(Math.random() * operacoes.length)];
}

// Calcula o resultado correto da operação
function calcularResposta(n1, n2, op) {
  switch (op) {
    case '+': return n1 + n2;
    case '-': return n1 - n2;
    case '*': return n1 * n2;
  }
}

// Verifica a resposta do usuário e atualiza a pontuação
function verificarResposta() {
  const respostaUsuario = Number(document.getElementById("resposta").value);
  const resultadoEl = document.getElementById("resultado");

  if (respostaUsuario === respostaCorreta) {
    resultadoEl.innerText = "Resposta Correta!";
    pontuacao += 10;
  } else {
    resultadoEl.innerText = `Errado! A resposta correta era ${respostaCorreta}`;
    pontuacao -= 5;
  }

  document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;

  // Aguarda 1 segundo antes de gerar a próxima pergunta
  setTimeout(novaPergunta, 1000);
}