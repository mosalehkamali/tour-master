const { default: mongoose } = require("mongoose");
require("./Tour");
require("./Receipt");

const CompanionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  personalId: {
    type: Number,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  // هر فیلد اضافی دیگر برای همراه
});

const CartItemSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  companions: {
    type: [CompanionSchema],
    default: [],
  },
  // در صورت نیاز می‌توانید قیمت‌شمار یا وضعیت انتخابی را هم اینجا اضافه کنید
  quantity: {
    type: Number,
    default: 1, // معمولاً 1 به‌ازای خود خریدار؛ اگر می‌خواهید فقط همراه‌ها اینجا باشند، این فیلد را حذف کنید
  },
});

const TravelerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  personalId: {
    type: Number,
    required: true,
    unique: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  // اگر نیاز دارید تورهای رزروشده‌ی قبلی را نگه دارید
  tours: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
  }],

  // رسیدهای پرداختی
  receipts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receipt",
  }],

  // سبد خرید فعلی: هر آیتم شامل تور + آرایه همراهان
  carts: {
    type: [CartItemSchema],
    default: [],
  },
}, {
  timestamps: true,
});

const Traveler = mongoose.models.Traveler || mongoose.model("Traveler", TravelerSchema);
module.exports = Traveler;
