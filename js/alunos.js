import { alunos } from './listagemAlunos.js';

export function cadastrarAluno(aluno) {
	// El ID se genera localmente porque esta aplicación no usa un servidor.
	const alunoComId = { id: alunos.length + 1, ...aluno };
	alunos.push(alunoComId);
	// localStorage permite conservar los registros al recargar la página.
	localStorage.setItem('alunos', JSON.stringify(alunos));
	return alunoComId;
}
