BEGIN;

TRUNCATE
  tournaments
  RESTART IDENTITY CASCADE;

INSERT INTO tournaments (title, date, time, game, fee, address, moreDetails)
VALUES
  ('10 ball extravaganza', '2020-05-16', 11, '9-Ball', 20, '123 main st', 'Non exercitation minim aliquip duis proident officia velit consequat in ex tempor non laboris id.'), 
  ('US Open', '2020-11-1', 12, '8-Ball', 30, '444 W Jackson', 'Amet esse pariatur est aliquip.'), 
  ('Aussie Open', '2022-11-1', 12, '8-Ball', 500, '33 Millions O Peaches', 'Ex proident ex excepteur dolore ullamco id nulla aute culpa.'), 
  ('Some other open', '2021-1-1', 10, 'OnePocket', 50, '124 submain ave', 'Elit minim voluptate non laboris pariatur nostrud mollit.'), 
  ('Mosconi Cup', '2020-1-10', 8, '10-Ball', 75, '14 E ohio St', 'Sint pariatur deserunt sunt fugiat non incididunt Lorem anim irure pariatur enim consequat.'), 
  ('Windy City Open', '2020-12-12', 11, 'Straight', 60, '555 Do Not Call Place', 'Non aliquip occaecat irure exercitation et incididunt.');

COMMIT;