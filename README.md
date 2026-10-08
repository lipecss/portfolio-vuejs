# felipecss.com

Portfólio em Nuxt 3 (estrutura `app/` do Nuxt 4 via `future.compatibilityVersion: 4`).
Home "arcade" com o minigame Bug Invaders; posts, projetos e dashboard usam Mongo + Supabase.

## Rodar

```bash
yarn install
yarn dev        # http://localhost:3000
yarn build      # servidor Nitro (Vercel)
```

## Variáveis de ambiente (`.env`)

| Variável | Uso |
| --- | --- |
| `CONNECTION_STRING` | URI do MongoDB Atlas (o banco é `portfolio-api`; pode ser trocado com `MONGODB_DB`) |
| `SUPABASE_URL`, `SUPABASE_KEY` | login do dashboard |
| `SUPABASE_JWT_SECRET` | validação do token nas APIs de escrita |
| `PUSHER_APP_ID`, `PUSHER_APP_KEY`, `PUSHER_APP_SECRET`, `PUSHER_APP_CLUSTER` | likes em tempo real |
| `NUXT_BASE_URL` | URL base usada nas metas |
| `NUXT_PUBLIC_CONTACT_EMAIL` | e-mail exibido na seção de contato |

Em dev o servidor força DNS público (1.1.1.1/8.8.8.8) porque resolvedores locais que recusam
consultas SRV quebram o `mongodb+srv://` (`querySrv ECONNREFUSED`).
