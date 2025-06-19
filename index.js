import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const host = "0.0.0.0";
const port = 3000;
const app = express();
const logado = false;
var listaDeTimes = [];
var listaDeJogadores = [];

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "SegredoMeu",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
        secure: false,
}
}));

app.use(cookieParser());

app.get("/", verificaLogin, (req, res) => {
    const ultimoLoginRegistrado = req.cookies.ultimoLogin;
    res.send(`
            <!DOCTYPE html>
        <html lang="pt-br">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Página inicial do Trabalho final</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
        <style>
            body {
            font-family: 'Poppins', sans-serif;
            background-color: #6a0dad;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            }

            .navbar {
            background-color: #8a2be2 !important; 
            box-shadow: 0 4px 6px rgba(50, 0, 250, 0.1);
            }

            .navbar-nav .nav-link {
            color: #ffffff !important; 
            }

            .navbar-nav .nav-link.text-danger {
            color: #ffcccc !important; 
            }

            .custom-btn {
            border: 1px solid #ccc;
            background-color: transparent;
            color: white;
            }

            .custom-btn:hover {
            background-color: #ffffff11;
            }

            .icon-spacing {
            margin-right: 6px;
            }
        </style>
        </head>

        <body>
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
            <a class="navbar-brand text-white" href="/">Home</a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="/cadastroTimes">Cadastro de Times</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/cadastroJogadores">Cadastro de Jogadores</a>
                </li>
                </ul>
                <ul class="navbar-nav">
                <li class="nav-item d-flex align-items-center">
                    <span class="navbar-text text-white me-3">
                    ${ultimoLoginRegistrado ? "Último acesso: " + ultimoLoginRegistrado : ""}
                    </span>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-danger d-flex align-items-center" href="/logout">
                    <i class="bi bi-box-arrow-right me-1"></i> Sair
                    </a>
                </li>
                </ul>
            </div>
            </div>
        </nav>

        <div class="container flex-grow-1 d-flex justify-content-center mt-5 align-items-start">
            <div class="text-center">
            <h1 class="text-white mb-4">Bem-vindo ao Sistema</h1>
            <div class="d-flex justify-content-center flex-wrap gap-2">
                <a href="/cadastroTimes" class="btn custom-btn me-2">
                <i class="bi bi-plus-circle icon-spacing"></i>Cadastro de Times
                </a>
                <a href="/cadastroJogadores" class="btn custom-btn me-2">
                <i class="bi bi-person-plus-fill icon-spacing"></i>Cadastro de Jogadores
                </a>
                <a href="/listaTimes" class="btn custom-btn me-2">
                <i class="bi bi-list-ul icon-spacing"></i>Listar Times
                </a>
                <a href="/listaJogadores" class="btn custom-btn">
                <i class="bi bi-people-fill icon-spacing"></i>Listar Jogadores
                </a>
            </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>

  `);
});

app.get("/cadastroTimes", verificaLogin, (req, res) => {
    res.send(`
            <html lang="pt-br">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
        <title>Cadastro de Times</title>
        <style>
            body {
            background: linear-gradient(to right, #4e54c8, #8f94fb);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            }

            .form-container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            border: 2px solid #6c63ff;
            width: 100%;
            max-width: 900px;
            }

            h2 {
            text-align: center;
            color: #4e54c8;
            margin-bottom: 30px;
            }

            .form-label {
            color: #4e54c8;
            font-weight: bold;
            }

            .btn-primary {
            background-color: #6c63ff;
            border-color: #6c63ff;
            }

            .btn-primary:hover {
            background-color: #5848d2;
            border-color: #5848d2;
            }
        </style>
        </head>
        <body>
        <div class="form-container">
            <h2>Cadastro de Times</h2>
            <form class="row" action="/cadastroTimes" method="POST" novalidate>
            <div class="mb-3 col-md-4">
                <label for="nomeTime" class="form-label">Nome do Time</label>
                <input type="text" class="form-control" id="nomeTime" name="nomeTime" required>
            </div>
            <div class="mb-3 col-md-4">
                <label for="nomeTecnico" class="form-label">Nome do Técnico</label>
                <input type="text" class="form-control" id="nomeTecnico" name="nomeTecnico" required>
            </div>
            <div class="mb-3 col-md-4">
                <label for="telTime" class="form-label">Telefone do Time</label>
                <input type="text" class="form-control" id="telTime" name="telTime" required>
            </div>
            <div class="d-flex gap-2 items-center justify-content-center">
                    <a class="btn btn-secondary px-5" type="button" href="/">Voltar</a>
                    <button type="submit" class="btn btn-primary px-5">Cadastrar</button>
            </div>
            </form>
        </div>
        </body>
        </html>

    `);
    res.end();
});

