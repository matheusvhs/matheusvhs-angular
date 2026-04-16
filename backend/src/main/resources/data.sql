-- Projects
INSERT INTO projects (title, slug, summary, description, tech_stack, github_url, live_url, image_url, featured, created_at, updated_at) VALUES
(
  'Portfolio Website',
  'portfolio-website',
  'Site de portfólio pessoal construído com Spring Boot e Angular para mostrar projetos e artigos.',
  '## Sobre o Projeto

Este portfólio foi construído como projeto de aprendizado de **Spring Boot** e **Angular**.

### Tecnologias
- Backend: Spring Boot 3, Spring Security, Spring Data JPA
- Frontend: Angular 17, Angular Material
- Banco: H2 (dev) / PostgreSQL (prod)
- Infra: Docker Compose

### Como rodar
```bash
# Backend
cd backend && ./mvnw spring-boot:run

# Frontend
cd frontend && ng serve
```',
  'Java,Spring Boot,Angular,PostgreSQL,Docker',
  'https://github.com/exemplo/portfolio',
  NULL,
  NULL,
  true,
  NOW(),
  NOW()
),
(
  'API de Gerenciamento de Tarefas',
  'task-manager-api',
  'API REST para gerenciamento de tarefas com autenticação JWT e notificações em tempo real.',
  '## Task Manager API

Uma API REST completa para gerenciamento de tarefas pessoais e em equipe.

### Funcionalidades
- Autenticação com JWT
- CRUD de tarefas com prioridade e deadline
- Notificações via WebSocket
- Relatórios em PDF

### Stack
- Java 21, Spring Boot 3
- Spring Security + JWT
- PostgreSQL + Flyway
- WebSocket (STOMP)',
  'Java,Spring Boot,JWT,PostgreSQL,WebSocket',
  'https://github.com/exemplo/task-manager',
  NULL,
  NULL,
  true,
  NOW(),
  NOW()
),
(
  'Dashboard de Métricas',
  'metrics-dashboard',
  'Dashboard em tempo real para monitoramento de métricas de aplicações com gráficos interativos.',
  '## Metrics Dashboard

Dashboard para visualização de métricas coletadas via Micrometer e Prometheus.

### Funcionalidades
- Gráficos em tempo real com Chart.js
- Alertas configuráveis por threshold
- Exportação de relatórios
- Múltiplos ambientes (dev/staging/prod)

### Stack
- Angular 17, Chart.js
- Spring Boot + Micrometer
- Prometheus + Grafana',
  'Angular,TypeScript,Chart.js,Spring Boot,Prometheus',
  'https://github.com/exemplo/dashboard',
  NULL,
  NULL,
  false,
  NOW(),
  NOW()
);

