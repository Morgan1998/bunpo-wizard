2026-09-09

## Required + Soft Deletes

1. For our battles, I had to decide between making opponentId and challengerId required via `String` or not required via `String?`.

- The problem with **required** is that we have to set onDelete to Cascade, which means a user apart of that battle deleting their account will result in that battle being deleted. That would suck because the other user that didn't delete their account wouldn't be able to see the battle in their history anymore. BUT it'd make our code way cleaner because challenger.username or opponent.username will always be guaranteed to be a string, so we wouldn't have to use a bunch of `?.` checks all around our code.
- The problem with **not required** is, well, what I just said in the above sentence. However, I'd make it so our battles never get deleted since onDelete would just be set to SetNull instead of Cascade, which would tear down the whole battle.

### So what's my final solution? For now, I'll try `Soft Deletes`!

I've read that soft deletes are great for this scenario. Instead of running `DELETE FROM users` via prisma, we'd just do `deletedAt = new Date()`.
