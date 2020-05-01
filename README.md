# GottaLotto-API

Author: [Malek Adair](https://github.com/malekadair)

Live app: [TournEase](https://tournease-client.malekadair.now.sh/)

## 1. What the project does

The project allows users to create and find details on local pool tournaments.

If not logged in, the main page displays a welcome section which explains the app and prompts you to Login.

Once logged in, the main page displays all tournaments and basic details for each tournament posting.

The "create" route will take you to a form to submit your own tournament details. This controlled form includes 7 inputs including a section to include more specific details.

By clicking on or routing to a tournament card, you will be taken to a page that displays full details on that particular tournament.

# SERVER

### Heroku : https://agile-reaches-26051.herokuapp.com/

### Two databases:

1.  tournease
2.  tournease-test

#### The database has two tables:

1. users
2. tournaments

### Endpoints

#### Auth endpoints

    • /api/auth
        •route(/login)
            POST Login

#### Tournaments endpoints

    • /api
        •route(/)
            GET All Tournaments
            POST New Tournament
        •route(/:tourney_id)
            GET Tournament by tourney_id
            DELETE Tournament by tourney_id

## 2. How to run the project

• The entry file is ./src/server.js

## 3. Where to find pieces of configuration or important code

• Migrations configuration is in ./postgrator-config.js
• uses PostgreSQL

## Setting Up

- Install dependencies: `npm install`
- Create development and test databases: `createdb gottalotto`, `createdb gottalotto-test`
- Create database user: `createuser [username]`
- Grant privileges to new user in `psql`:
  - `GRANT ALL PRIVILEGES ON DATABASE gottalotto TO gottalotto`
  - `GRANT ALL PRIVILEGES ON DATABASE "gottalotto-test" TO gottalotto-test`
- Prepare environment file: `cp example.env .env`
- Replace values in `.env` with your custom values.
- Bootstrap development database: `npm run migrate`
- Bootstrap test database: `npm run migrate:test`

### Configuring Postgres

For tests involving time to run properly, your Postgres database must be configured to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   - OS X, Homebrew: `/usr/local/var/postgres/postgresql.conf`
2. Uncomment the `timezone` line and set it to `UTC` as follows:

```

# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default' # Select the set of available time zone

```

## Sample Data

- To seed the database for development: `psql -U [user] -d gottalotto -a -f seeds/seed.gottalotto_tables.sql`
- To clear seed data: `psql -U [user] -d gottalotto -a -f seeds/trunc.gottalotto_tables.sql`

## Scripts

- Start application for development: `npm run dev`
- Run tests: `npm test`
