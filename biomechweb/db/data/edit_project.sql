UPDATE biomechweb_project_info
SET title = $2, description = $3, category1 = $4, category2 = $5
WHERE project_id = $1;

SELECT * FROM biomechweb_project_info
WHERE project_id = $1;