-- Articles
INSERT INTO articles (title, slug, summary, content, published, published_at, created_at, updated_at) VALUES
(
  'Começando com Spring Boot: do zero ao REST',
  'comecando-com-spring-boot',
  'Um guia prático para criar sua primeira API REST com Spring Boot 3, cobrindo desde a configuração inicial até deploy.',
  '# Começando com Spring Boot

Spring Boot é um framework que torna muito simples criar aplicações Java prontas para produção.

## O que você vai aprender

- Configurar um projeto Spring Boot do zero
- Criar endpoints REST com `@RestController`
- Conectar ao banco de dados com Spring Data JPA
- Proteger endpoints com Spring Security

## Criando o projeto

O jeito mais fácil é usar o [Spring Initializr](https://start.spring.io):

1. Selecione **Maven Project** e **Java**
2. Adicione as dependências: Web, JPA, H2, Security
3. Clique em **Generate**

## Seu primeiro Controller

```java
@RestController
@RequestMapping("/api/hello")
public class HelloController {

    @GetMapping
    public String hello() {
        return "Olá, Spring Boot!";
    }
}
```

## Conclusão

Spring Boot abstrai toda a complexidade de configuração e deixa você focar no que importa: a lógica de negócio.',
  true,
  NOW(),
  NOW(),
  NOW()
),
(
  'Angular Standalone Components: o novo jeito de criar apps',
  'angular-standalone-components',
  'Como usar standalone components no Angular 17+ para criar aplicações mais simples e sem a necessidade de NgModules.',
  '# Angular Standalone Components

Desde o Angular 14, é possível criar componentes sem depender de `NgModule`. No Angular 17 isso virou o padrão.

## Por que usar?

- Menos boilerplate
- Lazy loading simplificado
- Melhor tree-shaking

## Criando um componente standalone

```typescript
@Component({
  selector: ''app-hello'',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>Olá, {{ name }}!</h1>`
})
export class HelloComponent {
  name = ''Mundo'';
}
```

## Configurando o app

No `app.config.ts`:

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

## Conclusão

Standalone components simplificam muito a estrutura de um app Angular. Se você está começando hoje, já comece com standalone.',
  true,
  NOW(),
  NOW(),
  NOW()
),
(
  'Docker Compose para devs: ambiente local completo em minutos',
  'docker-compose-para-devs',
  'Aprenda a usar Docker Compose para subir um ambiente local completo com banco de dados, backend e frontend com um único comando.',
  '# Docker Compose para Devs

Docker Compose resolve o problema clássico: *"funciona na minha máquina"*.

## O básico

Um arquivo `docker-compose.yml` descreve todos os serviços da sua aplicação:

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    ports:
      - "5432:5432"

  api:
    build: ./backend
    ports:
      - "8080:8080"
    depends_on:
      - db
```

## Comandos essenciais

```bash
# Subir tudo
docker compose up

# Subir em background
docker compose up -d

# Ver logs
docker compose logs -f api

# Parar tudo
docker compose down
```

## Conclusão

Com Docker Compose, qualquer desenvolvedor do time consegue subir o ambiente completo com um único comando. Sem dependências na máquina, sem conflitos de versão.',
  false,
  NULL,
  NOW(),
  NOW()
);

-- Skills
INSERT INTO skills (name, category, level) VALUES
('Java', 'Backend', 5),
('Spring Boot', 'Backend', 4),
('Spring Security', 'Backend', 3),
('PostgreSQL', 'Backend', 4),
('Docker', 'DevOps', 4),
('Git', 'DevOps', 5),
('Angular', 'Frontend', 3),
('TypeScript', 'Frontend', 4),
('HTML/CSS', 'Frontend', 4),
('Linux', 'DevOps', 3);

-- Experiences
INSERT INTO experiences (company, role, start_date, end_date, description) VALUES
(
  'Empresa ABC',
  'Desenvolvedor Backend Java',
  '2023-03-01',
  NULL,
  'Desenvolvimento e manutenção de APIs REST com Spring Boot. Refatoração de sistemas legados para microsserviços. Implantação de CI/CD com GitHub Actions e Docker.'
),
(
  'Startup XYZ',
  'Desenvolvedor Full Stack',
  '2021-06-01',
  '2023-02-28',
  'Desenvolvimento de aplicações web com Angular e Node.js. Criação de dashboards analíticos. Integração com APIs de terceiros e gateways de pagamento.'
),
(
  'Freelancer',
  'Desenvolvedor Web',
  '2020-01-01',
  '2021-05-31',
  'Desenvolvimento de sites e sistemas sob demanda para pequenas empresas. Stack principal: HTML, CSS, JavaScript e PHP.'
);

-- Education
INSERT INTO educations (institution, degree, field, start_year, end_year) VALUES
('Universidade Federal', 'Bacharelado', 'Ciência da Computação', 2017, 2021),
('Alura', 'Certificação', 'Java e Spring Boot', 2022, 2022),
('Udemy', 'Curso', 'Angular - The Complete Guide', 2023, 2023);
