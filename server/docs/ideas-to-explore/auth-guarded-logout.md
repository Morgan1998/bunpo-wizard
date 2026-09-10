I learned that guarding a logout endpoint is not exactly a good idea unless I want to eventually integrate one of these:

1. Token Blacklisting / Revocation
2. Database Session / Refresh Token Deletion (this is the dual-token system thing you've read about)

So yea, I won't look into doing this stuff now, but maybe later, especially the dual token system.
