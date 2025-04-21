import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

type TextareaPropsType = {
  label?: string;
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  maxRows?: number;
  minRows?: number;
  showErrorEmmidiately?: boolean;
};

export const MyTextareaMUI: React.FC<TextareaPropsType> = ({
  label,
  maxRows = 10,
  minRows = 1,
  showErrorEmmidiately = false,
  ...props
}) => {
  const [field, meta] = useField(props);
  const { submitCount } = useFormikContext();

  const isTouched = meta.touched;
  const hasValue = meta.value?.trim().length > 0;
  const hasError = Boolean(meta.error);
  const isRequiredError = !hasValue && hasError;
  const isLengthError = hasValue && hasError;
  const showError =
    (showErrorEmmidiately && isTouched && hasError) ||
    (isTouched && isLengthError) ||
    (submitCount > 0 && isRequiredError);
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
      helperText={showError ? meta.error : ""}
      sx={{
        bgcolor: "#fff",
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
