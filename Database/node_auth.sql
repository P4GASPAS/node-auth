CREATE DATABASE node_auth IF NOT EXIST;

CREATE TABLE locations (
    id bigint(20) UNSIGNED NOT NULL,
    address varchar(255) DEFAULT NULL,
    city varchar(255) DEFAULT NULL,
    state varchar(255) DEFAULT NULL,
    postal_code int(11) DEFAULT NULL,
    country varchar(255) DEFAULT NULL,
    province varchar(255) DEFAULT NULL,
    barangay varchar(255) DEFAULT NULL,
    house varchar(255) DEFAULT NULL,
    info_id bigint(20) UNSIGNED NOT NULL UNIQUE,
    created_at timestamp DEFAULT current_timestamp(),
    updated_at timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

CREATE TABLE motorcycles (
    id bigint(20) UNSIGNED NOT NULL,
    name varchar(255) DEFAULT NULL,
    brand varchar(255) DEFAULT NULL,
    model varchar(255) DEFAULT NULL,
    make varchar(255) DEFAULT NULL,
    year varchar(255) DEFAULT NULL,
    user_id bigint(20) UNSIGNED NOT NULL UNIQUE,
    created_at timestamp DEFAULT current_timestamp(),
    updated_at timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

CREATE TABLE githubs (
    id bigint(20) UNSIGNED NOT NULL,
    github_unique_id varchar(255) NOT NULL UNIQUE,
    name varchar(255) NOT NULL,
    twitter_name varchar(255) DEFAULT NULL,
    avatar varchar(255) DEFAULT NULL,
    page_url varchar(255) DEFAULT NULL,
    github_joined_date timestamp NULL DEFAULT NULL,
    user_id bigint(20) UNSIGNED NOT NULL UNIQUE,
    created_at timestamp DEFAULT current_timestamp(),
    updated_at timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

CREATE TABLE facebooks (
    id bigint(20) UNSIGNED NOT NULL,
    facebook_unique_id varchar(255) NOT NULL UNIQUE,
    name varchar(255) NOT NULL,
    avatar_url varchar(255) DEFAULT NULL,
    profile_url varchar(255) DEFAULT NULL,
    user_id bigint(20) UNSIGNED NOT NULL UNIQUE,
    created_at timestamp DEFAULT current_timestamp(),
    updated_at timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

CREATE TABLE googles (
    id bigint(20) UNSIGNED NOT NULL,
    google_unique_id varchar(255) NOT NULL UNIQUE,
    name varchar(255) NOT NULL,
    given_name varchar(255) DEFAULT NULL,
    family_name varchar(255) DEFAULT NULL,
    avatar_url varchar(255) DEFAULT NULL,
    user_id bigint(20) UNSIGNED NOT NULL UNIQUE,
    created_at timestamp DEFAULT current_timestamp(),
    updated_at timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

CREATE TABLE infos (
    id bigint(20) UNSIGNED NOT NULL,
    birthdate date DEFAULT NULL,
    gender varchar(255) DEFAULT NULL,
    contact bigint(20) NOT NULL,
    user_id bigint(20) UNSIGNED NOT NULL UNIQUE,
    created_at timestamp DEFAULT current_timestamp(),
    updated_at timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

CREATE TABLE users (
    id bigint(20) UNSIGNED NOT NULL,
    first_name varchar(255) NOT NULL,
    middle_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    nickname varchar(255) DEFAULT NULL,
    authorization varchar(255) NOT NULL DEFAULT 'customer',
    email varchar(255) NOT NULL UNIQUE,
    email_verified_at timestamp NULL DEFAULT NULL,
    password varchar(255) NOT NULL,
    ip varchar(255) DEFAULT NULL,
    user_agent varchar(255) DEFAULT NULL,
    created_at timestamp DEFAULT current_timestamp(),
    updated_at timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

ALTER TABLE locations ADD PRIMARY KEY (id);
ALTER TABLE motorcycles ADD PRIMARY KEY (id);
ALTER TABLE githubs ADD PRIMARY KEY (id);
ALTER TABLE facebooks ADD PRIMARY KEY (id);
ALTER TABLE googles ADD PRIMARY KEY (id);
ALTER TABLE infos ADD PRIMARY KEY (id);
ALTER TABLE users ADD PRIMARY KEY (id);

ALTER TABLE `locations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100000;

ALTER TABLE `motorcycles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100000;

ALTER TABLE `githubs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100000;

ALTER TABLE `facebooks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100000;

ALTER TABLE `googles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100000;

ALTER TABLE `infos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100000;

ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100000;

ALTER TABLE locations
    ADD CONSTRAINT locations_info_id_foreign
    FOREIGN KEY (info_id) REFERENCES infos (id) ON DELETE CASCADE;

ALTER TABLE infos
    ADD CONSTRAINT infos_user_id_foreign
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE motorcycles
    ADD CONSTRAINT motorcycles_user_id_foreign
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE githubs
    ADD CONSTRAINT githubs_user_id_foreign
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE facebooks
    ADD CONSTRAINT facebooks_user_id_foreign
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE googles
    ADD CONSTRAINT googles_user_id_foreign
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

COMMIT;