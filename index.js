import express from 'express';
// import session from "express-session";s
import cookieParser from "cookie-parser";

const host = "0.0.0.0";
const port = 3000;
const app = express();
const logado = false;
var listaProdutos = [];

app.use(express.urlencoded({ extended: true }));

// app.use(session({
//     secret: "SegredoMeu",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 30,
//         httpOnly: true,
//         secure: false
// }
// }));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(`
  <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
        <title>Página inicial do Trabalho final</title>
        <style>
            body, html {
                height: 100%;
            }
            .navbar {
                box-shadow: 0 4px 6px rgba(50, 0, 250, 0.1);
            }
        </style>
    </head>
    <body>

        <nav class="navbar navbar-expand-lg navbar-light bg-light" >
            <div class="container-fluid">
                <img src="/images/time1.jpg" alt="Logo" class="navbar-brand" style="width: 40px; height: 40px;">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="cadastrosDropdown" role="button" data-bs-toggle="dropdown">
                                Cadastros
                            </a>
                            <ul class="dropdown-toggle">
                                <li><a class="dropdown-item" href="/cadastroTimes">Cadastro de Times</a></li>
                            </ul>

                            <ul class="dropdown-toggle">
                                <li><a class="dropdown-item" href="/cadastroJogadores">Cadastro de Jogadores</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-danger" href="/logout">Sair</a>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </nav>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `);
});

app.get('/cadastroTimes', (req, res) => {
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
    <form class="row" action="/cadastroTimes" method="POST">
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
      <div class="col-12 d-flex justify-content-center mt-3">
        <button type="submit" class="btn btn-primary px-5">Cadastrar</button>
      </div>
    </form>
  </div>
</body>
</html>

    `);
});
app.listen(port, host, () => {
    console.log(`Servidor em execução em http://${host}:${port}/`);
});
