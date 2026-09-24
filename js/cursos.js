import { cursos } from "./listagemCursos.js";

export function listarCursos(usuario) {
    return new Promise((resolve, reject) => {
        const emailUsuario = typeof usuario === "string" ? usuario : usuario?.email;
        const cursosDoUsuario = cursos.filter(
            curso => curso.emailProfessor === emailUsuario
        );

        if (cursosDoUsuario.length === 0) {
            reject("não há cursos cadastrados para esse usuario");
            return;
        }

        resolve(cursosDoUsuario);
    });
}
