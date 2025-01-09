export const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateEndDate = (startDate) => {
  //create a date object from startDate, ensure any changes won't affect original date passed in.
  const endDate = new Date(startDate);
  //JS Date object method setDate. Calculate the end date we need.
  endDate.setDate(endDate.getDate() + 100);
  return endDate;
}; 