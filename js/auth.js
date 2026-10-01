import { usuarios } from './listagemUsuarios.js';

export const SESSION_KEY = 'usuarioLogado';

export function getCurrentUser() {
	// La sesión solo vive en esta pestaña y se recupera al abrir cada pantalla.
    const userString = sessionStorage.getItem(SESSION_KEY);
    return userString ? JSON.parse(userString) : null;
}

export function isLoggedIn() {
    return Boolean(getCurrentUser());
}

export function login(usuario, senha) {
    return new Promise((resolve, reject) => {
		// El retraso simula una petición al servidor sin cambiar el contrato async.
        setTimeout(() => {
            const user = usuarios.find(
                u => u.email === usuario && u.senha === senha
            );

            if (user) {
                sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
                resolve(user);
            } else {
                reject(new Error('Usuário ou senha inválidos'));
            }
        }, 300);
    });
}

export function logout() {
    return new Promise((resolve) => {
		// Limpiar la sesión antes de redirigir evita volver a entrar con datos antiguos.
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = 'index.html';
        resolve();
    });
}

if (typeof document !== 'undefined') {
	// La comprobación permite importar este módulo también desde pruebas o scripts Node.
    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.querySelector('#loginForm');
        const loginMessage = document.querySelector('#loginMessage');

        if (!loginForm || !loginMessage) {
            return;
        }

        loginForm.addEventListener('submit', async event => {
            event.preventDefault();

            const email = document.querySelector('#email').value.trim();
            const senha = document.querySelector('#senha').value;

            loginMessage.textContent = '';
            loginMessage.className = '';

            try {
                const user = await login(email, senha);
                loginMessage.textContent = `Bem-vindo(a), ${user.nome}!`;
                loginMessage.className = 'login-success';
                loginForm.reset();

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 300);
            } catch (error) {
                loginMessage.textContent = error.message;
                loginMessage.className = 'login-error';
                loginForm.reset();
            }
        });
    });
}
