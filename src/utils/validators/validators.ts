import * as Yup from "yup";

export const requiredField = Yup.string().required("This field is required");

export const validEmail = Yup.string()
  .email("Invalid email address")
  .required("This field is required");

export const maxLength = (limit: number) =>
  Yup.string().max(limit, `Max length ${limit} characters`);

export const loginValidationSchema = Yup.object({
  email: validEmail,
  password: requiredField,
  captcha: Yup.string().when("$captchaUrl", {
    is: (captchaUrl: any) => Boolean(captchaUrl),
    then: () => Yup.string().required("This field is required"),
    otherwise: () => Yup.string(),
  }),
});

export const profileValidationSchema = Yup.object({
  fullName: requiredField,
  aboutMe: requiredField,
  lookingForAJob: Yup.boolean(),
  lookingForAJobDescription: requiredField,
  contacts: Yup.object().shape({
    github: Yup.string().url("Invalid URL").nullable(),
    vk: Yup.string().url("Invalid URL").nullable(),
    facebook: Yup.string().url("Invalid URL").nullable(),
    instagram: Yup.string().url("Invalid URL").nullable(),
    twitter: Yup.string().url("Invalid URL").nullable(),
    website: Yup.string().url("Invalid URL").nullable(),
    youtube: Yup.string().url("Invalid URL").nullable(),
    mainLink: Yup.string().url("Invalid URL").nullable(),
  }),
});