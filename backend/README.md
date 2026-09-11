# Backend Architecture Deprecation

The FastAPI Python backend has been **entirely deprecated**.

## New Architecture

The Equicare system is now a full-stack Next.js application leveraging **Supabase** for the backend.
All backend logic, data fetching, database migrations, and authentication are handled via the Supabase SDK inside the `frontend/` directory (specifically within Next.js Server Actions and API routes).

* **Database:** PostgreSQL (managed via Supabase). See `../supabase/migrations/` for schema definitions.
* **Authentication:** Supabase Auth (replaces Passlib/JWT).
* **Storage:** Supabase Storage.
* **RLS:** Row Level Security policies enforce tenancy isolation (`organization_id`).

This directory remains merely as a tombstone for historical context. Please refer to the `frontend/` directory for all application logic.
