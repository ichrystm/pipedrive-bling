# Pipedrive - Bling Integration API.
Pipedrive-bling integration API

# Technologies
This API was developed using the following technologies:

- Typescript
- Node.js
- Express
- MongoDB
- Docker

# Installation

1. Install Node.js
2. Install Typescript
3. Install Docker
4. Clone this repo
5. Create a .env file based on .env.example file
6. Setup your api keys on .env file

# How to run
- Docker
  1. Open the project folder
  2. Run "docker-compose up"
  3. The api will be available at 3020 localhost port.

- Local
  1. Open the project folder
  2. Run "npm install"
  3. Run "npm run dev"
  4. The api will be available at 3020 localhost port.

# API informations

- How it works:
This API was developed to find your won deals at Pipedrive CRM, automatically create a order for each of them in Bling ERP and save a report of all orders of the day in a MongoDb document (one report document per day). A Cron job is responsible for getting and dealing with this data at every 1 minute. 

- Logs and errors:
If an error ocurrs, the API will notify you through a log.

# Routes
- GET /orders:
Returns a list of the created orders at Bling ERP (MongoDB database)
  
  Response example:
  ```{
    "orders": [
        {
            "_id": "b80df44c-6236-4c7c-9bcc-67b0ebe4b676",
            "title": "Wonned deals - 2021-12-01",
            "totalAmount": 100,
            "processedAt": "2021-12-01T00:00:00.000Z",
            "providerIdList": [
                4,
                5,
                6,
                7
            ],
            "__v": 0
        }
    ]
}
