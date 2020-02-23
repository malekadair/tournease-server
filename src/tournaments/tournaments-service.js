const TournamentsService = {
  getAllTournaments(db) {
    return db.from("tournaments").select("*");
  },

  getById(db, id) {
    return TournamentsService.getAllTournaments(db)
      .where("tournaments.id", id)
      .first();
  },
  insertTournament(db, newTournament) {
    return db
      .insert(newTournament)
      .into("tournaments")
      .returning("*")
      .then(([tournament]) => tournament)
      .then(tournament => TournamentsService.getById(db, tournament.id));
  },
  deleteTournament(db, id) {
    return db.where("tournaments.id", id).delete();
  },
  updateTournament(db, id, newTournamentFields) {
    return db.where({ id }).update(newTournamentFields);
  }
};

module.exports = TournamentsService;
