# Portfolio Pessoal

Site de portfólio pessoal com Spring Boot (API REST) e Angular (SPA).

## Funcionalidades

- **Projetos** — lista e detalhe com markdown
- **Blog** — artigos com suporte a markdown
- **Sobre** — skills com barra de progresso, experiência e formação
- **Admin** — painel para gerenciar todo o conteúdo

## Stack

| Camada    | Tecnologia                                    |
|-----------|-----------------------------------------------|
| Backend   | Java 21, Spring Boot 3.5, Spring Security, JPA |
| Frontend  | Angular 17+, Angular Material, ngx-markdown   |
| Banco Dev | H2 (em memória, zero configuração)            |
| Banco Prod| PostgreSQL 16                                 |
| Infra     | Docker Compose                                |

## Rodando em desenvolvimento

### Pré-requisitos
- Java 21+
- Node.js 20+
- Angular CLI (`npm install -g @angular/cli`)

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

Acesse a API em `http://localhost:8080`  
Console H2 (banco de dados): `http://localhost:8080/h2-console`  
- URL: `jdbc:h2:mem:portfoliodb`  
- Usuário: `sa` / Senha: (vazio)

### Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

Acesse o site em `http://localhost:4200`

### Admin

Acesse `http://localhost:4200/admin/login`  
Credenciais padrão: `admin` / `changeme`

## Rodando com Docker

```bash
docker compose up --build
```

Acesse o site em `http://localhost`

## API Endpoints

### Públicos
```
GET /api/projects              lista projetos
GET /api/projects/{slug}       detalhe do projeto
GET /api/articles              lista artigos publicados
GET /api/articles/{slug}       detalhe do artigo
GET /api/profile               skills, experiências e formação
```

### Admin (HTTP Basic: admin / changeme)
```
GET    /api/admin/verify
POST   /api/admin/projects
PUT    /api/admin/projects/{id}
DELETE /api/admin/projects/{id}
POST   /api/admin/articles
PUT    /api/admin/articles/{id}
DELETE /api/admin/articles/{id}
POST/PUT/DELETE /api/admin/skills/{id}
POST/PUT/DELETE /api/admin/experiences/{id}
POST/PUT/DELETE /api/admin/educations/{id}
```

## Configuração de produção

Crie um arquivo `.env` na raiz com as variáveis sensíveis:

```env
PORTFOLIO_ADMIN_PASSWORD=sua_senha_forte
POSTGRES_PASSWORD=senha_do_banco
```

E ajuste o `docker-compose.yml` para ler essas variáveis.
