learn more about conditional spreading, especially in the context of your errorHandler at line 17:

```typescript
...(err.details && { details: err.details }),
```
