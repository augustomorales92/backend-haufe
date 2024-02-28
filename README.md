**BASEURL** : `https://backend-haufe.up.railway.app/`

# Authenticate

**URL** : `/users/login`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "username": "valid name ",
    "password": "valid password"
}
```

**Data example**

```json
{
    "username": "augusto",
    "password": "534123342"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "id": 1,
    "username": "augusto",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhdWd1c3RvIiwiaWF0IjoxNzA5MTI1MzU3LCJleHAiOjE3MDkxMjYyNTd9.pSjMhGVjjczi8bsGWIiMpv8X_UCmGaXfVM4770OP60Q"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination not exist in data base.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "success": false,
    "message": "wrong data",
    "code": "WRONG_DATA"
}
```

# Get characters


**URL** : `/characters/all`

**URL Query Parameters (optional)** : `page=[string] where page is the number of page name=[string] where name is the character name if the user want to filter`

**URL including optional parameters** : `/characters/all?page=2&name=rick`

**Method** : `GET`

**Auth required** : YES


## Success Response

**Code** : `200 OK`

**Content examples**


```json
  {
    "info": {
        "count": 826,
        "pages": 42,
        "next": "https://rickandmortyapi.com/api/character?page=2",
        "prev": null
    },
    "results": [
        {
            "id": 1,
            "name": "Rick Sanchez",
            "status": "Alive",
            "species": "Human",
            "type": "",
            "gender": "Male",
            "origin": {
                "name": "Earth (C-137)",
                "url": "https://rickandmortyapi.com/api/location/1"
            },
            "location": {
                "name": "Citadel of Ricks",
                "url": "https://rickandmortyapi.com/api/location/3"
            },
            "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            "episode": [
                "https://rickandmortyapi.com/api/episode/1",
                "https://rickandmortyapi.com/api/episode/2",
                "https://rickandmortyapi.com/api/episode/3",
                "https://rickandmortyapi.com/api/episode/4",
                "https://rickandmortyapi.com/api/episode/5",
                "https://rickandmortyapi.com/api/episode/6",
                "https://rickandmortyapi.com/api/episode/7",
                "https://rickandmortyapi.com/api/episode/8",
                "https://rickandmortyapi.com/api/episode/9",
                "https://rickandmortyapi.com/api/episode/10",
                "https://rickandmortyapi.com/api/episode/11",
                "https://rickandmortyapi.com/api/episode/12",
                "https://rickandmortyapi.com/api/episode/13",
                "https://rickandmortyapi.com/api/episode/14",
                "https://rickandmortyapi.com/api/episode/15",
                "https://rickandmortyapi.com/api/episode/16",
                "https://rickandmortyapi.com/api/episode/17",
                "https://rickandmortyapi.com/api/episode/18",
                "https://rickandmortyapi.com/api/episode/19",
                "https://rickandmortyapi.com/api/episode/20",
                "https://rickandmortyapi.com/api/episode/21",
                "https://rickandmortyapi.com/api/episode/22",
                "https://rickandmortyapi.com/api/episode/23",
                "https://rickandmortyapi.com/api/episode/24",
                "https://rickandmortyapi.com/api/episode/25",
                "https://rickandmortyapi.com/api/episode/26",
                "https://rickandmortyapi.com/api/episode/27",
                "https://rickandmortyapi.com/api/episode/28",
                "https://rickandmortyapi.com/api/episode/29",
                "https://rickandmortyapi.com/api/episode/30",
                "https://rickandmortyapi.com/api/episode/31",
                "https://rickandmortyapi.com/api/episode/32",
                "https://rickandmortyapi.com/api/episode/33",
                "https://rickandmortyapi.com/api/episode/34",
                "https://rickandmortyapi.com/api/episode/35",
                "https://rickandmortyapi.com/api/episode/36",
                "https://rickandmortyapi.com/api/episode/37",
                "https://rickandmortyapi.com/api/episode/38",
                "https://rickandmortyapi.com/api/episode/39",
                "https://rickandmortyapi.com/api/episode/40",
                "https://rickandmortyapi.com/api/episode/41",
                "https://rickandmortyapi.com/api/episode/42",
                "https://rickandmortyapi.com/api/episode/43",
                "https://rickandmortyapi.com/api/episode/44",
                "https://rickandmortyapi.com/api/episode/45",
                "https://rickandmortyapi.com/api/episode/46",
                "https://rickandmortyapi.com/api/episode/47",
                "https://rickandmortyapi.com/api/episode/48",
                "https://rickandmortyapi.com/api/episode/49",
                "https://rickandmortyapi.com/api/episode/50",
                "https://rickandmortyapi.com/api/episode/51"
            ],
            "url": "https://rickandmortyapi.com/api/character/1",
            "created": "2017-11-04T18:48:46.250Z",
            "isFav": true
        },...
    ]},
```


# Handle Favorites


**URL** : `/favorites/add`


**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
    "favoriteId": "valid id ",
}
```


**Content example**

```json
{
    "favoriteId": 1
}
```

## Success Response

**Code** : `200 OK`



**URL** : `/favorites/remove/:favoriteId`

**URL Parameters** : `favoriteId=[string] is the id of favorite`

**Method** : `DELETE`

**Auth required** : YES


## Success Response

**Code** : `200 OK`


**URL** : `/policies/client/:policyNumber`

**URL Parameters** : `policyNumber=[string] where policyNumber is the id of policy`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : `[admin]`

TODO: should add rest of endpoints 