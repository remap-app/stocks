# stocks

ReMap Stocks Microservice

## Create Stock

```http
curl / \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{
    "restaurant_id: "'${ID}'"
  }'
```

## Get List

```http
curl / -H "Authorization: Bearer ${TOKEN}"
```

## Get By ID

```http
curl /:id -H "Authorization: Bearer ${TOKEN}"
```

## Delete By ID

```http
curl /:id -XDELETE -H "Authorization: Bearer ${TOKEN}"
```
