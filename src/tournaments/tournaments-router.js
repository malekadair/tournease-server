const express = require("express");
const TournamentsService = require("./tournaments-service");
const jsonBodyParser = express.json();

const tournamentsRouter = express.Router();

tournamentsRouter
  .route("/")
  .get((req, res, next) => {
    TournamentsService.getAllTournaments(req.app.get("db"))
      .then(tournaments => {
        res.json(tournaments);
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
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
    // newTournament.user_id = req.user.id;
    TournamentsService.insertTournament(req.app.get("db"), newTournament)
      .then(tournament => {
        res
          .status(201)
          // .location(path.posix.join(req.originalUrl, `/${tournament.id}`))
          .json(tournament);
      })
      .catch(next);
  });

tournamentsRouter
  .route("/:tourney_id")
  // .all(requireAuth)
  .all(checkTournamentExists)
  .get((req, res) => {
    res.json(res.tournament);
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
