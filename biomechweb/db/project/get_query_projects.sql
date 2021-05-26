--returns the database projects where the name or categories match the search query
--need to test once more data has been inserted into the database
-- SELECT * FROM biomechweb_project_info
-- WHERE title LIKE '%' + $1 + '%' AND (category1 LIKE '%' + $2 + '%' OR category2 LIKE '%' + $2 + '%')
-- ORDER BY title;

IF $1 <> '' AND $2 <> '' THEN
    SELECT * FROM biomechweb_project_info
    WHERE title LIKE '%' + $1 + '%' AND (category1 LIKE '%' + $2 + '%' OR category2 LIKE '%' + $2 + '%')
    ORDER BY title;
ELSIF $1 <> '' THEN
    SELECT * FROM biomechweb_project_info
    WHERE title LIKE '%' + $1 + '%'
    ORDER BY title;
ELSE
    SELECT * FROM biomechweb_project_info
    WHERE category1 LIKE '%' + $2 + '%' OR category2 LIKE '%' + $2 + '%'
    ORDER BY title;
END IF;