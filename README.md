# stocks

ReMap Stocks Microservice

## Create Stock

```http
curl / \
  -H "Authorization: Bearer ${TOKEN}" \
  -d '{
    "restaurant_id": "'${ID}'"
  }'

HTTP/1.1 201 Created
Location: /5b7fb6144add9091c4396d1a
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