app.post("/cadastroTimes", verificaLogin, (req, res) => {
    const nomeTime = req.body.nomeTime;
    const nomeTecnico = req.body.nomeTecnico;
    const telTime = req.body.telTime;

    if(nomeTime && nomeTecnico && telTime) {
        listaDeTimes.push({
            nomeTime,
            nomeTecnico,
            telTime
        });
        res.redirect("/listaTimes");
    }else{
        let conteudo = `
        <html lang="pt-br">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
        <title>Cadastro de Times</title>
        <style>
            body {
            background: linear-gradient(to right, #4e54c8, #8f94fb);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            }

            .form-container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            border: 2px solid #6c63ff;
            width: 100%;
            max-width: 900px;
            }

            h2 {
            text-align: center;
            color: #4e54c8;
            margin-bottom: 30px;
            }

            .form-label {
            color: #4e54c8;
            font-weight: bold;
            }

            .btn-primary {
            background-color: #6c63ff;
            border-color: #6c63ff;
            }

            .btn-primary:hover {
            background-color: #5848d2;
            border-color: #5848d2;
            }
        </style>
        </head>
        <body>
        <div class="form-container">
            <h2>Cadastro de Times</h2>
            <form class="row" action="/cadastroTimes" method="POST" >
            <div class="mb-3 col-md-4"> `
            if(!nomeTime) {
                conteudo += `
                <label for="nomeTime" class="form-label">Nome do Time</label>
                <input type="text" class="form-control" id="nomeTime" name="nomeTime" required>
                <div class="text-danger"> Nome do Time é obrigatório!</div>
                `
            }else {
                conteudo += `
                <label for="nomeTime" class="form-label">Nome do Time</label>
                <input type="text" class="form-control" id="nomeTime" name="nomeTime" value="${nomeTime}" required>
                `
            }
            conteudo += `</div>
            <div class="mb-3 col-md-4">`
            if(!nomeTecnico) {
                conteudo += `
                <label for="nomeTecnico" class="form-label">Nome do Técnico</label>
                <input type="text" class="form-control" id="nomeTecnico" name="nomeTecnico" required>
                <span class="text-danger">Nome do Técnico é obrigatório!</span>
                `
            }else {
                conteudo += `
                <label for="nomeTecnico" class="form-label">Nome do Técnico</label>
                <input type="text" class="form-control" id="nomeTecnico" name="nomeTecnico" value="${nomeTecnico}" required>
                `
            }
            conteudo += `</div>
            <div class="mb-3 col-md-4">`
            if(!telTime) {
                conteudo += `
                <label for="telTime" class="form-label">Telefone do Time</label>
                <input type="text" class="form-control" id="telTime" name="telTime" required>
                <div class="text-danger">Telefone do Time é obrigatório!</div>
            `
            }else {
                conteudo += `
                <label for="telTime" class="form-label">Telefone do Time</label>
                <input type="text" class="form-control" id="telTime" name="telTime" value="${telTime}" required>
                `
            }
            conteudo += `</div>
            <div class="d-flex gap-2 items-center justify-content-center">
                    <a class="btn btn-secondary px-5" type="button" href="/">Voltar</a>
                    <button type="submit" class="btn btn-primary px-5">Cadastrar</button>
            </div>
            </form>
        </div>
        </body>
        </html>
        `
        res.send(conteudo);
    };
});


