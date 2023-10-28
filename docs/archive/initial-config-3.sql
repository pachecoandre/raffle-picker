CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `email` varchar(255)
);

CREATE TABLE `user_relationships` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `campaign_id` int,
  `role` enum
);

CREATE TABLE `campaigns` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `estimated_draw_date` datetime,
  `draw_date` datetime,
  `raffle_price` float,
  `created_at` timestamp
);

CREATE TABLE `prizes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `description` varchar(255),
  `imageUrl` varchar(255),
  `campaign_id` int
);

CREATE TABLE `prize_items` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `prize_id` int,
  `raffle_id` int,
  `created_at` timestamp
);

CREATE TABLE `raffles` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `participant_id` int,
  `seller_id` int,
  `date` datetime,
  `campaign_id` int,
  `created_at` timestamp
);

CREATE TABLE `participants` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `phone` varchar(255),
  `email` varchar(255)
);

ALTER TABLE `user_relationships` ADD FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`);

ALTER TABLE `user_relationships` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `prizes` ADD FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`);

ALTER TABLE `prize_items` ADD FOREIGN KEY (`prize_id`) REFERENCES `prizes` (`id`);

ALTER TABLE `prize_items` ADD FOREIGN KEY (`raffle_id`) REFERENCES `raffles` (`id`);

ALTER TABLE `raffles` ADD FOREIGN KEY (`participant_id`) REFERENCES `participants` (`id`);

ALTER TABLE `raffles` ADD FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`);

ALTER TABLE `raffles` ADD FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`);
