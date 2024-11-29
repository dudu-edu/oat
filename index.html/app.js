


function obterRegistros() {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    return registros;
}


function salvarRegistros(registros) {
    localStorage.setItem('registros', JSON.stringify(registros));
}


function renderizarRegistros() {
    const lista = document.getElementById('listaRegistros');
    lista.innerHTML = ''; 

    const registros = obterRegistros();

    if (registros.length === 0) {
        lista.innerHTML = '<li class="list-group-item">Nenhum registro encontrado.</li>';
        return;
    }

   
    registros.sort((a, b) => a.nome.localeCompare(b.nome));

    registros.forEach((registro, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
            <strong>${registro.nome}</strong> - ${registro.email} 
            <button class="btn btn-warning btn-sm float-end mx-1" onclick="editarRegistro(${index})">Editar</button>
            <button class="btn btn-danger btn-sm float-end" onclick="removerRegistro(${index})">Excluir</button>
        `;
        lista.appendChild(li);
    });
}


function mostrarFeedback(mensagem, tipo) {
    const feedback = document.getElementById('feedbackMessage');
    feedback.classList.remove('alert-success', 'alert-danger');
    feedback.classList.add(tipo === 'success' ? 'alert-success' : 'alert-danger');
    feedback.innerText = mensagem;
    feedback.style.display = 'block';
}


function removerRegistro(index) {
    const registros = obterRegistros();
    registros.splice(index, 1);  
    salvarRegistros(registros);  
    mostrarFeedback('Registro excluído com sucesso!', 'success');
    renderizarRegistros();       
}


function editarRegistro(index) {
    const registros = obterRegistros();
    const registro = registros[index];

    
    document.getElementById('nome').value = registro.nome;
    document.getElementById('email').value = registro.email;
    document.getElementById('senha').value = registro.senha;  

   
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.textContent = 'Salvar Alterações';
    submitButton.onclick = function() {
        salvarAlteracoes(index);
    };
}


function salvarAlteracoes(index) {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    
    if (!isValidEmail(email)) {
        mostrarFeedback('Por favor, insira um e-mail válido.', 'error');
        return;
    }

    if (!isValidSenha(senha)) {
        mostrarFeedback('A senha deve ter pelo menos 8 caracteres, incluindo letras e números.', 'error');
        return;
    }

    const registros = obterRegistros();
    registros[index] = { nome, email, senha }; 
    salvarRegistros(registros); 

    
    mostrarFeedback('Registro editado com sucesso!', 'success');
    renderizarRegistros();

    
    resetForm();
}


function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}


function isValidSenha(senha) {
    const re = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    return re.test(senha);
}


function resetForm() {
    document.getElementById('formCadastro').reset();
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.textContent = 'Adicionar Registro';
    submitButton.onclick = function(event) {
        event.preventDefault();
        adicionarRegistro();
    };
}


document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();  

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    
    if (!isValidEmail(email)) {
        mostrarFeedback('Por favor, insira um e-mail válido.', 'error');
        return;
    }

    if (!isValidSenha(senha)) {
        mostrarFeedback('A senha deve ter pelo menos 8 caracteres, incluindo letras e números.', 'error');
        return;
    }

    if (nome && email && senha) {
        
        const novosRegistros = obterRegistros();
        novosRegistros.push({ nome, email, senha });  

        
        salvarRegistros(novosRegistros);

       
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('senha').value = '';

       
        mostrarFeedback('Registro adicionado com sucesso!', 'success');
        renderizarRegistros();
    }
});


document.addEventListener('DOMContentLoaded', function() {
    renderizarRegistros();
});
