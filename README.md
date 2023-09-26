# Server - node-js 

## Description

This project is a Node.js && Express server that includes user and card routes to display and manage businesses.

The system features user authentication using JSON Web Tokens (JWT) and password encryption using bcrypt.

The server is designed to accommodate three types of users: Admin, Business, and regular (simple) Users,
each with different authorization levels.

## Install


```
git clone https://github.com/davidazulay9573/nodejs-server
```

```
cd nodejs-server
```

```
npm i
```
#### Change the ".env.example" file to ".env" and enter the various variables.
   
### Run in development
```
npm run dev
```
### Run in production
```
npm run prod
```

### Seeding

For seeding the DB with 3 users (regular,business,admin) and 3 cards which are connected to the business user.

```
npm run seed-db
```
### After running seed-db you can log in as admin with the following user:

```
{
    "email":"admin@gmail.com",
    "password":"123456" 
}

```

# Routes

## Connection Route
| No. | URL                  | Method | Authorization | Action                  | Return    |
|-----|----------------------|:------:|---------------|-------------------------|:---------:|
| 1   | `/connection/sign-up`| POST   | All           | User Registration       | User      |
| 2   | `/connection/sign-in`| POST   | All           | User Login              | Token     |


## Users Route

| No. | URL      | Method | Authorization                  | Action                   | Return        |
|-----|----------|:------:|--------------------------------|--------------------------|:-------------:|
| 1   | `/users` | GET    | Business / Admin               | Get all users            | Array of users|
| 2   | `/users/me`    | GET    | Registered User                | Get current user's info  | User          |
| 3   | `/users/:id`   | GET    | Business / Admin / Account Owner| Get user by ID           | User          |
| 4   | `/users/:id`   | PUT    | Admin / Account Owner          | Modify user information  | User          |
| 5   | `/users/:id`   | DELETE | Admin / Account Owner          | Delete user              | Message       |
| 6   | `/users/:id`   | PATCH  | Admin / Account Owner          | Switch account status    | Message       |


## Cards Route


| No. | URL               | Method | Authorization          | Action              | Return        |
|-----|-------------------|:------:|------------------------|---------------------|:-------------:|
| 1   | `/cards`          | GET    | All                    | Get all cards       | Array of cards|
| 2   | `/cards/?user=`   | GET    | All                    | Get user cards      | Array of cards|
| 3   | `/cards/:id`      | GET    | All                    | Get card by ID      | Card          |
| 4   | `/cards`          | POST   | Business / Admin       | Create new card     | Card          |
| 5   | `/cards/:id`      | PUT    | Card Owner             | Edit card           | Card          |
| 6   | `/cards/:id`      | PATCH  | Registered User        | Like or dislike Card| Likes of card |
| 7   | `/cards/:id`      | DELETE | Card Owner / Admin     | Delete Card         | Message       |
| 8   | `/cards/:id`      | POST   | Admin                  | Change card bizNumber| Card         |



### sign-up schema
```
{
    "name":{
        "first":"John",
        "last":"Doe"
    },
    "phone":"0505555555",
    "email":"john@doe.net",
    "password":"123456",
    "isBusiness":true,
    "address":{
        "state":"New York",
        "country":"USA",
        "city":"New York",
        "street":"main",
        "houseNumber":"30"
    }
}

```
### sign-in schema

```
{
    "email":"john@doe.net",
    "password":"123456"
}

```
### Card schema (for add or edit)
```
{
    "title":"My Card Title",
    "subtitle":"My Card subtitle",
    "description":"My Card description",
    "phone":"0505555555",
    "email":"card1@cards.net",
    "web":"https://business.web",
    "address": 
     {
        "state":"New York",
        "country":"USA",
        "city":"New York",
        "street":"Main",
        "houseNumber":"30"
     }
}
```
