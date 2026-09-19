import {usuarios} from './listagemUsuarios.js';

export function login(usuario, senha) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = usuarios.find(
                u => u.email === usuario && u.senha === senha
            );

            if (user) {
                resolve(user);
            } else {
                reject(new Error('Usuário ou senha inválidos'));
            }
        });
    });
}

const usuarioprueba = {
    email: "mariana.costa@edutech.com",
    senha: "edu2026"
};

login(usuarioprueba.email, usuarioprueba.senha).then(user => {
    console.log(user);
}).catch(err => {
    console.error(err.message);
});