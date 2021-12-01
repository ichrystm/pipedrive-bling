import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  processedAt: {
    type: Date,
    required: true,
  },
  providerIdList: [{
    type: Number,
    required: true,
  }],
});

export default mongoose.model('Order', orderSchema);
