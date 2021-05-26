INSERT INTO biomechweb_data_info (project_id,data_name,framerate)
VALUES ($1,$2,160);

SELECT max(data_id) FROM biomechweb_data_info;