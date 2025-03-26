exports.validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  exports.validateAmount = (amount) => {
    return !isNaN(amount) && amount >= 100; // Minimum 100 pesewas (1 GHS)
  };