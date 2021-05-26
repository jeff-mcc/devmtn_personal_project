--returns the database projects where the name or categories match the search query
--need to test once more data has been inserted into the database
-- SELECT * FROM biomechweb_project_info
-- WHERE title LIKE '%' + $1 + '%' AND (category1 LIKE '%' + $2 + '%' OR category2 LIKE '%' + $2 + '%')
-- ORDER BY title;

SELECT * FROM biomechweb_project_info
WHERE
    CASE
        WHEN ($1 <> '') AND ($2 <> '') THEN lower(title) LIKE concat('%',$1,'%') AND (category1 = $2 OR category2 = $2) 
        WHEN ($1 <> '') THEN lower(title) LIKE concat('%',$1,'%')
        WHEN ($2 <> '') THEN category1 = $2 OR category2 = $2
        ELSE project_id IS NOT NULL
    END
ORDER BY title;

-- IF ($1 <> '' AND $2 <> '') THEN
--     SELECT * FROM biomechweb_project_info
--     WHERE lower(title) LIKE '%' + $1 + '%' AND (category1 = $2 OR category2 = $2)
--     ORDER BY title;
-- ELSIF $1 <> '' THEN
--     SELECT * FROM biomechweb_project_info
--     WHERE title LIKE '%' + $1 + '%'
--     ORDER BY title;
-- ELSE
--     SELECT * FROM biomechweb_project_info
--     WHERE category1 LIKE '%' + $2 + '%' OR category2 LIKE '%' + $2 + '%'
--     ORDER BY title;
-- END IF;

-- DO $$
-- BEGIN
-- IF ('angle' <> '') AND ('Running' <> '') THEN 
--     -- RETURN TABLE
--     SELECT * FROM biomechweb_project_info
--     WHERE lower(title) LIKE '%angle%' AND (category1 = 'Running' OR category2 = 'Running') 
--     ORDER BY title;
-- ELSE
--     -- RETURN TABLE 
--     SELECT * FROM biomechweb_data_info;
-- END IF;
-- END
-- $$