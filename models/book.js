const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isbn: {
    type: String,
    required: true,
    validate: { validator: v => /^[0-9]{3}-[0-9]{5}$/.test(v), message: 'ISBN must be in the format XXX-XXXXX' }
  },
  price: { type: Number, required: true },
  author: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  review: { type: String },
  discount: {
    type: Number,
    default: null,
    validate: {
      validator: function (v) {
        return v >= 0 && v <= 100;
      },
      message: props => `${props.value} is not a valid discount value!`
    },
  },
  deletedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now() }
}, { timestamps: true });

bookSchema.methods.getDiscountedPrice = function () {
  if (this.discount) {
    return this.price - (this.price * (this.discount / 100));
  }
  return null;
}

module.exports = mongoose.model('Book', bookSchema);
