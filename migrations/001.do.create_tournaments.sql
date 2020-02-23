DROP TYPE IF EXISTS game_type;
CREATE TYPE game_type AS ENUM('8-Ball','9-Ball','10-Ball','Straight','OnePocket');
	
CREATE TABLE tournaments (
  id SERIAL PRIMARY KEY,
  title VARCHAR(120),
  date TIMESTAMP DEFAULT now() NOT NULL,
  time VARCHAR(15),
	game game_type,
	fee INT,
	address VARCHAR(120),
	moredetails VARCHAR(500)
)