app.get("/listaTimes", verificaLogin, (req, res) => {
    let conteudo = `
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
        <title>Lista de Times</title>
        <style>
            body {
                background: linear-gradient(to right, #4e54c8, #8f94fb);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
                padding: 20px;
            }

            .table-container {
                background-color: #ffffff;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                border: 2px solid #6c63ff;
                width: 100%;
                max-width: 1000px;
            }

            h2 {
                text-align: center;
                color: #4e54c8;
                margin-bottom: 30px;
            }

            .table {
                border: 1px solid #6c63ff;
            }

            th {
                background-color: #6c63ff;
                color: #fff;
                text-align: center;
            }

            td {
                text-align: center;
                color: #4e54c8;
                font-weight: bold;
            }

            .btn-voltar {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }

            .btn-secondary {
                background-color: #6c63ff;
                border-color: #6c63ff;
                color: white;
                padding: 10px 30px;
                font-weight: bold;
                border-radius: 8px;
            }

            .btn-secondary:hover {
                background-color: #5848d2;
                border-color: #5848d2;
            }
        </style>
    </head>
    <body>
        <div class="table-container">
            <h2>Lista de Times</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome do Time</th>
                        <th>Nome do Técnico</th>
                        <th>Telefone do Time</th>
                    </tr>
                </thead>
                <tbody>`;

    if (listaDeTimes.length === 0) {
        conteudo += `
                    <tr>
                        <td colspan="3">Nenhum time cadastrado ainda.</td>
                    </tr>`;
    } else {
        for (let i = 0; i < listaDeTimes.length; i++) {
            conteudo += `
                    <tr>
                        <td>${listaDeTimes[i].nomeTime}</td>
                        <td>${listaDeTimes[i].nomeTecnico}</td>
                        <td>${listaDeTimes[i].telTime}</td>
                    </tr>`;
        }
    }

    conteudo += `
                </tbody>
            </table>
            <div class="d-flex gap-2 items-center justify-content-center">
                    <a class="btn btn-secondary px-5" type="button" href="/">Voltar</a>
                    <a type="submit" class="btn btn-secondary px-5" href="/cadastroTimes">Cadastrar mais times</a>
            </div>
        </div>
    </body>
    </html>
    `;

    res.send(conteudo);
});



