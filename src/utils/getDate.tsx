export function getCurrentDate(separator = "") {
  let newDate = new Date();

  return newDate.toISOString();
}
