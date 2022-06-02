export function validationEmail(email) {
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validation.test(email);
}

export function validatePassword(password) {
  const numberMinimum = 6;
  return password.length >= numberMinimum - 1;
}
