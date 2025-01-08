export const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateEndDate = (startDate) => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 100);
  return endDate;
}; 