import { ChangeEvent, useEffect, useState } from "react";
import s from "./ProfileInfo.module.css";

type PropsType = {
  status: string
  updateUserStatus: (status: string) => void
  isOwner: boolean
}
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

  return (
    <div>
      {!editMode && (
        <div>
          <p>
            {" "}
            <span className={s.propertyTitle}>Status:</span>{" "}
            <span onDoubleClick={activateEditMode}>
              {props.status || "-----"}
            </span>
          </p>
        </div>
      )}

      {editMode && (
        <div>
          <span className={s.propertyTitle}>Status: </span>
          <input
            onChange={onStatusChange}
            onBlur={deactivateEditMode}
            autoFocus={true}
            type="text"
            value={status}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
