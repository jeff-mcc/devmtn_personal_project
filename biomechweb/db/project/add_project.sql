INSERT INTO biomechweb_project_info (title,description,category1,category2,owner_id)
VALUES ($1,$2,$3,$4,$5)
RETURNING *;

-- SELECT * FROM biomechweb_project_info
-- WHERE project_id = max(project_id);