import { FormControlLabel, Checkbox } from "@mui/material";
import { useField } from "formik";

type CheckboxPropsType = {
  name: string;
  label: string;
};

export const MyCheckboxMUI: React.FC<CheckboxPropsType> = ({ name, label }) => {
  const [field, meta] = useField({ name, type: "checkbox" });

  return (
    <FormControlLabel
      sx={{ cursor: "pointer" }}
      control={<Checkbox
        {...field}
        checked={field.value}
        sx={{ color: "text.primary" }} />}
      label={label} />
  );
};
