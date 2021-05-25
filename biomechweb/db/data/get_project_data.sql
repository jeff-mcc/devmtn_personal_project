SELECT * FROM biomechweb_data d
JOIN biomechweb_data_info i ON d.data_id = i.data_id
WHERE i.project_id = $1
ORDER BY value_id;