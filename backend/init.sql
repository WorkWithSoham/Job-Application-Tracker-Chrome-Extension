-- CREATE SCHEMA
DROP SCHEMA IF EXISTS jobext CASCADE;
CREATE SCHEMA jobext;

-- CREATE TABLE
DROP TABLE IF EXISTS jobext.user;
CREATE TABLE jobext.user
(
    user_id    SERIAL PRIMARY KEY,
    first_name CHAR(50) NOT NULL,
    last_name  CHAR(50) NOT NULL,
    email VARCHAR(200) NOT NULL
);

-- CREATE TYPE
DROP TYPE IF EXISTS jobext.status;
CREATE TYPE jobext.status AS ENUM (
    'INTERVIEW',
    'OFFER',
    'REJECT',
    'WISHLIST',
    'APPLIED'
);

-- CREATE TABLE
DROP TABLE IF EXISTS jobext.application;
CREATE TABLE jobext.application
(
    app_id    SERIAL PRIMARY KEY,
    user_id   INT     NOT NULL,
    company   VARCHAR NOT NULL,
    app_date  DATE,
    status    jobext.status,
    pos VARCHAR NOT NULL,
    loc VARCHAR,
    jd TEXT,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES jobext.user (user_id)
);