export const formatDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateEndDate = (startDate) => {
  const dateObj = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const endDate = new Date(dateObj);
  endDate.setDate(endDate.getDate() + 100);
  return endDate;
};