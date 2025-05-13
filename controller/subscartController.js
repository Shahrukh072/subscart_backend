const Order = require('../model/Order');
const Slot = require('../model/Slot');
const errorHandler = require("../common/error.module")

exports.createOrder = async (req, res) => {
  try {
    const { customerName, phone, date, time } = req.body;

    if (!customerName || !phone || !date || !time) {
      return errorHandler.badRequest(res, 'All fields are required.');
    }

    // Check if this customer already booked this time slot on the same date
    const duplicateBooking = await Order.findOne({ phone, date, time });
    if (duplicateBooking) {
      return errorHandler.badRequest(res, 'You have already booked this slot on this date.');
    }

    const newOrder = new Order({ customerName, phone, date, time });
    await newOrder.save();

    return errorHandler.sendOk(res, 'Order placed successfully', newOrder);
  } catch (err) {
    return errorHandler.serviceError(res, 'Server error', err.message);
  }
};

exports.availableSlots = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return errorHandler.badRequest(res, 'Date is required');
    }

    const allSlots = await Slot.find();

    const bookedOrders = await Order.find({ date });
    const bookedTimes = bookedOrders.map(order => order.time);

    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot.time));

    return errorHandler.sendOk(res, 'Available slots fetched successfully', { date, availableSlots });
  } catch (err) {
    return errorHandler.serviceError(res, 'Server error', err.message);
  }
};

exports.rescheduleOrder = async (req, res) => {
  const { orderId, newDate, newTime } = req.body;

  if (!orderId || !newDate || !newTime) {
    return errorHandler.badRequest(res, 'orderId, newDate, and newTime are required.');
  }

  try {
    const currentOrder = await Order.findById(orderId);
    if (!currentOrder) {
      return errorHandler.notFound(res, 'Order not found');
    }

    const duplicate = await Order.findOne({
      _id: { $ne: orderId },
      phone: currentOrder.phone,
      date: newDate,
      time: newTime,
    });

    if (duplicate) {
      return errorHandler.badRequest(res, 'You have already booked this slot.');
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { date: newDate, time: newTime },
      { new: true }
    );

    return errorHandler.sendOk(res, 'Order rescheduled successfully', updatedOrder);
  } catch (error) {
    return errorHandler.serviceError(res, 'Server error', error.message);
  }
};





