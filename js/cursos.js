import { cursos } from "./listagemCursos.js";

export function listarCursos(usuario) {
    return new Promise((resolve, reject) => {
        // Acepta un correo o el objeto completo de sesión para facilitar su reutilización.
        const emailUsuario = typeof usuario === "string" ? usuario : usuario?.email;
        const cursosDoUsuario = cursos.filter(
            curso => curso.emailProfessor === emailUsuario
        );

        if (cursosDoUsuario.length === 0) {
			// El dashboard usa este rechazo para mostrar el estado sin cursos.
            reject("não há cursos cadastrados para esse usuario");
            return;
        }

        resolve(cursosDoUsuario);
    });
}
