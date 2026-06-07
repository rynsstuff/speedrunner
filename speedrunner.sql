CREATE DATABASE IF NOT EXISTS wspeedrun_auth;
USE wspeedrun_auth;

CREATE TABLE users (
    user_id  VARCHAR(36)  NOT NULL,
    username VARCHAR(55)  NOT NULL,
    email    VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    country  VARCHAR(55)  NOT NULL,
    role     VARCHAR(25)  NOT NULL DEFAULT 'USER',

    PRIMARY KEY (user_id),
    UNIQUE KEY uq_users_email (email)
);




CREATE DATABASE IF NOT EXISTS wspeedrun_game;
USE wspeedrun_game;

CREATE TABLE games (
    game_id     VARCHAR(36)  NOT NULL,
    game_name   VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,

    PRIMARY KEY (game_id)
);

CREATE TABLE run_categories (
    run_category_id   VARCHAR(36)  NOT NULL,
    game_id           VARCHAR(36)  NOT NULL,
    run_category_name VARCHAR(255) NOT NULL,

    PRIMARY KEY (run_category_id),
    CONSTRAINT fk_categories_game
        FOREIGN KEY (game_id)
        REFERENCES games (game_id)
        ON DELETE CASCADE
);


CREATE DATABASE IF NOT EXISTS wspeedrun_runs;
USE wspeedrun_runs;

CREATE TABLE runs (
    run_id          VARCHAR(36)  NOT NULL,
    run_category_id VARCHAR(36)  NOT NULL,
    user_id         VARCHAR(35)  NOT NULL,
    vod_url         VARCHAR(255) NOT NULL,
    run_duration    BIGINT       NOT NULL,
    submitted_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    verified_at     DATETIME     NULL,
    status          VARCHAR(25)  NOT NULL,

    PRIMARY KEY (run_id)
);

CREATE TABLE comments (
    comment_id VARCHAR(36)  NOT NULL,
    run_id     VARCHAR(36)  NOT NULL,
    user_id    VARCHAR(36)  NOT NULL,
    comment    VARCHAR(255) NOT NULL,
    created_at DATETIME     NOT NULL,

    PRIMARY KEY (comment_id)
);
