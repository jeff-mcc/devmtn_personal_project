DELETE FROM biomechweb_data
WHERE data_id = $1;

DELETE FROM biomechweb_data_info
WHERE data_id = $1;

SELECT * FROM biomechweb_data d
JOIN biomechweb_data_info i ON d.data_id = i.data_id
WHERE i.project_id = $2
ORDER BY value_id;