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

export const calculateDaysCompleted = (today, start) => {
  const startDate = typeof start === 'string' ? new Date(start) : start;
  const timeDifferenceInMilliseconds = today - startDate;
  const millisecondsInOneDay = 1000 * 60 * 60 * 24;
  const daysCompleted = Math.floor(timeDifferenceInMilliseconds / millisecondsInOneDay);
  return Math.min(Math.max(daysCompleted, 0), 100);
};