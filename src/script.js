const form = document.getElementById("form");
const game = document.getElementById("game");
const problem = document.getElementById("problem");
const platform = document.getElementById("platform");
const spoilers = document.getElementById("spoilers");
const result = document.getElementById("result");
const prompt = document.getElementById("prompt");
const status = document.getElementById("status");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  for (const field of [game, problem]) {
    if (!field.value.trim()) {
      field.setCustomValidity("Preencha este campo com uma informação.");
      field.reportValidity();
      return;
    }
  }
  prompt.value = [
    "Ajude-me a resolver uma dificuldade em um jogo.",
    `Jogo: ${game.value.trim()}`,
    `Plataforma: ${platform.value || "não informada"}`,
    `Estou tendo problemas com: ${problem.value.trim()}`,
    "",
    "Responda em português brasileiro, de forma concisa, precisa e amigável, preferencialmente em até 180 palavras.",
    "Comece pela ação mais útil. Use passos numerados se houver uma sequência e considere o que eu já tentei.",
    spoilers.checked
      ? "Evite spoilers de história, personagens, áreas futuras e recompensas. Limite a orientação ao problema descrito e pergunte antes de revelar algo indispensável."
      : "Spoilers são permitidos quando necessários para resolver o problema.",
    "Não invente itens, locais, comandos ou mecânicas. Considere a plataforma e a versão, quando informadas.",
    "Se faltar uma informação essencial, faça uma pergunta curta antes de orientar. Se não tiver certeza, diga isso.",
    "Se tiver acesso à pesquisa na web e precisar confirmar informações, consulte fontes confiáveis e inclua os links utilizados."
  ].join("\n");
  result.hidden = false;
  status.textContent = "Copie e cole este prompt na IA de sua preferência.";
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
for (const field of [game, problem]) {
  field.addEventListener("input", () => field.setCustomValidity(""));
}
document.getElementById("copy").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(prompt.value);
    status.textContent = "Prompt copiado! Cole na IA de sua preferência.";
  } catch {
    prompt.focus();
    prompt.select();
    status.textContent = "Selecionei o prompt. Use Ctrl+C ou a opção Copiar do seu dispositivo.";
  }
});
