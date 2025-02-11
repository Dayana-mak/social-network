export const required = (value) => {
  if (value) return undefined;

  return "Это поле обязательно"
}

export const maxLengthConstructor = (maxLength) => (value) => {
    if (value.length > maxLength) return `Максимальная длина ${maxLength} символов`;
    return undefined;
  }
