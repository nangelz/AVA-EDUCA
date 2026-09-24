import { alunos } from './listagemAlunos.js';

export function cadastrarAluno(aluno) {
	const alunoComId = { id: alunos.length + 1, ...aluno };
	alunos.push(alunoComId);
	localStorage.setItem('alunos', JSON.stringify(alunos));
	return alunoComId;
}
