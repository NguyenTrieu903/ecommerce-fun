export const setTitle = (title) => {
  if (typeof title === 'string' && title.trim()) {
    document.title = `${title.trim()} - MegaMart`;
  } else {
    document.title = 'MegaMart - Your One-Stop Shop';
  }
};
