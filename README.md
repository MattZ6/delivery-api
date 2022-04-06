<div align="center">
  <h1>
    📦 Delivery API — Ignite 🔥
  </h1>

  > API para acompanhamento de entregas, construída na trilha de Node JS como conteúdo adicional do bootcamp Ignite da Rocketseat.

  <strong>🚧 Sendo desenvolvida... 🚧</strong>

  ![build-image] ![coveralls-image]
</div>

## 💡 Você vai precisar

- Primeiramente de uma xícara de ☕ bem quentinho;
- [Node JS](https://nodejs.org) instalado em sua máquina;
- [🐳 Docker](https://www.docker.com) instalado em sua máquina — junto do [Docker compose](https://docs.docker.com/compose/install);

## 🎉 Começando

Clone o repositório:

```bash
git clone https://github.com/MattZ6/delivery-api
```

Adentre a pasta do projeto:

```bash
cd delivery-api
```

Instale as dependências:

```bash
yarn
```

## ⚙ Variáveis de ambiente

> O projeto possui algumas variáveis de ambiente para podermos ter configurações dinâmicas baseadas no contexto em que está sendo executado.

Primeiramente, crie uma cópia do arquivo `.env.example`:

```bash
cp .env.example .env
```

Em seguida preencha os valores faltantes nas variáveis:

```bash
# Autenticação (👇 secret para os tokens)
JWT_AUTH_SECRET= # (ex. G4L1NH4C0MQU14B0)

# Conexão com banco de dados
DATABASE_PORT= # (ex. 5432)
DATABASE_USER= # (usuário do banco)
DATABASE_PASS= # (senha do banco)
DATABASE_NAME= # (nome do banco)
```
**IMPORTANTE** - Vale ressaltar que as variáveis `DATABASE_DRIVER` & `DATABASE_HOST` devem permanecer com os mesmos valores (por conta da configuração do docker compose).

## 🔥 Executando

### 1. Iniciar

Para iniciar os serviços — aplicação e banco de dados:

```bash
yarn docker:up
```

### 2. Executar migrations

Para criar as tabelas

```bash
yarn db:migration:create
```

> É só isso mesmo 🤙

### Parar

Para parar os serviços você pode executar o comando:

```bash
yarn docker:down
```

> Lembrando que isso fará com que os serviços (api e banco de dados) sejam removidos. Caso queira somente "adormecer" os serviços, execute `docker-compose stop`.

## 🤝 Contribuição

Contribuições, issues e novas features são sempre bem-vindas! <br/>
Fique à vontade para explorar as [issues](https://github.com/MattZ6/delivery-api/issues).

## 👨‍🎤 Autor

Eu mesmo, [Matheus](https://github.com/MattZ6)! 👋
<br />
Quer conversar? [Chama aqui](https://www.linkedin.com/in/mattz6)!

## 📜 Licença

[Licença MIT](https://github.com/MattZ6/delivery-api/blob/main/LICENSE.md) © 2022 [Matheus Felipe Zanin](https://github.com/MattZ6)

___

<div align="center">
  <strong>Ignite Bootcamp 🔥</strong>
</div>

[build-image]: https://img.shields.io/github/workflow/status/mattz6/delivery-api/Node.js/main?&style=for-the-badge&labelColor=232320
[coveralls-image]: https://img.shields.io/coveralls/github/MattZ6/delivery-api/main?&style=for-the-badge&labelColor=232320
