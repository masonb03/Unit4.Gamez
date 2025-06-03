-- Insert platforms (10 records)
INSERT INTO platforms (name, manufacturer) VALUES
  ('PlayStation 5', 'Sony'),
  ('Xbox Series X', 'Microsoft'),
  ('Nintendo Switch', 'Nintendo'),
  ('PC', 'Various'),
  ('PlayStation 4', 'Sony'),
  ('Xbox One', 'Microsoft'),
  ('Nintendo Wii U', 'Nintendo'),
  ('PlayStation 3', 'Sony'),
  ('Xbox 360', 'Microsoft'),
  ('Nintendo 3DS', 'Nintendo');

-- Insert games (10 records)
INSERT INTO games (title, genre, release_year, platform_id) VALUES
  ('Spider-Man: Miles Morales', 'Action-Adventure', '2020-11-12', 1),
  ('Halo Infinite', 'First-Person Shooter', '2021-12-08', 2),
  ('The Legend of Zelda: Breath of the Wild', 'Action-Adventure', '2017-03-03', 3),
  ('Cyberpunk 2077', 'RPG', '2020-12-10', 4),
  ('God of War', 'Action', '2018-04-20', 5),
  ('Gears 5', 'Third-Person Shooter', '2019-09-10', 6),
  ('Splatoon 2', 'Third-Person Shooter', '2017-07-21', 3),
  ('The Last of Us Part II', 'Action-Adventure', '2020-06-19', 1),
  ('Forza Horizon 4', 'Racing', '2018-10-02', 2),
  ('Super Mario 3D Land', 'Platformer', '2011-11-13', 10);
