import s from "./FormControls.module.css";
import { useField } from "formik";

type PropsType = {
  label?: string
  id?: string
  name: string
  children?: React.ReactNode;
  type?: string
  placeholder?: string
}

export const MyTextInput: React.FC<PropsType> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name} className={s.srOnly}>
        {label}
      </label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyTextarea: React.FC<PropsType> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name} className={s.srOnly}>
        {label}
      </label>
      <textarea {...field} {...props}></textarea>
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyCheckbox: React.FC<PropsType> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <div>
      <label>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
