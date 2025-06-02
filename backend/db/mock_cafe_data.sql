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
