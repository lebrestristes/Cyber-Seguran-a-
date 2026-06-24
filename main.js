JavaScript


const passwordDisplay = document.getElementById('passwordDisplay');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');

const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// Criptografia segura usando a Web Crypto API
function getRandomSecureByte() {
    const array = new Uint8Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
}

function generatePassword() {
    let length = +lengthEl.value;
    
    // Sanatização básica de escopo de tamanho
    if (length < 8) length = 8;
    if (length > 64) length = 64;

    let allowedChars = '';
    let guaranteedChars = [];

    // Garante que pelo menos um caractere de cada tipo selecionado esteja na senha
    if (uppercaseEl.checked) {
        allowedChars += charSets.uppercase;
        guaranteedChars.push(charSets.uppercase[getRandomSecureByte() % charSets.uppercase.length]);
    }
    if (lowercaseEl.checked) {
        allowedChars += charSets.lowercase;
        guaranteedChars.push(charSets.lowercase[getRandomSecureByte() % charSets.lowercase.length]);
    }
    if (numbersEl.checked) {
        allowedChars += charSets.numbers;
        guaranteedChars.push(charSets.numbers[getRandomSecureByte() % charSets.numbers.length]);
    }
    if (symbolsEl.checked) {
        allowedChars += charSets.symbols;
        guaranteedChars.push(charSets.symbols[getRandomSecureByte() % charSets.symbols.length]);
    }

    if (allowedChars === '') return 'Selecione pelo menos uma opção!';

    let generatedPassword = [...guaranteedChars];
    const remainingLength = length - generatedPassword.length;

    for (let i = 0; i < remainingLength; i++) {
        const randomIndex = getRandomSecureByte() % allowedChars.length;
        generatedPassword.push(allowedChars[randomIndex]);
    }

    // Embaralhar o resultado final de forma segura para mitigar previsibilidade posicional
    return generatedPassword.sort(() => (getRandomSecureByte() / 255) - 0.5).join('');
}

generateBtn.addEventListener('click', () => {
    passwordDisplay.innerText = generatePassword();
});

copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.innerText;
    if (!password || password === 'Selecione as opções...' || password === 'Selecione pelo menos uma opção!') return;
    
    navigator.clipboard.writeText(password).then(() => {
        alert('Senha copiada para a área de transferência!');
    });
});
