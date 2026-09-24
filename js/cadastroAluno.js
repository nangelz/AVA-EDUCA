import { getCurrentUser, logout } from './auth.js';
import { Aluno } from './Aluno.js';
import { cadastrarAluno } from './alunos.js';

const form = document.querySelector('#alunoForm');
const feedback = document.querySelector('#formFeedback');
const cepInput = document.querySelector('#cep');

function setError(fieldName, message) {
    const error = document.querySelector(`[data-error-for="${fieldName}"]`);
    const field = document.querySelector(`#${fieldName}`);
    if (error) error.textContent = message;
    if (field) field.classList.toggle('input-error', Boolean(message));
}

function clearErrors() {
    document.querySelectorAll('.field-error').forEach(error => { error.textContent = ''; });
    document.querySelectorAll('.input-error').forEach(field => field.classList.remove('input-error'));
}

function validateForm(data) {
    clearErrors();
    let valid = true;
    const requiredFields = ['nome', 'genero', 'cpf', 'telefone', 'email', 'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'estado'];

    requiredFields.forEach(fieldName => {
        if (!data[fieldName]) {
            setError(fieldName, 'Campo obrigatório.');
            valid = false;
        }
    });
    if (data.nome && (data.nome.length < 4 || data.nome.length > 80)) {
        setError('nome', 'Use entre 4 e 80 caracteres.');
        valid = false;
    }
    if (data.cpf && !/^\d+$/.test(data.cpf)) {
        setError('cpf', 'Informe apenas números.');
        valid = false;
    }
    if (data.telefone && !/^\d+$/.test(data.telefone)) {
        setError('telefone', 'Informe apenas números.');
        valid = false;
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        setError('email', 'Informe um e-mail válido.');
        valid = false;
    }
    const birthDate = data.dataNascimento && moment(data.dataNascimento, 'DD/MM/YYYY', true);
    const minimumBirthDate = moment('01/01/1900', 'DD/MM/YYYY', true);
    if (data.dataNascimento && (!birthDate.isValid() || !birthDate.isAfter(minimumBirthDate, 'day') || !birthDate.isBefore(moment(), 'day'))) {
        setError('dataNascimento', 'Informe uma data válida entre 01/01/1900 e hoje.');
        valid = false;
    }
    if (data.cep && !/^\d{8}$/.test(data.cep)) {
        setError('cep', 'Informe um CEP válido.');
        valid = false;
    }
    return valid;
}

function fillAddress(address) {
    const fields = { logradouro: address.logradouro, bairro: address.bairro, cidade: address.localidade, estado: address.uf };
    Object.entries(fields).forEach(([fieldName, value]) => { document.querySelector(`#${fieldName}`).value = value || ''; });
}

async function searchCep() {
    const cep = cepInput.value.replace(/\D/g, '');
    if (cep.length !== 8) return;
    setError('cep', '');
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error('Falha na consulta');
        const address = await response.json();
        if (address.erro) {
            setError('cep', 'CEP não encontrado.');
            return;
        }
        fillAddress(address);
    } catch (error) {
        setError('cep', 'Não foi possível consultar o CEP.');
    }
}

function getFormData() {
    return Object.fromEntries([...new FormData(form).entries()].map(([key, value]) => [key, value.trim()]));
}

const user = getCurrentUser();
if (!user) {
    window.location.href = 'index.html';
} else {
    document.querySelector('#userEmail').textContent = user.email;
    document.querySelector('#userAvatar').textContent = user.nome.charAt(0);
}

cepInput.addEventListener('blur', searchCep);
cepInput.addEventListener('input', () => { cepInput.value = cepInput.value.replace(/\D/g, '').slice(0, 8); });
document.querySelector('#btn-sair').addEventListener('click', logout);

form.addEventListener('submit', event => {
    event.preventDefault();
    feedback.textContent = '';
    feedback.className = 'form-feedback';
    const data = getFormData();
    if (!validateForm(data)) {
        feedback.textContent = 'Revise os campos destacados.';
        feedback.classList.add('feedback-error');
        return;
    }
    cadastrarAluno(new Aluno(data));
    form.reset();
    clearErrors();
    feedback.textContent = 'Aluno cadastrado com sucesso.';
    feedback.classList.add('feedback-success');
});