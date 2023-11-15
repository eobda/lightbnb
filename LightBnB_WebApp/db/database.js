const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb"
});

/// Users

/**
 * Get a single user from the database given their email.
 */
const getUserWithEmail = function (email) {
  const queryString = `
  SELECT *
  FROM users
  WHERE email LIKE $1;
  `;
  const queryParams = [`%${email}%`];

  return pool.query(queryString, queryParams)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Get a single user from the database given their id.
 */
const getUserWithId = function (id) {
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1;
  `;
  const queryParams = [id];

  return pool.query(queryString, queryParams)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Add a new user to the database.
 */
const addUser = function (user) {
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  const queryParams = [user.name, user.email, user.password];

  return pool.query(queryString, queryParams)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/// Reservations

/**
 * Get all reservations for a single user.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `
  SELECT properties.*, reservations.start_date, reservations.end_date, AVG(property_reviews.rating) AS average_rating
  FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `;
  const queryParams = [guest_id, limit];

  return pool.query(queryString, queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/// Properties

/**
 * Get all properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];

  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // Add "WHERE" to query if any options are present
  if (options.city || options.owner_id || options.minimum_price_per_night || options.maximum_price_per_night) {
    queryString += `WHERE `;
  }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    // Check if there are already queryParams present
    if (queryParams.length > 0) {
      queryString += ` AND `;
    }
    queryParams.push(Number(options.owner_id));
    queryString += `owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    // Check if there are already queryParams present
    if (queryParams.length > 0) {
      queryString += ` AND `;
    }
    queryParams.push(Number(options.minimum_price_per_night * 100));
    queryString += `cost_per_night > $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    // Check if there are already queryParams present
    if (queryParams.length > 0) {
      queryString += ` AND `;
    }
    queryParams.push(Number(options.maximum_price_per_night * 100));
    queryString += `cost_per_night < $${queryParams.length}`;
  }

  queryString += `
  GROUP BY properties.id
  `;

  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Add a property to the database
 */
const addProperty = function (property) {
  const queryParams = [];
  const keys = Object.keys(property);

  let queryString = `
  INSERT INTO properties (
    title,
    description,
    number_of_bedrooms,
    number_of_bathrooms,
    parking_spaces,
    cost_per_night,
    thumbnail_photo_url,
    cover_photo_url,
    street,
    country,
    city,
    province,
    post_code,
    owner_id)
  VALUES (`;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    queryParams.push(property[key]);
    queryString += `$${queryParams.length}`;

    // Add to all values except for final value
    if (i < keys.length - 1) {
      queryString += `, `;
    }
  }

  queryString += `)
  RETURNING *;
  `;

  return pool.query(queryString, queryParams)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });  
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
