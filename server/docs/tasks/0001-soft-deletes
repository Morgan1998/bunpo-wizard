Implement the whole architecture for a successful soft delete. Make sure it follows privacy laws like Japan's APPI and Europe's GDPR.

Here is a set of hints to help you start this implementation:

1. Anonymize/scramble the user's personal data, such as their email, username, and passwordHash. For example -

- `email` becomes: `deleted_3338937838_morgan@blahblah.local` (We gotta scramble the email here because of the `@unique` constraint, and we end it with .local because we'll likely setup Zod to verify that this column follows the typically `name@domain.extension` format, and as a defensive strategy we ensure that a marketing email or notification isn't going to accidentally be sent to a real person's email despite the fact that our scrambled email is probably not someone's real email... but it's better to be safe than sorry!)
- `username` becomes: `former_wizard_3837`
- `passwordHash` becomes: `"DELETED"`

2. use something like this to clear that user's http-only authentication cookie (because we're using jwt http only cookies):

```javascript
if (user.deletedAt !== null) {
  return res.status(401).json({ error: 'Account deactivated' });
}
```

3. Clean up any pending challenges.

- For any battle/duel where the soft-deleted user was challenger/opponent and the status was `PENDING`, we'll change it to `DECLINED` (or I suppose we could add one more status called `CANCELLED`)

4. Query Filtering. We don't want soft-deleted users showing up in search results when trying to find people for a duel. So for our use cases that involved searching for users, we add this filter to our query:

```prisma
where: {
    deletedAt: null
}
```
