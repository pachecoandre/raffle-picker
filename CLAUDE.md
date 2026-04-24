# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (hot-reload via nodemon + ts-node)
npm run dev

# Build TypeScript to dist/
npm run build

# Run compiled output
npm run start

# Start MySQL via Docker (required for local dev)
docker-compose up mysqldb

# Start full stack (MySQL + Node app)
docker-compose up
```

There are no tests configured (`npm test` exits with an error).

## Environment Variables

Copy `.env.exemple` to `.env`. Required vars:

| Variable | Description |
|---|---|
| `PORT` | HTTP port (default 3000) |
| `MYSQL_HOST` | MySQL host |
| `MYSQL_USER` | MySQL user |
| `MYSQL_PASS` | MySQL password |
| `MYSQL_DB` | Database name (`raffle_picker`) |
| `MYSQL_CONN_LIMIT` | Connection pool size (default 20) |
| `CLIENT_ID` | Google OAuth2 client ID |

The JWT private key is hardcoded in [src/common/contants.ts](src/common/contants.ts) — it is not environment-driven.

## Architecture

Express + TypeScript REST API backed by MySQL 8.0. All routes are prefixed `/v1`.

**Request flow:** `index.ts` → `Server` class → router → module routes → controllers → models

**Module structure** — each domain module under `src/modules/<name>/` has:
- `routes.ts` — Express router + middleware wiring
- `controllers.ts` — request/response handling
- `model.ts` — raw SQL queries via mysql2 promise pool
- `service.ts` (where business logic is non-trivial, e.g. campaign, users)

**Auth:** Google OAuth2 token → verified by `google-auth-library` → user upserted → JWT issued. All `/v1/campaigns` routes require a `Bearer <jwt>` header enforced by `authMiddleware` in [src/server/middlewares.ts](src/server/middlewares.ts).

**Campaign access control:** `attachCampaign` middleware validates that `user_relationships` contains a row linking the authenticated user to the requested campaign before any campaign-scoped route proceeds.

## Database Schema

MySQL database `raffle_picker`. Key tables and relationships:

- `users` — registered users (created on first Google login)
- `campaigns` — raffle campaigns with pricing and draw dates
- `user_relationships` — links users to campaigns with a role (`admin`, `seller`, `participant`)
- `raffles` — individual raffle tickets; each belongs to a participant, a seller, and a campaign
- `participants` — people who bought raffle tickets (name, phone, email)
- `prizes` — prizes within a campaign; each prize has multiple `prize_items`
- `prize_items` — join table between prizes and raffles; `raffle_id` is NULL until a draw assigns a winner

Schema DDL is in [dbinit/init.sql](dbinit/init.sql) and is auto-applied when the MySQL Docker container initialises.

## Draw Logic

`POST /v1/campaigns/:id/draw` triggers [src/modules/campaign/service.ts](src/modules/campaign/service.ts) `drawService`, which:
1. Fetches all unassigned prize IDs and all raffle IDs for the campaign.
2. Randomly picks a raffle for each prize (sampling without replacement via `splice`).
3. Updates `prize_items.raffle_id` in bulk and sets `campaigns.draw_date`.

Requires at least as many raffles as prizes; silently no-ops otherwise.

## Route Map

```
POST   /v1/users/login                        # Google token → JWT
GET    /v1/campaigns                          # List user's campaigns (admin role)
POST   /v1/campaigns                          # Create campaign
GET    /v1/campaigns/:id                      # Campaign detail + stats
PATCH  /v1/campaigns/:id                      # Update name/dates
POST   /v1/campaigns/:id/draw                 # Run random draw
GET    /v1/campaigns/:id/draw                 # Get draw results
GET    /v1/campaigns/:id/prizes               # List prizes
POST   /v1/campaigns/:id/prizes               # Add prize
PATCH  /v1/campaigns/:id/prizes/:prizeId      # Update prize
DELETE /v1/campaigns/:id/prizes/:prizeId      # Delete prize
GET    /v1/campaigns/:id/raffles              # List raffle tickets (paginated)
POST   /v1/campaigns/:id/raffles              # Add raffle ticket
DELETE /v1/campaigns/:id/raffles/:raffleId    # Delete raffle ticket
```
