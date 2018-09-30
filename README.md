# stocks

ReMap Stocks Microservice

## Create Stock

```http
curl / -H "Authorization: Bearer ${TOKEN}" -d '{ "restaurant_id": "'${ID}'" }'

HTTP/1.1 201 Created
Location: /5b7fb6144add9091c4396d1a
```

## Get list

```http
curl "/?page=2&per_page=10" -H "Authorization: Bearer ${TOKEN}"

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 345

[
  {
    "id": "5b8365e75c7c8105811b780b",
    "restaurant_id": "7173578",
    "created_at": "2018-08-27T02:45:59.712Z",
    "updated_at": "2018-08-27T02:45:59.712Z"
  },
  {
    "id": "5b8365a35c7c8105811b780a",
    "restaurant_id": "J001160574",
    "created_at": "2018-08-27T02:44:51.629Z",
    "updated_at": "2018-08-27T02:44:51.629Z"
  }
]
```

### Get list by Restaurant Ids

```http
curl "/?restaurant_ids=J901099785,3398249,g841301" -H "Authorization: Bearer ${TOKEN}"

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 515

[
  {
    "id": "5bb0da78476eb81d84337dda",
    "restaurant_id": "3398249",
    "created_at": "2018-09-30T14:15:20.883Z",
    "updated_at": "2018-09-30T14:15:20.883Z"
  },
  {
    "id": "5bae2d6eb3d504eb325ce835",
    "restaurant_id": "g841301",
    "created_at": "2018-09-28T13:32:30.051Z",
    "updated_at": "2018-09-28T13:32:30.051Z"
  },
  {
    "id": "5b8c009ce4579ff67eac64cc",
    "restaurant_id": "J901099785",
    "created_at": "2018-09-02T15:24:12.790Z",
    "updated_at": "2018-09-02T15:24:12.790Z"
  }
]
```

## Get by ID

```http
curl /:id -H "Authorization: Bearer ${TOKEN}"

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 156

{
  "id": "5b8365e75c7c8105811b780b",
  "restaurant_id": "7173578",
  "created_at": "2018-08-27T02:45:59.712Z",
  "updated_at": "2018-08-27T02:45:59.712Z"
}
```

## Delete by ID

```http
curl /:id -XDELETE -H "Authorization: Bearer ${TOKEN}"

HTTP/1.1 204 No Content
```
