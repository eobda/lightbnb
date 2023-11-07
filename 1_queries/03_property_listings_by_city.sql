SELECT id, title, cost_per_night
FROM properties
WHERE city LIKE '%Vancouver'
ORDER BY cost_per_night
LIMIT 10;