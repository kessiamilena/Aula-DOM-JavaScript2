

// 1. Pegar os valores
// 2. Calcular a Idade
//       a. Com base no ano
//       b. Com mês (EXTRA)
//       c. Com dia (EXTRA)

// 3. Gerar a faixa etária
   
//     Resultado            Faixa
//     0 à 12                Criança
//     13 à 17                Adolescente
//     18 à 65               Adulto
//     Acima de 65         Idoso
   

// 4. Organizar o objeto pessoa para salvar na lista
// 5. Cadastrar a pessoa na lista
// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// 8. Botão para limpar os registros;


let btnCalcular = document.querySelector("#btnCalcular")

function calcular(event) {

    event.preventDefault()

    let usuario = receberValores()
    
    // console.log(usuario)

    // let dataAtual = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(Date.now())
    
    let dataAtual = new Date();
    let anoAtual = dataAtual. getFullYear();
    let mesAtual = dataAtual.getMonth()+1;
    let diaAtual = dataAtual.getDate();

    console.log(anoAtual)
    console.log(mesAtual)
    console.log(diaAtual)

    let idade = calcularIdade(usuario._diaNascimento, usuario._mesNascimento, usuario._anoNascimento, diaAtual, mesAtual, anoAtual)

    let classificacao = classificarIdade(idade)

    usuario = organizarDados(usuario, idade, classificacao)

    cadastrarLista(usuario)

    window.location.reload()

    console.log(usuario)
    
}

// function dividirData() {

//     // dataDividida = dataAtual.split("/", 3)

//     // console.log(dataDividida)
// }


function calcularIdade(diaNasc, mesNasc, anoNasc, diaAt, mesAt, anoAt) {

    let anoIdade = anoAt - anoNasc
    let mesIdade = mesAt - mesNasc
    

    if ( mesIdade < 0 || ( mesIdade === 0 && diaAt < diaNasc ) ) {
        anoIdade--;
    }
    console.log(`Idade: ${anoIdade}`)
    return anoIdade

}

function receberValores() {

    let nome = document.querySelector("#nome").value.trim();
    let diaNascimento = document.querySelector("#dia-nascimento").value;
    let mesNascimento = document.querySelector("#mes-nascimento").value;
    let anoNascimento = document.querySelector("#ano-nascimento").value;

    let informacoesUsuario = {
        _nome: nome,
        _diaNascimento: diaNascimento,
        _mesNascimento: mesNascimento,
        _anoNascimento: anoNascimento
    }

    return informacoesUsuario
}

function organizarDados(dadosUsuario, idade, classificacao) {

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        _idade: idade,
        _classificacao: classificacao
    }


    return dadosUsuarioAtualizado
}

function classificarIdade(idade) {

    if( idade <= 12 ) {
        return "Criança"
    } else if( idade >= 13 && idade <= 17 ) {
        return "Adolescente"
    } else if( idade >= 18 && idade <= 65 ) {
        return "Adulto"
    } else if( idade >= 65 ) {
        return "Idoso"
    }

}

function cadastrarLista(dadosUsuario) {

    let listaUsuarios = []

    if( localStorage.getItem("usuarios") != null ) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuarios"))
    }

    listaUsuarios.push(dadosUsuario)

    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios))
}

function carregarUsuarios() {

    let listaCarregada = []

    if( localStorage.getItem("usuarios") != null ) {
        listaCarregada = JSON.parse(localStorage.getItem("usuarios"))
    }

    if( listaCarregada.length == 0 ) {

        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class="linha-mensagem">
                            <td colspan="6">Nenhum usuário cadastrado :( </td>
                            </tr>`
    } else {
        mostrarUsuarios(listaCarregada)
    }
    

}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())

function mostrarUsuarios(listaUsuarios) {

    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {
        template += `<tr>
                        <td data-cell="nome">${usuario._nome}</td>
                        <td data-cell="data de nascimento">${usuario._diaNascimento}/${usuario._mesNascimento}/${usuario._anoNascimento}</td>
                        <td data-cell="idade">${usuario._idade}</td>
                        <td data-cell="faixa etária">${usuario._classificacao}</td>
                    </tr>  `
    })

    tabela.innerHTML = template;
    
}

function limparRegistros() {

    localStorage.removeItem("usuarios")

    window.location.reload()
}