const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentMethods = {
  values: ['COD', 'Card', 'Paytm'],
  message: 'enum validator failed for payment Methods'
}
const orderSchema = new Schema(
  {
    products: { type: [Schema.Types.Mixed], required: true },
    totalPrice: { type: Number },
    totalItemsInCart: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, default: 'pending' },
    status: { type: String, default: 'pending' },
    selectedAddress: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const virtual = orderSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Order = mongoose.model('Order', orderSchema);