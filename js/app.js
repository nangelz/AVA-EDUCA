import { logout } from './auth.js';

// Função para verificar se o usuário está logado

export function verificarSessao() {
    const userString = sessionStorage.getItem('usuariologado');
    if (userString) {
        const user = JSON.parse(userString);
        return user;
    } else {
        window.location.href = 'index.html';
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnSair = document.getElementById('btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', async () => {
            try {
                await logout();
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
            }
        });
    }
});

