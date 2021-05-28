DROP TABLE IF EXISTS biomechweb_users;
DROP TABLE IF EXISTS biomechweb_project_info;
DROP TABLE IF EXISTS biomechweb_data_info;
DROP TABLE IF EXISTS biomechweb_data;

CREATE TABLE biomechweb_users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50),
    password VARCHAR(100),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    institution VARCHAR(100)
);

CREATE TABLE biomechweb_project_info (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(1000),
    category1 VARCHAR(30),
    category2 VARCHAR(30),
    owner_id INT REFERENCES biomechweb_users(user_id)
);

CREATE TABLE biomechweb_data_info (
    data_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES biomechweb_project_info(project_id),
    data_name VARCHAR(50),
    framerate INT
);

CREATE TABLE biomechweb_data (
    value_id SERIAL PRIMARY KEY,
    data_id INT REFERENCES biomechweb_data_info(data_id),
    leg_x_p DECIMAL(4,3),
    leg_y_p DECIMAL(4,3),
    leg_x_d DECIMAL(4,3),
    leg_y_d DECIMAL(4,3),
    calc_x_p DECIMAL(4,3),
    calc_y_p DECIMAL(4,3),
    calc_x_d DECIMAL(4,3),
    calc_y_d DECIMAL(4,3)
);

ALTER TABLE biomechweb_data
ADD COLUMN leg_ang DECIMAL(4,1);

ALTER TABLE biomechweb_data
ADD COLUMN calc_ang DECIMAL(4,1);

ALTER TABLE biomechweb_data
ADD COLUMN rf_ang DECIMAL(4,1);