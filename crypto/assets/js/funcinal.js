
const el = (selector) => document.querySelector(selector);
const elById = (id) => document.getElementById(id);
const maps = {
  encriptar: { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" },
  desencriptar: { enter: "e", imes: "i", ai: "a", ober: "o", ufat: "u" },
};


const processText = (map) => {
  const input = elById("inputEncriptar");
  if (!input) return console.error('Elemento "inputEncriptar" não encontrado.');

  let text = input.value;
  if (!/[A-ZáéíóúÁÉÍÓÚñ\d$@$!%*?&]/.test(text) && text.length) {
    const regex = new RegExp(Object.keys(map).join("|"), "g");
    text = text.replace(regex, (match) => map[match]);

    el(".container-text-default").style.display = "none";
    el(".container-context-resultado").style.display = "flex";
    el(".text-message-resultado").textContent = text;
    removeAlert();
  } else {
    showAlert();
  }
};


const removeAlert = () => {
  el(".alert-disabled").classList.remove("alert-actived");
  el(".text-desencriptar").classList.remove("text-desencriptar-alert");
};

const showAlert = () => {
  el(".alert-disabled").classList.add("alert-actived");
  el(".text-desencriptar").classList.add("text-desencriptar-alert");
};


const copyText = () => {
  const text = el(".text-message-resultado").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const copyBtn = elById("copiar");
    copyBtn.textContent = "Copiado ✅";
    copyBtn.classList.add("btn-copiado");
    setTimeout(() => {
      copyBtn.textContent = "Copiar";
      copyBtn.classList.remove("btn-copiado");
    }, 1000);
  });
};


elById("encriptar").addEventListener("click", () => processText(maps.encriptar));
elById("desencriptar").addEventListener("click", () => processText(maps.desencriptar));
elById("copiar").addEventListener("click", copyText);
