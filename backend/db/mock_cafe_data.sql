-- Insert users
INSERT INTO `user` (`email`, `password`, `role`) VALUES
('playce@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('acapus@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('toystories@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('drakofon@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('tokeli@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('rubicon@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('superfly@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('gamerules@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('meeple@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('dicebeans@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('boardland@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('gameon@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('dicetower@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN'),
('tabletopspot@info.com', '$2b$10$u1f6v8F6v8F6v8F6v8F6vOQw1n8F6v8F6v8F6v8F6v8F6v8F6v8F6', 'ADMIN');
-- Insert cafes
INSERT INTO `board_game_cafe` (`name`, `city`, `address`, `phone_number`, `photo`, `user_id`) VALUES
('PLAyCE', 'Αθήνα', 'Β. Λογοθετίδη 14, Αμπελόκ', '2106990753', NULL, (SELECT id FROM user WHERE email='playce@info.com')),
('Acapus', 'Αθήνα', 'Β. Λάσκαου 39 και Αγίου Φα', '2107466573', NULL, (SELECT id FROM user WHERE email='acapus@info.com')),
('Toy Stories', 'Αθήνα', 'Ηροδότου 32, Περιστέρι', '2105780215', NULL, (SELECT id FROM user WHERE email='toystories@info.com')),
('Πανδοχείο του Δρακοφοιν', 'Αθήνα', 'Ηλία Ηλιού 55, Νέος Κόσμο', '2117351742', NULL, (SELECT id FROM user WHERE email='drakofon@info.com')),
('Το Κελί', 'Αθήνα', 'Κλαδά 20, Νέος Κόσμος', '6942639746', NULL, (SELECT id FROM user WHERE email='tokeli@info.com')),
('Rubicon', 'Αθήνα', 'Ορφέως 10-12, Γκάζι', '6972037766', NULL, (SELECT id FROM user WHERE email='rubicon@info.com')),
('Superfly Cafe', 'Αθήνα', 'Εμπεδοκλέους 28, Παγκράτ', '2114040676', NULL, (SELECT id FROM user WHERE email='superfly@info.com')),
('The Game Rules', 'Αθήνα', 'Αίαντος 10, Περιστέρι', '2152151280', NULL, (SELECT id FROM user WHERE email='gamerules@info.com')),
('Meeple Cafe', 'Θεσσαλονίκη', 'Τσιμισκή 45', '2310234567', NULL, (SELECT id FROM user WHERE email='meeple@info.com')),
('Dice & Beans', 'Θεσσαλονίκη', 'Εγνατία 120', '2310765432', NULL, (SELECT id FROM user WHERE email='dicebeans@info.com')),
('Boardland', 'Ηράκλειο', 'Δικαιοσύνης 12', '2810234567', NULL, (SELECT id FROM user WHERE email='boardland@info.com')),
('Game On', 'Λάρισα', 'Κούμα 18', '2410234567', NULL, (SELECT id FROM user WHERE email='gameon@info.com')),
('Dice Tower', 'Βόλος', 'Ιάσονος 50', '2421034567', NULL, (SELECT id FROM user WHERE email='dicetower@info.com')),
('Tabletop Spot', 'Ιωάννινα', 'Αβέρωφ 10', '2651034567', NULL, (SELECT id FROM user WHERE email='tabletopspot@info.com'));
INSERT INTO `board_game_catalog` (board_game_cafe_id, board_game_id) VALUES
-- Cafe 1712705272 (5 games)
(1712705272, 1295772175),
(1712705272, 8412330090),
(1712705272, 7265065835,
(1712705272, 8538354821),
(1712705272, 6879890067),
-- Cafe 2516951514 (4 games)
(2516951514, 9690305415),
(2516951514, 8074794738),
(2516951514, 8403028013),
(2516951514, 2432396317),
-- Cafe 2804582951 (6 games)
(2804582951, 9374892856),
(2804582951, 8232559155),
(2804582951, 8086756108),
(2804582951, 8779887399),
(2804582951, 8515009636),
(2804582951, 9290010454),
-- Cafe 4252398047 (3 games)
(4252398047, 9141839042),
(4252398047, 7769500452),
(4252398047, 7200471695),
-- Cafe 4665915946 (5 games)
(4665915946, 8533033100),
(4665915946, 8412330090),
(4665915946, 7265065835),
(4665915946, 6879890067),
(4665915946, 2432396317),
-- Cafe 4895879771 (4 games)
(4895879771, 1295772175),
(4895879771, 9690305415),
(4895879771, 8074794738),
(4895879771, 8403028013),
-- Cafe 5017046510 (3 games)
(5017046510, 9374892856),
(5017046510, 8232559155),
(5017046510, 8086756108),
-- Cafe 5778725466 (6 games)
(5778725466, 8779887399),
(5778725466, 8515009636),
(5778725466, 9290010454),
(5778725466, 9141839042),
(5778725466, 7769500452),
(5778725466, 7200471695),
-- Cafe 6028474640 (3 games)
(6028474640, 8533033100),
(6028474640, 8412330090),
(6028474640, 7265065835),
-- Cafe 6143222735 (4 games)
(6143222735, 6879890067),
(6143222735, 2432396317),
(6143222735, 1295772175),
(6143222735, 9690305415),
-- Cafe 6671483977 (5 games)
(6671483977, 8074794738),
(6671483977, 8403028013),
(6671483977, 9374892856),
(6671483977, 8232559155),
(6671483977, 8086756108),
-- Cafe 6827682361 (3 games)
(6827682361, 8779887399),
(6827682361, 8515009636),
(6827682361, 9290010454),
-- Cafe 7478102717 (6 games)
(7478102717, 9141839042),
(7478102717, 7769500452),
(7478102717, 7200471695),
(7478102717, 8533033100),
(7478102717, 8412330090),
(7478102717, 7265065835),
-- Cafe 7521632907 (3 games)
(7521632907, 6879890067),
(7521632907, 2432396317),
(7521632907, 1295772175),
-- Cafe 8306280633 (4 games)
(8306280633, 9690305415),
(8306280633, 8074794738),
(8306280633, 8403028013),
(8306280633, 9374892856),
-- Cafe 9185191586 (5 games)
(9185191586, 8232559155),
(9185191586, 8086756108),
(9185191586, 8779887399),
(9185191586, 8515009636),
(9185191586, 9290010454);
