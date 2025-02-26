import { Form, Formik } from "formik";
import {
  MyCheckbox,
  MyTextarea,
  MyTextInput,
} from "../../common/FormControls/FormControls";
import s from "./ProfileInfo.module.css";

const ProfileDataForm = ({ profile, onSubmit }) => {
  const initialContacts = {};
  if (profile.contacts) {
    Object.keys(profile.contacts).forEach((key) => {
      initialContacts[key] = profile.contacts[key] || "";
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
      <Formik
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

      {/*  <div>
        <h3>Name: {profile.fullName}</h3>
        <p>
          <span className={s.propertyTitle}>Looking for a job:</span>{" "}
          {profile.lookingForAJob}
        </p>
        <p className={s.propertyTitle}>Contacts:</p>
        <ul>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <Contact
                key={key}
                contactTitle={key}
                contactValue={profile.contacts[key]}
              />
            );
          })}
        </ul>
        {isOwner && <button onClick={activateEditMode}>Edit profile</button>}
      </div> */}
    </div>
  );
};

export default ProfileDataForm;
