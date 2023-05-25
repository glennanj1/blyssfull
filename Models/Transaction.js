const mongoose = require('mongoose');

const captureSchema = new mongoose.Schema({
  id: String,
  status: String,
  amount: {
    currency_code: String,
    value: String
  },
  final_capture: Boolean,
  seller_protection: {
    status: String,
    dispute_categories: [String]
  },
  create_time: Date,
  update_time: Date
});

const shippingAddressSchema = new mongoose.Schema({
  address_line_1: String,
  admin_area_2: String,
  admin_area_1: String,
  postal_code: String,
  country_code: String
});

const purchaseUnitSchema = new mongoose.Schema({
  reference_id: String,
  amount: {
    currency_code: String,
    value: String
  },
  payee: {
    email_address: String,
    merchant_id: String
  },
  soft_descriptor: String,
  shipping: {
    name: {
      full_name: String
    },
    address: shippingAddressSchema
  },
  payments: {
    captures: [captureSchema]
  }
});

const payerSchema = new mongoose.Schema({
  name: {
    given_name: String,
    surname: String
  },
  email_address: String,
  payer_id: String,
  address: {
    country_code: String
  }
});

const linkSchema = new mongoose.Schema({
  href: String,
  rel: String,
  method: String
});

const transactionSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  intent: String,
  status: String,
  purchase_units: [purchaseUnitSchema],
  payer: payerSchema,
  create_time: Date,
  update_time: Date,
  links: [linkSchema],
  date: Date,
  desc: String,
  userId: String,
  meetLink: String,
  calendarLink: String

}, {timestamps: true});

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
