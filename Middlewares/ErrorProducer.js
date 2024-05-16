const errors = {
  ERR_SYMBOL_CLOSE: "نماد در این روز بسته می‌باشد.",
  UNKNOWN_ERR: "خطای ناشناخته پیش آمده است لطفا با پشتیبانی تماس بگیرید",
  REPEATED_STOCK: "ارز انتخاب شده در لیست مورد علاقه‌ها موجود می‌باشد",
};

function getErrorText(err) {
  const errText = errors[err];
  return errText || errors.UNKNOWN_ERR;
}
function isErrorExists(err) {
  const errText = errors[err];
  return errText;
}
module.exports = {
  getErrorText,
  isErrorExists,
};
