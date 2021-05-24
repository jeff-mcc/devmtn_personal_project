INSERT INTO biomechweb_users (email,password,first_name,last_name,institution)
VALUES ($1,$2,$3,$4,$5) RETURNING *;