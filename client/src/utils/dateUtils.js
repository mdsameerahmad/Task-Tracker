export const formatDateDisplay = (dateString) => {
  if (!dateString) return 'Not set';
  const date = new Date(dateString);
  if (Number.isNaN(date.valueOf())) return 'Invalid date';
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.valueOf())) return '';
  return date.toISOString().split('T')[0];
};
