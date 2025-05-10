const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const schoolRoutes = require('./routes/schools'); 

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
