let Validator = {
  validateEmail: (email) => {
    if (typeof email === "string" && email.length < 6) {
      return false;
    }
    let regexp = /^[\w|\d][-a-z\d.+]{1,19}@[-_?=/+*'&%$!.\w\d]{1,15}\.\w{1,5}$/i;
    return regexp.test(email);
  },

  validatePhone: (phone) => {
    if (typeof phone === "string" && phone.length < 10) {
      return false;
    }
    let regexp = /^(-|\s)*(\+38)?(-|\s)*\(?((-|\s)*\d){3}\)?((-|\s)*\d){7}(-|\s)*$/;
    return regexp.test(phone);
  },

  validatePassword: (password) => {
    if (typeof password === "string" && password.length < 8) {
      return false;
    }
    let regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\d]+$/;
    return regexp.test(password);
  },
};
