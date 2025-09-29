# Sistema de Reservas de Salas (Next.js + NestJS + Prisma)

Aplicação full stack para reservas de horários de salas de aula, com:
- Frontend: Next.js (TypeScript, App Router, Tailwind)
- Backend: NestJS (TypeScript)
- Banco: Prisma ORM (SQLite local; Postgres para produção)
- Funcionalidades: Autenticação (JWT), CRUD de Salas e Reservas, verificação de conflitos e disponibilidade.

## Estrutura do projeto
- `frontend/` – Next.js
- `backend/` – NestJS + Prisma

## Pré-requisitos
- Node.js 18+
- Opcional para Postgres local: Docker (se quiser usar docker-compose)

## Execução local (rápida com SQLite)
> O backend já está configurado para SQLite local (`backend/.env -> DATABASE_URL="file:./dev.db"`).

1) Instalar dependências
```bash
# na raiz do projeto
cd backend && npm i && cd ..
cd frontend && npm i && cd ..
```

2) Gerar Prisma Client e migrar o banco
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed   # cria usuário admin e sala
cd ..
```

3) Rodar os servidores
```bash
# em 2 terminais
cd backend && npm run start:dev
cd frontend && npm run dev
```
- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Ajuste `frontend/.env.local` se necessário:
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Execução local com Postgres (opcional)
1) Ajuste o `.env` do backend para Postgres e crie o docker-compose
```bash
# backend/.env (exemplo)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/reservations?schema=public"
JWT_SECRET="devsecret"
PORT=4000
```

2) Suba Postgres (se tiver Docker)
```bash
docker compose up -d db
```

3) Migre e rode
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

## Teste rápido
- Registre: POST `http://localhost:4000/auth/register` { email, name, password }
- Login: POST `http://localhost:4000/auth/login` -> token
- Use o token (Bearer) em: `GET /rooms`, `POST /rooms`, `POST /reservations`, etc.

---

## Deploy na Railway
A Railway facilita subir o Backend (NestJS) e o Frontend (Next.js) e um Postgres gerenciado.

### 1) Criar Postgres
- Crie um projeto na Railway e adicione o plugin de Postgres.
- Copie a `DATABASE_URL` fornecida (formato `postgresql://...`).

### 2) Backend (NestJS)
- Opcional: crie o serviço a partir do repositório (GitHub) apontando para a pasta `backend/`.
- Variáveis de ambiente no serviço Backend:
  - `DATABASE_URL` = (a do Postgres da Railway)
  - `JWT_SECRET` = um segredo forte
  - `PORT` = 4000
- Build & Start (Railway detecta Node automaticamente). Caso precise, defina:
  - Build command: `npm ci && npx prisma generate && npm run build`
  - Start command: `node dist/main.js`
- Após o deploy, abra um Shell no serviço Backend e rode a migração:
```bash
npx prisma migrate deploy
# (Opcional) seed se desejado:
node -e "require('ts-node/register'); require('./prisma/seed.ts');"
```
  - Se preferir, crie um script `npm run prisma:deploy` que execute o `prisma migrate deploy`.

### 3) Frontend (Next.js)
- Crie outro serviço apontando para `frontend/`.
- Variáveis de ambiente no serviço Frontend:
  - `NEXT_PUBLIC_API_URL` = URL pública do serviço Backend Railway (ex.: `https://seu-backend.up.railway.app`)
- Build command: `npm ci && npm run build`
- Start command: `npm start`

### 4) CORS
- O backend já inicia com CORS liberado (`main.ts`), mas se precisar restringir domínios, ajuste ao criar a aplicação Nest:
```ts
const app = await NestFactory.create(AppModule, { cors: { origin: ['https://seu-frontend.up.railway.app'] }});
```

### 5) Verificação pós-deploy
- Teste `POST /auth/register` e `POST /auth/login` no backend publicado.
- Abra o frontend publicado e autentique-se; depois liste salas e crie reservas.

---

## Dicas
- Produção: use Postgres (Prisma datasource `postgresql`) e `prisma migrate deploy`.
- Logs e debug: use os logs da Railway por serviço.
- Segurança: armazene `JWT_SECRET` como variável de ambiente segura.

## Licença
MIT