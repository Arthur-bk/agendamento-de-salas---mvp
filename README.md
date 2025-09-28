- Backend: NestJS + Prisma (Postgres) com JWT, CRUD de Salas e Reservas.
- Frontend: Next.js (App Router + Tailwind), páginas de Login/Registro, lista de Salas e Reserva.
- Docker: `docker compose up -d --build`, migrar Prisma, (opcional) seed.

Comandos:
- Backend:
  - cp backend/.env.example backend/.env
  - cd backend && npm i && npm run prisma:generate && npm run prisma:migrate && npm run start:dev
- Frontend:
  - cp frontend/.env.local.example frontend/.env.local
  - cd frontend && npm i && npm run dev