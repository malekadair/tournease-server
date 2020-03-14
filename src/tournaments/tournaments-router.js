const path = require("path");
const express = require("express");
const TournamentsService = require("./tournaments-service");
const jsonBodyParser = express.json();
const xss = require("xss");
const { requireAuth } = require("../middleware/jwt-auth");

const tournamentsRouter = express.Router();

const serializeTournament = tournament => ({
  id: xss(tournament.id),
  title: xss(tournament.title),
  date: xss(tournament.date),
  time: xss(tournament.time),
  game: xss(tournament.game),
  fee: xss(tournament.sfee),
  address: xss(tournament.address),
  moredetails: xss(tournament.moredetails)
});

tournamentsRouter
  .route("/")
  .get((req, res, next) => {
    TournamentsService.getAllTournaments(req.app.get("db"))
      .then(tournaments => {
        res.json(tournaments.map(serializeTournament));
      })
      .catch(next);
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { title, date, time, game, fee, address, moredetails } = req.body;
    const newTournament = {
      title,
      date,
      time,
      game,
      fee,
      address,
      moredetails
    };

    for (const [key, value] of Object.entries(newTournament))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
    TournamentsService.insertTournament(req.app.get("db"), newTournament)
      .then(tournament => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${tournament.id}`))
          .json(tournament);
      })
      .catch(next);
  });

tournamentsRouter
  .route("/:tourney_id")
  .all(requireAuth)
  .all(checkTournamentExists)

  .get((req, res) => {
    res.json(serializeTournament(res.tournament));
  })
  .delete((req, res, next) => {
    res.status(204).end();
  });

async function checkTournamentExists(req, res, next) {
  try {
    const tournament = await TournamentsService.getById(
      req.app.get("db"),
      req.params.tourney_id
    );

    if (!tournament)
      return res.status(404).json({
        error: `Tournament doesn't exist`
      });

    res.tournament = tournament;
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = tournamentsRouter;
