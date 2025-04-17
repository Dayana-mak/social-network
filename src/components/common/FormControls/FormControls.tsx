import { TextField } from "@mui/material";
import s from "./FormControls.module.css";
import { useField, useFormikContext } from "formik";

type PropsType = {
  label?: string;
  id?: string;
  name: string;
  children?: React.ReactNode;
  type?: string;
  placeholder?: string;
  showErrorImmediately?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
};

export const MyTextInput: React.FC<PropsType> = ({
  label,
  showErrorImmediately,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name} className={s.srOnly}>
        {label}
      </label>
      <input {...field} {...props} />
      {(showErrorImmediately || meta.touched) && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyTextarea: React.FC<PropsType> = ({
  label,
  showErrorImmediately,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name} className={s.srOnly}>
        {label}
      </label>
      <textarea {...field} {...props}></textarea>
      {(showErrorImmediately || meta.touched) && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyTextareaMUI: React.FC<PropsType> = ({
  label,
  showErrorImmediately,
  maxRows = 10,
  minRows = 1,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { submitCount } = useFormikContext();
  const showError =
    (meta.touched && meta.value.length > 0 && meta.error) || // ошибка длины — сразу
    (submitCount > 0 && meta.value.trim().length === 0 && meta.error); // required — только после submit

  return (
    <TextField
      {...field}
      {...props}
      multiline
      maxRows={maxRows}
      minRows={minRows}
      fullWidth
      variant="outlined"
      size="small"
      error={Boolean(showError)}
      helperText={showError || ""}
      sx={{
        bgcolor: "#fff", // белый фон
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          borderRadius: 1,
        },
        "& .MuiInputBase-input": {
          fontSize: "0.95rem",
          color: "text.primary",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "#6D6D6D",
          opacity: 1,
        },
      }}
    />
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
