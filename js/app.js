import { getCurrentUser, logout } from './auth.js';

export function verificarSessao() {
    const user = getCurrentUser();

    if (!user) {
        window.location.href = 'index.html';
        return null;
    }

    return user;
}

document.addEventListener('DOMContentLoaded', () => {
    const usuario = verificarSessao();

    if (!usuario) {
        return;
    }

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
