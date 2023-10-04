# API - Food Explorer
### The App
This is the backend code of the application Food Explorer that simulates a food delivery service. You can access it as a customer, who can search and add dishes to order, or as administrator, who can add new dishes or modify existing ones.
### Steps
1. Clone this repository;
2. Run your preferred command to install dependencies:
- `npm install`
- `yarn install` or `yarn`
3. Run the database migrations:
`npx knex migrate:latest`
4. Run the server with:
- `npm run dev`
- `yarn run dev` or `yarn dev`
5. Create a `.env` file like the one in the example and add your **PORT** and your **AUTH_SECRET**.
   [Frontend Repo](https://github.com/arthurrios/food-explorer-web)
## How to use:
### As Admin:
1. Log with the admin account:
- Email: admin@email.com
- Password: admin123
2. Experiment creating new dishes;
3. Experiment editing existing dishes;
### As Customer:
1. Create your account;
2. Log with your account:
3. Experiment searching for the dishes you created as admin;
4. Experiment adding dishes to order;
5. Experiment removing dishes from your order;
6. Finally make your order!