# ApplyDigitalTest

ApplyDigitalTest is a Monorepo project built with NestJS that includes an API for authentication, retrieving product data, and manipulating information (such as deleting products).

Additionally, the project contains a microservice responsible for managing a CronJob that updates product information every hour via a request to Contentful.

Both applications are dockerized along with the necessary database to persist the information.

## Running the Application Locally

To run the application locally, you need to have Docker installed and configure the `.env` file at the root of the project with the following variables:

```
CORE_API_PORT=3000
CORE_CRON_PORT=3001

AUTH_JWT_SECRET=my_jwt_super_secret

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=postgres
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_MIGRATIONS_RUN=false

CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_ENVIRONMENT=
CONTENTFUL_CONTENT_TYPE=
```

It is important to set the values for the Contentful variables (`CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_ENVIRONMENT`, `CONTENTFUL_CONTENT_TYPE`).

Once the `.env` file is set up, run the following command:

```
docker-compose up -d
```

This will start two containers: one for the PostgreSQL database and another for the application (API + microservice).

## Consuming the API Locally

If everything has been set up as specified earlier, the API will be available at the following URL:

[http://localhost:3000](http://localhost:3000)

To explore and consume the API endpoints, you can use the Swagger UI hosted at:

[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

Alternatively, for more flexibility, I recommend using the Postman collection located at the root of the project: `applydigitaltest.postman_collection.json`.

## First Steps

1. **Force Data Fetch from Contentful**

   To begin, you can force the data fetch from Contentful by making a request to the following endpoint:

   ```
   GET /contentful
   ```

   This will trigger a request to Contentful and update the product data.

2. **Obtain an Authentication Token**

   To access the endpoints of the reporting module, you first need to obtain a token by making a request to:

   ```
   GET /auth
   ```

   This will return an authentication token that you will need to include in the headers of subsequent requests to the reporting endpoints.

## Notes

- **CronJob in Application Instance**

  It is not recommended to include a CronJob within an application instance, as it could lead to blocking issues if the logic grows and becomes more complex. Additionally, it may result in multiple executions of the job if a multi-instance approach is used for performance scaling.

  For these reasons, it's advisable to separate CronJobs into a dedicated service or process to ensure better scalability and avoid potential issues. I recommend using AWS services specifically designed for such tasks, such as EventBridge, SQS, and Lambdas.

- **Authentication and Typing Considerations**

  Due to the scope of this project, many aspects have been simplified. However, I recommend implementing a more robust authentication system, as well as a more comprehensive typing approach for better maintainability, scalability, and security in production environments.

- **Error Handling**

  To keep the project simple, error handling has been omitted. In a production-grade system, it is essential to implement proper error handling to manage unexpected conditions, such as failed API calls, database errors, and invalid user input. I suggest using a global error handler for the application, implementing proper HTTP status codes, and ensuring that all errors are logged and monitored for easier debugging and system reliability.