app.get("/cadastroJogadores", verificaLogin, (req, res) => {
    let opcoesTimes = listaDeTimes.map(t => `<option value="${t.nomeTime}">${t.nomeTime}</option>`).join("");

    res.send(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
            <title>Cadastro de Jogadores</title>
            <style>
                body {
                    background: linear-gradient(to right, #4e54c8, #8f94fb);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: Arial, sans-serif;
                }

                .form-container {
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 15px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                    border: 2px solid #6c63ff;
                    width: 100%;
                    max-width: 1000px;
                }

                h2 {
                    text-align: center;
                    color: #4e54c8;
                    margin-bottom: 30px;
                }

                .form-label {
                    color: #4e54c8;
                    font-weight: bold;
                }

                .btn-primary {
                    background-color: #6c63ff;
                    border-color: #6c63ff;
                }

                .btn-primary:hover {
                    background-color: #5848d2;
                    border-color: #5848d2;
                }
            </style>
        </head>
        <body>
            <div class="form-container">
                <h2>Cadastro de Jogadores</h2>
                <form class="row" action="/cadastroJogadores" method="POST" novalidate>
                    <div class="mb-3 col-md-4">
                        <label for="nomeJogador" class="form-label">Nome do Jogador</label>
                        <input type="text" class="form-control" id="nomeJogador" name="nomeJogador" required>
                    </div>

                    <div class="mb-3 col-md-4">
                        <label for="numeroCamisa" class="form-label">Número da Camisa</label>
                        <input type="number" class="form-control" id="numeroCamisa" name="numeroCamisa" required>
                    </div>

                    <div class="mb-3 col-md-4">
                        <label for="dataNascimento" class="form-label">Data de Nascimento</label>
                        <input type="date" class="form-control" id="dataNascimento" name="dataNascimento" required>
                    </div>

                    <div class="mb-3 col-md-4">
                        <label for="altura" class="form-label">Altura (cm)</label>
                        <input type="number" class="form-control" id="altura" name="altura" required>
                    </div>

                    <div class="mb-3 col-md-4">
                        <label for="genero" class="form-label">Gênero</label>
                        <select class="form-select" id="genero" name="genero" required>
                            <option value="">Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div class="mb-3 col-md-4">
                        <label for="posicao" class="form-label">Posição</label>
                        <input type="text" class="form-control" id="posicao" name="posicao" required>
                    </div>

                    <div class="mb-3 col-md-12">
                        <label for="equipe" class="form-label">Equipe</label>
                        <select class="form-select" id="equipe" name="equipe" required>
                            <option value="">Selecione a equipe</option>
                            ${opcoesTimes}
                        </select>
                    </div>

                    <div class="d-flex gap-2 justify-content-center mt-4">
                        <a href="/" class="btn btn-secondary px-5">Voltar</a>
                        <button type="submit" class="btn btn-primary px-5">Cadastrar</button>
                    </div>
                </form>
            </div>
        </body>
        </html>
    `);
});


app.post("/cadastroJogadores", verificaLogin, (req, res) => {
    const nomeJogador = req.body.nomeJogador;
    const numeroCamisa = req.body.numeroCamisa;
    const dataNascimento = req.body.dataNascimento;
    const altura = req.body.altura;
    const genero = req.body.genero;
    const posicao = req.body.posicao;
    const equipe = req.body.equipe;

    if (nomeJogador && numeroCamisa && dataNascimento && altura && genero && posicao && equipe) {
        listaDeJogadores.push({
            nomeJogador,
            numeroCamisa,
            dataNascimento,
            altura,
            genero,
            posicao,
            equipe
        });
        res.redirect("/listaJogadores");
    } else {
        let conteudo = `
        <html lang="pt-br">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
        <title>Cadastro de Jogadores</title>
        <style>
            body {
            background: linear-gradient(to right, #4e54c8, #8f94fb);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
            }

            .form-container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            border: 2px solid #6c63ff;
            width: 100%;
            max-width: 900px;
            }

            h2 {
            text-align: center;
            color: #4e54c8;
            margin-bottom: 30px;
            }

            .form-label {
            color: #4e54c8;
            font-weight: bold;
            }

            .btn-primary {
            background-color: #6c63ff;
            border-color: #6c63ff;
            }

            .btn-primary:hover {
            background-color: #5848d2;
            border-color: #5848d2;
            }
        </style>
        </head>
        <body>
        <div class="form-container">
            <h2>Cadastro de Jogadores</h2>
            <form class="row" action="/cadastroJogadores" method="POST">
            <div class="mb-3 col-md-4">`;
        if (!nomeJogador) {
            conteudo += `
                <label for="nomeJogador" class="form-label">Nome do Jogador</label>
                <input type="text" class="form-control" id="nomeJogador" name="nomeJogador" required>
                <span class="text-danger">O campo Nome do Jogador é obrigatório!</span>`;
        } else {
            conteudo += `
                <label for="nomeJogador" class="form-label">Nome do Jogador</label>
                <input type="text" class="form-control" id="nomeJogador" name="nomeJogador" value="${nomeJogador}" required>`;
        }

        conteudo += `</div><div class="mb-3 col-md-4">`;
        if (!numeroCamisa) {
            conteudo += `
                <label for="numeroCamisa" class="form-label">Número da Camisa</label>
                <input type="number" class="form-control" id="numeroCamisa" name="numeroCamisa" required>
                <span class="text-danger">O campo Número da Camisa é obrigatório!</span>`;
        } else {
            conteudo += `
                <label for="numeroCamisa" class="form-label">Número da Camisa</label>
                <input type="number" class="form-control" id="numeroCamisa" name="numeroCamisa" value="${numeroCamisa}" required>`;
        }

        conteudo += `</div><div class="mb-3 col-md-4">`;
        if (!dataNascimento) {
            conteudo += `
                <label for="dataNascimento" class="form-label">Data de Nascimento</label>
                <input type="date" class="form-control" id="dataNascimento" name="dataNascimento" required>
                <span class="text-danger">O campo Data de Nascimento é obrigatório!</span>`;
        } else {
            conteudo += `
                <label for="dataNascimento" class="form-label">Data de Nascimento</label>
                <input type="date" class="form-control" id="dataNascimento" name="dataNascimento" value="${dataNascimento}" required>`;
        }

        conteudo += `</div><div class="mb-3 col-md-4">`;
        if (!altura) {
            conteudo += `
                <label for="altura" class="form-label">Altura (cm)</label>
                <input type="number" class="form-control" id="altura" name="altura" required>
                <span class="text-danger">O campo Altura é obrigatório!</span>`;
        } else {
            conteudo += `
                <label for="altura" class="form-label">Altura (cm)</label>
                <input type="number" class="form-control" id="altura" name="altura" value="${altura}" required>`;
        }

        conteudo += `</div><div class="mb-3 col-md-4">`;
        if (!genero) {
            conteudo += `
                <label for="genero" class="form-label">Gênero</label>
                <input type="text" class="form-control" id="genero" name="genero" required>
                <span class="text-danger">O campo Gênero é obrigatório!</span>`;
        } else {
            conteudo += `
                <label for="genero" class="form-label">Gênero</label>
                <input type="text" class="form-control" id="genero" name="genero" value="${genero}" required>`;
        }

        conteudo += `</div><div class="mb-3 col-md-4">`;
        if (!posicao) {
            conteudo += `
                <label for="posicao" class="form-label">Posição</label>
                <input type="text" class="form-control" id="posicao" name="posicao" required>
                <span class="text-danger">O campo Posição é obrigatório!</span>`;
        } else {
            conteudo += `
                <label for="posicao" class="form-label">Posição</label>
                <input type="text" class="form-control" id="posicao" name="posicao" value="${posicao}" required>`;
        }

        conteudo += `</div><div class="mb-3 col-md-4">`;
        if (!equipe) {
            conteudo += `
                <label for="equipe" class="form-label">Equipe</label>
                <input type="text" class="form-control" id="equipe" name="equipe" required>
                <span class="text-danger">O campo Equipe é obrigatório!</span>`;
        } else {
            conteudo += `
                <label for="equipe" class="form-label">Equipe</label>
                <input type="text" class="form-control" id="equipe" name="equipe" value="${equipe}" required>`;
        }

        conteudo += `</div>
                    <div class="d-flex gap-2 justify-content-center mt-4">
                        <a href="/" class="btn btn-secondary px-5">Voltar</a>
                        <button type="submit" class="btn btn-primary px-5">Cadastrar</button>
                    </div>
            </form>
        </div>
        </body>
        </html>
        `;
        res.send(conteudo);
    }
});



app.get("/listaJogadores", verificaLogin, (req, res) => {
    let conteudo = `
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
        <title>Lista de Jogadores</title>
        <style>
            body {
                background: linear-gradient(to right, #4e54c8, #8f94fb);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
                padding: 20px;
            }

            .table-container {
                background-color: #ffffff;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                border: 2px solid #6c63ff;
                width: 100%;
                max-width: 1000px;
            }

            h2 {
                text-align: center;
                color: #4e54c8;
                margin-bottom: 30px;
            }

            .table {
                border: 1px solid #6c63ff;
            }

            th {
                background-color: #6c63ff;
                color: #fff;
                text-align: center;
            }

            td {
                text-align: center;
                color: #4e54c8;
                font-weight: bold;
            }

            .btn-voltar {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }

            .btn-secondary {
                background-color: #6c63ff;
                border-color: #6c63ff;
                color: white;
                padding: 10px 30px;
                font-weight: bold;
                border-radius: 8px;
            }

            .btn-secondary:hover {
                background-color: #5848d2;
                border-color: #5848d2;
            }
        </style>
    </head>
    <body>
        <div class="table-container">
            <h2>Lista de Jogadores</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Nº da Camisa</th>
                        <th>Data de Nascimento</th>
                        <th>Altura (cm)</th>
                        <th>Gênero</th>
                        <th>Posição</th>
                        <th>Equipe</th>
                    </tr>
                </thead>
                <tbody>`;

    if (listaDeJogadores.length === 0) {
        conteudo += `
                    <tr>
                        <td colspan="7">Nenhum jogador cadastrado ainda.</td>
                    </tr>`;
    } else {
        for (let jogador of listaDeJogadores) {
            conteudo += `
                    <tr>
                        <td>${jogador.nomeJogador}</td>
                        <td>${jogador.numeroCamisa}</td>
                        <td>${jogador.dataNascimento}</td>
                        <td>${jogador.altura}</td>
                        <td>${jogador.genero}</td>
                        <td>${jogador.posicao}</td>
                        <td>${jogador.equipe}</td>
                    </tr>`;
        }
    }

    conteudo += `
                </tbody>
            </table>

            <div class="d-flex gap-2 items-center justify-content-center">
                    <a class="btn btn-secondary px-5" type="button" href="/">Voltar</a>
                    <a class="btn btn-secondary" href="/cadastroJogadores">Cadastrar mais jogadores</a>
            </div>
        </div>
    </body>
    </html>
    `;

    res.send(conteudo);
});


app.get("/login", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background: linear-gradient(to right, #4e54c8, #8f94fb);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .login-container {
                background-color: #ffffff;
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                border: 2px solid #6c63ff;
                width: 100%;
                max-width: 400px;
            }

            h2 {
                text-align: center;
                color: #4e54c8;
                margin-bottom: 30px;
            }

            label {
                color: #4e54c8;
                font-weight: bold;
                margin-top: 10px;
            }

            input[type="text"],
            input[type="password"] {
                width: 100%;
                padding: 12px;
                margin-top: 5px;
                margin-bottom: 20px;
                border: 1px solid #6c63ff;
                border-radius: 8px;
                outline: none;
                transition: 0.3s ease-in-out;
            }

            input[type="text"]:focus,
            input[type="password"]:focus {
                box-shadow: 0 0 5px #6c63ff;
                border-color: #4e54c8;
            }

            button {
                width: 100%;
                background-color: #6c63ff;
                color: white;
                padding: 12px;
                border: none;
                border-radius: 8px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: #5848d2;
            }
        </style>
    </head>
    <body>
        <div class="login-container">
            <h2>Login</h2>
            <form action="/login" method="post">
                <div class="mb-3">
                    <label for="usuario">Usuário</label>
                    <input type="text" id="usuario" name="usuario" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="senha">Senha</label>
                    <input type="password" id="senha" name="senha" class="form-control" required>
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    </body>
    </html>
    `);
});


app.post("/login", (req, res) => {
    const usuarioLogin = req.body.usuario;
    const senhaLogin = req.body.senha;
    if (usuarioLogin === "admin" && senhaLogin === "123") {
        req.session.logado = true;
        const dataAtual = new Date();
        res.cookie('ultimoLogin', dataAtual.toLocaleString(), { maxAge: 1000 * 60 * 60 * 24 * 30 });
        res.redirect("/");
    } else {
        res.send(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8" />
            <title>Login</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background: linear-gradient(to right, #4e54c8, #8f94fb);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .login-container {
                    background-color: #ffffff;
                    padding: 40px;
                    border-radius: 15px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                    border: 2px solid #6c63ff;
                    width: 100%;
                    max-width: 400px;
                    text-align: center;
                }
                h2 {
                    color: #4e54c8;
                    margin-bottom: 30px;
                }
                label {
                    color: #4e54c8;
                    font-weight: bold;
                    display: block;
                    margin-top: 10px;
                    text-align: left;
                }
                input[type="text"],
                input[type="password"] {
                    width: 100%;
                    padding: 12px;
                    margin-top: 5px;
                    margin-bottom: 20px;
                    border: 1px solid #6c63ff;
                    border-radius: 8px;
                    outline: none;
                    transition: 0.3s ease-in-out;
                }
                input[type="text"]:focus,
                input[type="password"]:focus {
                    box-shadow: 0 0 5px #6c63ff;
                    border-color: #4e54c8;
                }
                button {
                    width: 100%;
                    background-color: #6c63ff;
                    color: white;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                button:hover {
                    background-color: #5848d2;
                }
                .error-msg {
                    color: #d9534f;
                    font-weight: bold;
                    margin-bottom: 15px;
                }
            </style>
        </head>
        <body>
            <div class="login-container">
                <h2>Login</h2>
                <form action="/login" method="post">
                    <label for="usuario">Usuário</label>
                    <input type="text" id="usuario" name="usuario" required />
                    <label for="senha">Senha</label>
                    <input type="password" id="senha" name="senha" required />
                    <div class="error-msg">Usuário ou senha inválidos!</div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </body>
        </html>
        `);
    }
});

function verificaLogin(req, res, next) {
    if (req.session.logado) {
        next();
    } else {
        res.redirect("/login");
    }
}

app.get("/logout", (req, res) => {
    req.session.logado = false;
    req.session.destroy();
    res.redirect("/login");
});

app.listen(port, host, () => {
    console.log(`Servidor em execução em http://${host}:${port}/`);
});
