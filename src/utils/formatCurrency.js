export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatPrice = (price) => {
  if (typeof price !== 'number') {
    return '$0.00';
  }
  return formatCurrency(price);
};
