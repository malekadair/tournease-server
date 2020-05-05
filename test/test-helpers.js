const bcrypt = require("bcryptjs");

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "test-user-1",
      full_name: "Test user 1",
      full_name: "TU1",
      password: "password",
      date_created: "2029-01-22T16:28:32.615Z"
    },
    {
      id: 2,
      user_name: "test-user-2",
      full_name: "Test user 2",
      full_name: "TU2",
      password: "password",
      date_created: "2029-01-22T16:28:32.615Z"
    },
    {
      id: 3,
      user_name: "test-user-3",
      full_name: "Test user 3",
      full_name: "TU3",
      password: "password",
      date_created: "2029-01-22T16:28:32.615Z"
    },
    {
      id: 4,
      user_name: "test-user-4",
      full_name: "Test user 4",
      full_name: "TU4",
      password: "password",
      date_created: "2029-01-22T16:28:32.615Z"
    }
  ];
}

function makeTournamentsArray() {
  return [
    {
      title: "test tourney 1",
      date: "2029-01-22T16:28:32.615Z",
      time: 12,
      game: "9-Ball",
      fee: 20,
      address: "123 main street",
      moredetails:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?"
    },
    {
      title: "test tourney 1",
      date: "2029-01-22T16:28:32.615Z",
      time: 2,
      game: "9-Ball",
      fee: 20,
      address: "125 main street",
      moredetails:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?"
    },
    {
      title: "test tourney 1",
      date: "2029-01-22T16:28:32.615Z",
      time: 1,
      game: "8-Ball",
      fee: 10,
      address: "123 submain street",
      moredetails:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?"
    },
    {
      title: "test tourney 1",
      date: "2029-01-22T16:28:32.615Z",
      time: 10,
      game: "10-Ball",
      fee: 30,
      address: "123 main street",
      moredetails:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?"
    }
  ];
}

function makeTournamentsFixtures() {
  const testUsers = makeUsersArray();
  const testTournaments = makeTournamentsArray();
  return { testUsers, testTournaments };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      users,
      tournaments
      RESTART IDENTITY CASCADE`
  );
}

function seedTournamentsTables(db, users, tournaments = []) {
  return db
    .into("users")
    .insert(users)
    .then(() => db.into("tournaments").insert(tournaments))
}



module.exports = {
  makeUsersArray,
  makeTournamentsArray,
  makeTournamentsFixtures,
  cleanTables,
  seedTournamentsTables,
};
