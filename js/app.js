import { getCurrentUser, logout } from './auth.js';
import { alunos } from './listagemAlunos.js';
import { listarCursos } from './cursos.js';

function formatDate(dateString) {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${dateString}T00:00:00`));
}

async function renderDashboard(usuario) {
    const courseList = document.getElementById('curso-lista');

    document.getElementById('totalAlunos').textContent = alunos.length;

    try {
        const cursosDoUsuario = await listarCursos(usuario);
        const sortedCourses = [...cursosDoUsuario].sort((firstCourse, secondCourse) => firstCourse.dataInicio.localeCompare(secondCourse.dataInicio));

        document.getElementById('totalCursos').textContent = cursosDoUsuario.length;
        document.getElementById('courseCount').textContent = `${cursosDoUsuario.length} cursos`;

        if (sortedCourses.length > 0) {
            document.getElementById('proximoCurso').textContent = formatDate(sortedCourses[0].dataInicio);
            document.getElementById('proximoCursoNome').textContent = sortedCourses[0].nomeCurso;
        }

        sortedCourses.slice(0, 6).forEach(course => {
            const courseCard = document.createElement('article');
            courseCard.className = 'course-row';
            courseCard.innerHTML = `
                <div class="course-icon" aria-hidden="true">${course.nomeCurso.charAt(0)}</div>
                <div class="course-info"><h3>${course.nomeCurso}</h3><p>Professor: ${course.emailProfessor}</p></div>
                <div class="course-dates"><span>Início</span><strong>${formatDate(course.dataInicio)}</strong></div>
                <div class="course-dates end-date"><span>Fim</span><strong>${formatDate(course.dataFim)}</strong></div>
            `;
            courseList.appendChild(courseCard);
        });
    } catch (error) {
        document.getElementById('totalCursos').textContent = '0';
        document.getElementById('courseCount').textContent = '0 cursos';
        console.error(error);
    }
}

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

    document.getElementById('nameUser').textContent = usuario.nome.split(' ')[0];
    document.getElementById('userEmail').textContent = usuario.email;
    document.querySelector('.user-avatar').textContent = usuario.nome.charAt(0);
    renderDashboard(usuario);

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
