export function getToday() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const today = `${yyyy}-${mm}-${dd}`;
  return today;
}
