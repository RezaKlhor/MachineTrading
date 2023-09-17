const errors = {
  ERR_SYMBOL_CLOSE: "نماد در این روز بسته می‌باشد.",
  UNKNOWN_ERR: "خطای ناشناخته پیش آمده است لطفا با پشتیبانی تماس بگیرید",
};

function getErrorText(err) {
    const errText = errors[err];
    return errText|| errors.UNKNOWN_ERR;
  
}
module.exports = {
  getErrorText,
};
