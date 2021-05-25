UPDATE biomechweb_users
SET email = $2, first_name = $3, last_name = $4, institution = $5
WHERE user_id = $1;

SELECT * FROM biomechweb_users
WHERE user_id = $1;