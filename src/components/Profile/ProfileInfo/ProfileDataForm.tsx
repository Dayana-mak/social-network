import { Form, Formik } from "formik";
import {
  MyCheckbox,
  MyTextarea,
  MyTextInput,
} from "../../common/FormControls/FormControls";
import s from "./ProfileInfo.module.css";
import { ContactsType, ProfileType } from "../../../types/types";

type ValuesType = {
  fullName: string,
  aboutMe: string,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  contacts: Partial<ContactsType>,
}

type PropsType = {
  profile: ProfileType
  onSubmit: (values: ValuesType) => void
}
const ProfileDataForm: React.FC<PropsType> = ({ profile, onSubmit }) => {
  const initialContacts: Partial<ContactsType> = {};
  if (profile.contacts) {
    Object.keys(profile.contacts).forEach((key) => {
      const typedKey = key as keyof ContactsType 
      initialContacts[typedKey] = profile.contacts[typedKey] || "";
    });
  }

  const initialValues = {
    fullName: profile.fullName || "",
    aboutMe: profile.aboutMe || "",
    lookingForAJob: profile.lookingForAJob || false,
    lookingForAJobDescription: profile.lookingForAJobDescription || "",
    contacts: initialContacts,
  };
  return (
    <div>
      <Formik<ValuesType>
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values }) => (
          <Form className={s.formWrapper}>
            <div className={s.formPropertyWrapper}>
              <span className={s.propertyTitle}>Name:</span>
              <MyTextInput
                label="fullName"
                name="fullName"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className={s.formPropertyWrapper}>
              <span className={s.propertyTitle}>About me</span>
              <MyTextarea
                label="About me"
                name="aboutMe"
                type="text"
                placeholder="About me"
              />
            </div>
            <div className={s.formPropertyWrapper}>
              <span className={s.propertyTitle}>Looking for a job:</span>
              <MyCheckbox name="lookingForAJob"></MyCheckbox>
            </div>
            <div className={s.formPropertyWrapper}>
              <span className={s.propertyTitle}>My professional skills:</span>
              <MyTextarea
                label="My professional skills"
                name="lookingForAJobDescription"
                type="text"
                placeholder="Enter your professional skills"
              />
            </div>
            <div>
              <span className={s.propertyTitle}>Contacts:</span>
              <ul>
                {Object.keys(values.contacts).map((key) => (
                  <li
                    key={key}
                    className={`${s.formPropertyWrapper} ${s.formContactsWrapper}`}
                  >
                    <span className={s.propertyTitle}>{key}:</span>
                    <MyTextInput
                      label={key}
                      name={`contacts.${key}`}
                      type="text"
                      placeholder={`Enter your ${key}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileDataForm;
