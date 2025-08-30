```bash
curl -X POST http://localhost:9001/ \
  -H "Content-Type: application/json" \
  -d '{"query":"query { updateMissingDays(input: { month: 8, year: 2025 }) { success datesMissing } }"}'
```
