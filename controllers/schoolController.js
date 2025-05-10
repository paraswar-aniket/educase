const db = require('../config/db');

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; 
  const toRad = (val) => (val * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || !latitude || !longitude)
    return res.status(400).json({ message: 'All fields are required.' });

  try {
    await db.promise().query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: 'School added successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding school', error: err.message });
  }
};

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude)
    return res.status(400).json({ message: 'Latitude and longitude are required.' });

  try {
    const [schools] = await db.promise().query('SELECT * FROM schools');
    const sorted = schools
      .map((school) => ({
        ...school,
        distance: calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          school.latitude,
          school.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (err) {
    res.status(500).json({ message: 'Error listing schools', error: err.message });
  }
};
