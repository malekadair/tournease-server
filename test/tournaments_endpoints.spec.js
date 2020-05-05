const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Tournaments Endpoints', function () {
  let db

  const {
    testUsers,
    testTournaments,
  } = helpers.makeTournamentsFixtures()

  before('make knex instance for testing', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/`, () => {
    context(`Given no tournaments`, () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/')
          .expect(200, [])
      })
    })
    context('Given there are tournaments in the database', () => {
      beforeEach('insert tournaments', () => {
        helpers.seedTournamentsTables(
          db,
          testUsers,
          testTournaments
        )
      })

      it('responds with 200 and list of tournaments', () => {
        return supertest(app)
          .get('/api/')
          .expect(200)
      })
    })
  })
  describe(`POST /api/`, () => {
    context(`Post new tournament`, () => {
      beforeEach('insert tournaments', () => {
        helpers.seedTournamentsTables(
          db,
          testUsers,
          testTournaments,
        )
      })
      const newTournament = {
        title: "happy tournament",
        date: '2020-05-16',
        time: 10,
        game: "9-Ball",
        fee: 20,
        address: "123 superte st.",
        moredetails: "Labore et fugiat est commodo in eu consequat officia elit."
      }
      it('responds with 201 and list of tournaments', () => {
        return supertest(app)
          .post('/api/')
          .send(newTournament)
          .expect(201)
      })
    })
  })
  describe(`GET /api/:tourney_id`, () => {
    context(`Get tournament by ID`, () => {
      beforeEach('insert tournaments', () => {
        helpers.seedTournamentsTables(
          db,
          testUsers,
          testTournaments,
        )
      })
      it('responds with tournament', () => {
        return supertest(app)
          .get('/api/2')
          .expect(404)
      })
    })
  })
})
