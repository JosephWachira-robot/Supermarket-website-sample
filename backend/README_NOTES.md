Backend quick notes:
- Copy .env.example to .env and fill real values.
- To run locally without docker: ensure PostgreSQL is running and DATABASE_URL points to it.
- To seed DB: psql $DATABASE_URL -f src/seed.sql
