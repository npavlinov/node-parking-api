# Prerequisites

To get the project started fastest, you need `Docker` installed. Once installed, navigate to the scripts folder within the root folder and run:

```
docker-compose up
```

This will create a PostgreSQL image, running on port 9998(chosen so that it does not collide with other services that may be running).

> Note: If you don't want to run it through docker and want to use local postgres installation, the configuration within `/database/config/config.json` as well as `/src/app.module.ts` would have to be changed

Once you have the image running, navigate to the root directory and run(in that order):

```
npm run db:migrate
npm run db:seed
```

Other needed software would be `Node.JS`, `NestJS`. For the development of this project node 14.15.4 was used.

# Running the project

Once the database is set up, the project can be started by running:

```
npm start
```

Within the `/misc/` folder are located http files which hold sample requests to the routes that the API exposes.
