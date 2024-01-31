export const formatDate = (date: string) => {
  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(date));
};

export default {};
