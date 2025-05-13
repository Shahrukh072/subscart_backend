const express = require('express');
const router = express.Router();
const {
  createOrder, availableSlots, rescheduleOrder, 
} = require('../controller/subscartController');

router.post('/order', createOrder);
router.get('/availableSlots', availableSlots);
router.post('/nextAvaailbleSlot', rescheduleOrder);

module.exports = router;
