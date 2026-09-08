2026-09-08

Here are the endpoints I've decided on:

POST /api/users (Register)
POST /api/tokens (Create session/login)
DELETE /api/tokens (Destroy session/logout)
GET /api/users?username= (Filter/search users)
POST /api/battles (Create duel)
GET /api/battles (List user's duels)
GET /api/battles/:battleId (Get single duel details)
PATCH /api/battles/:battleId (Update duel status: accept/decline)
POST /api/battles/:battleId/submissions (Submit player translation)

Why: Adheres strictly to REST standards (treating authentication sessions as a /tokens resource, nouns over verbs) and avoids RPC anti-patterns. Before I was mixing and matching REST and RPC, but I realized that staying with REST only is going to be easier on my brain given this is my first big project.
