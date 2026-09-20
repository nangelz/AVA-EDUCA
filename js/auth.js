import { usuarios } from './listagemUsuarios.js';

// Função para simular o login de um usuário

export function login(usuario, senha) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = usuarios.find(
                u => u.email === usuario && u.senha === senha
            );

            if (user) {
                sessionStorage.setItem('usuarioLogado',
                    JSON.stringify(user)
                );
                resolve(user);
            } else {
                reject(new Error('Usuário ou senha inválidos'));
            }
        });
    });
}

// Exemplo de uso da função login

/*
const usuarioprueba = {
    email: "mariana.costa@edutech.com",
    senha: "edu2026"
};

login(usuarioprueba.email, usuarioprueba.senha).then(user => {
    console.log(user);
}).catch(err => {
    console.error(err.message);
});
*/

// funçao logout
export function logout() {
    return new Promise((resolve) => {
        sessionStorage.removeItem('user');
        window.location.href = '../index.html';
        resolve();
    });
}


// Manipulação do formulário de login
const loginForm = document.querySelector('#loginForm');
const loginMessage = document.querySelector('#loginMessage');

loginForm.addEventListener('submit', async event => {
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const senha = document.querySelector('#senha').value;

    loginMessage.textContent = '';

    try {
        const user = await login(email, senha);
        loginMessage.textContent = `Bem-vindo(a), ${user.nome}!`;
        loginMessage.className = 'login-success';
        loginForm.reset();
    } catch (error) {
        loginMessage.textContent = error.message;
        loginMessage.className = 'login-error';
    }
});
