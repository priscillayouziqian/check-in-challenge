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

export const calculateDaysCompleted = (today, start) => {
  const timeDifferenceInMilliseconds = today - start;

  // convert milliseconds in one day
  const millisecondsInOneDay = 1000 * 60 * 60 * 24;

  // how many days completed by difference by milliseconds in one day
  const daysCompleted = Math.floor(timeDifferenceInMilliseconds / millisecondsInOneDay);

  // Ensure the days completed is between 0 and 100
  return Math.min(Math.max(daysCompleted, 0), 100);
};