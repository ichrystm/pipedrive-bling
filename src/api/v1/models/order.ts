import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  orderId: {
    type: Number,
    required: true,
  },
  contactId: {
    type: Number,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitValue: {
    type: Number,
    required: true,
  },
  wonnedAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Order', orderSchema);
