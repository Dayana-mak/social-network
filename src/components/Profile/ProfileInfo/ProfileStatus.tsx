import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Box, TextField, Tooltip, Typography } from "@mui/material";

type PropsType = {
  status: string;
  updateUserStatus: (status: string) => void;
  isOwner: boolean;
};
const ProfileStatus: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    if (props.isOwner) {
      setEditMode(true);
    }
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      deactivateEditMode();
    }
  };

  return (
    <Box
      sx={{
        minHeight: 32,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!editMode && (
        <Tooltip
          title={props.isOwner ? "Double click to edit" : ""}
          placement="right"
          arrow
          slotProps={{
            tooltip: {
              sx: {
                bgcolor: "background.default",
                color: "text.primary",
                px: 2,
                py: 1,
                borderRadius: 1,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"
              },
            },
            arrow: {
              sx: {
                color: "background.default",
              },
            },
          }}
        >
          <Typography
            onDoubleClick={activateEditMode}
            sx={{ cursor: props.isOwner ? "pointer" : "default" }}
          >
            {props.status || "-----"}
          </Typography>
        </Tooltip>
      )}

      {editMode && (
        <TextField
          value={status}
          onChange={onStatusChange}
          onBlur={deactivateEditMode}
          onKeyDown={handleKeyDown}
          autoFocus
          type="text"
          variant="standard"
          fullWidth
          size="small"
          slotProps={{
            input: {
              style: {
                paddingTop: 0,
                paddingBottom: 0,
              },
            },
          }}
        ></TextField>
      )}
    </Box>
  );
};

export default ProfileStatus;
