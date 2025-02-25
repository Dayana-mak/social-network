import { Form, Formik, useField} from "formik";
import s from "./news.module.css";
import * as Yup from "yup";

function News(props) {
  const validation = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("This field is required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("This field is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("This field is required"),
    jobType: Yup.string()
      .oneOf(
        ["designer", "development", "product", "other"],
        "Invalid Job Type"
      )
      .required("This field is required"),
    acceptedTerms: Yup.boolean()
      .required("This field is required")
      .oneOf([true], "You must accept the terms and conditions."),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={s.error}>{meta.error}</div>
        ) : null}
      </>
    );
  };

  const MyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "checkbox" });

    return (
      <div>
        <label className="checkboxInput">
          <input type="checkbox" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className={s.error}>{meta.error}</div>
        ) : null}
      </div>
    );
  };

  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props}></select>
        {meta.touched && meta.error ? (
          <div className={s.error}>{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          jobType: "",
          acceptedTerms: false,
        }}
        validationSchema={validation}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, resetForm, values }) => (
          <Form className={s.testForm}>
            <MyTextInput
              label="firstName"
              name="firstName"
              type="text"
              placeholder="Jane"
            />

            <MyTextInput
              label="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
            />

            <MyTextInput
              label="email"
              name="email"
              type="email"
              placeholder="example.gmail.com"
            />

            <MySelect label="Job Type" name="jobType">
              <option value="">Select a job type</option>
              <option value="designer">Designer</option>
              <option value="development">Developer</option>
              <option value="product">Product Manager</option>
              <option value="other">Other</option>
            </MySelect>

            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <button type="reset" onClick={resetForm}>
              Reset
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default News;

/* const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "This fiels is required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }

    if (!values.lastName) {
      errors.lastName = "This fiels is required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }

    if (!values.email) {
      errors.email = "This fiels is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  }; */
