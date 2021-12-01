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
  2. Run "docker-compose up -d"
  3. The api will be available at 3020 localhost port.

- Local
  1. Open the project folder
  2. Run "npm install"
  3. Run "npm run dev"
  4. The api will be available at 3020 localhost port.

# API informations

- How it works:
This API was developed to find your wonned deals at Pipedrive CRM and automatically create a order for each of them in Bling ERP. A Cron job is responsable to get and deal with this data at every 1 minute.

- Logs and errors:
If an error ocurrs, the API will notify you through a log.

# Routes
- GET /orders:
Returns a list of the created orders at Bling ERP (MongoDB database)
  
  Response example:
  ```"orders": [
        {
            "_id": "fedcf6ff-7792-4486-8c8b-07dd99c77bf8",
            "orderId": 15430957180,
            "contactId": 15430957175,
            "code": 4,
            "quantity": 1,
            "unitValue": 0,
            "wonnedAt": "2021-12-01T22:16:07.000Z",
            "__v": 0
        }
    ]
