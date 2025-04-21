import { TextField } from "@mui/material";
import { useField } from "formik";

export type TextInputPropsType = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  fullWidth?: boolean;
  showErrorImmediately?: boolean;
};

export const MyTextInputMUI: React.FC<TextInputPropsType> = ({
  label, showErrorImmediately, ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      {...field}
      {...props}
      label={label}
      variant="filled"
      size="small"
      error={showErrorImmediately}
      helperText={meta.error}
      fullWidth={props.fullWidth ?? true}
      sx={{
        mb: 2,
        "& .MuiFilledInput-root": {
          borderRadius: 0,
          backgroundColor: "#F1F3F9",
        },
        "& .MuiInputBase-input": {
          fontSize: "0.95rem",
          "::placeholder": {
            color: "#6D6D6D",
            opacity: 1,
          },
        },
        "& .MuiInputLabel-root": {
          color: "#6D6D6D",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "primary.main",
        },
        "& .MuiFormHelperText-root": {
          color: "error.main",
          fontSize: "0.75rem",
        },
      }} />
  );
};
