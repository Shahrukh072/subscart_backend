require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./common/logger.js');
const connectDB = require('./config/db.config.js');
const notesRoutes = require('./routes/orderRoutes.js');
const PORT = process.env.PORT || 4040;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// const Slot = require('./model/Slot.js');
// const timeSlots = [
//   '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
//   '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
//   '05:00 PM', '06:00 PM'
// ];
// Slot.insertMany(timeSlots.map(time => ({ time })))
//   .then(() => console.log('Slots inserted'))
//   .catch(console.error);
 
// Routes
app.use('/api', notesRoutes);


// Start server
app.listen(PORT, () => {
    logger.info(`Server running on port:${PORT}`)
});