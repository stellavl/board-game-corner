INSERT INTO registered_user (first_name, last_name, email, password, phone_number) VALUES
('Stella', 'Vlassi', 'stella.vlassi@example.com', 'password123', '6912345678')

INSERT INTO board_game_cafe (name, city, address, phone_number, email, password, photo) VALUES
('Cafe A', 'City A', '123 Main St', '1234567890', 'cafeA@example.com', 'cafePassword1', 'photoA.jpg'),
('Cafe B', 'City B', '456 Elm St', '9876543210', 'cafeB@example.com', 'cafePassword2', 'photoB.jpg');

INSERT INTO board_game (name) VALUES
('Board Game 1'),
('Board Game 2');

INSERT INTO reservation (date, time, players_no, customer_first_name, customer_last_name, customer_email, customer_phone, status, board_game_id, board_game_cafe_id, registered_user_id) VALUES
('2023-10-01', '18:00:00', 4, 'John', 'Doe', 'john.doe@example.com', '1234567890', 'confirmed', 1, 1, NULL),
('2023-10-02', '19:00:00', 2, 'Jane', 'Smith', 'jane.smith@example.com', '9876543210', 'pending', 2, 2, null);

INSERT INTO user_board_game_list (is_favorite, is_have_played, is_want_to_play, reg_user_id, board_game_id) VALUES
(true, true, false, 1, 1),
(false, true, true, 1, 2),
(true, false, false, 2, 1);

INSERT INTO review (stars, description, created_on, board_game_id, reg_user_id) VALUES
(5, 'Great game!', NOW(), 1, 1),
(4, 'Enjoyed it a lot!', NOW(), 2, 2);

INSERT INTO board_game_catalog (board_game_id, board_game_cafe_id) VALUES
(1, 1),
(2, 2);