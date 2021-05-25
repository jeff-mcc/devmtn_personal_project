--returns the database projects where the name or categories match the search query
--need to test once more data has been inserted into the database
SELECT * FROM biomechweb_project_info
WHERE title LIKE '%' + $1 + '%' OR category1 LIKE '%' + $1 + '%' OR category2 LIKE '%' + $1 + '%'
ORDER BY title;