-- UPDATE biomechweb_data AS d SET
--     leg_ang = n.leg_ang,
--     calc_ang = n.calc_ang,
--     rf_ang = n.rf_ang
-- FROM (VALUES ($1,$2,$3,$4)
-- ) AS n(value_id,leg_ang,calc_ang,rf_ang)
-- WHERE n.value_id = d.value_id;

UPDATE biomechweb_data
SET leg_ang = $2, calc_ang = $3, rf_ang = $4
WHERE value_id = $1;

SELECT * FROM biomechweb_data
WHERE value_id = $1;

-- update test as t set
--     column_a = c.column_a,
--     column_c = c.column_c
-- from (values
--     ('123', 1, '---'),
--     ('345', 2, '+++')  
-- ) as c(column_b, column_a, column_c) 
-- where c.column_b = t.column_b;