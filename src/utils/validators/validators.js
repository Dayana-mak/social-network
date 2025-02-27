import * as Yup from "yup";

/* export const required = (value) => {
  if (value) return undefined;

  return "Это поле обязательно"
}

export const maxLengthConstructor = (maxLength) => (value) => {
    if (value.length > maxLength) return `Максимальная длина ${maxLength} символов`;
    return undefined;
  }
 */
export const requiredField = Yup.string().required("This field is required");
export const validEmail = Yup.string().email("Invalid email address").required("This field is required");

export const maxLengthConstructor = (maxLength) => {
  return Yup.string().max(maxLength, `Max length ${maxLength} symbols`)
}

export const loginValidation = Yup.object({
  email: validEmail,
  password: requiredField,
  captcha: Yup.string().when("$captchaUrl", {
    is: (captchaUrl) => !!captchaUrl,
    then: () => Yup.string().required("This field is required"),
    otherwise: () => Yup.string()
  })
})


