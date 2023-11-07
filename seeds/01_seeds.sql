INSERT INTO users (name, email, password)
VALUES ('Diluc Ragnvindr', 'example@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kaeya Alberich', 'example+2@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Jean Gunnhildr', 'example+3@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Dawn Winery', 'description', 'https://images.pexels.com/photos/943700/pexels-photo-943700.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/943700/pexels-photo-943700.jpeg', 300, 2, 3, 4, 'Canada', '290 John St E', 'Niagara-on-the-Lake', 'Ontario', 'L0S 1J0', true),
(3, 'Knights of Favonius Headquarters', 'description', 'https://images.pexels.com/photos/5273517/pexels-photo-5273517.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/5273517/pexels-photo-5273517.jpeg', 100, 5, 4, 10, 'Canada', '1 Cote de la Citadelle', 'Quebec City', 'Quebec', 'G1R 3R2', true),
(3, 'Goth Grand Hotel', 'description', 'https://images.pexels.com/photos/5122670/pexels-photo-5122670.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/5122670/pexels-photo-5122670.jpeg', 500, 24, 14, 25, 'Canada', '1 Rideau St', 'Ottawa', 'Ontario', 'K1N 8S7', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2020-09-28', '2020-10-01', 1, 2),
('2019-01-04', '2019-02-01', 2, 1),
('2023-10-01', '2023-10-14', 2, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 1, 1, 5, 'message'),
(1, 2, 2, 2, 'message'),
(2, 2, 3, 4, 'message');