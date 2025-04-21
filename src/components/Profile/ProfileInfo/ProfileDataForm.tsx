import { Form, Formik } from "formik";
import { MyTextareaMUI } from "../../common/FormControls/TextareaMUI";
import { MyCheckboxMUI } from "../../common/FormControls/CheckboxMUI";
import { MyTextInputMUI } from "../../common/FormControls/TextInputMUI";
import { ContactsType, ProfileType } from "../../../types/types";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { getContactIcon } from "./ProfileData";
import { profileValidationSchema } from "../../../utils/validators/validators";

export type ProfileDataFormValuesType = {
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  contacts: Partial<ContactsType>;
};

type PropsType = {
  profile: ProfileType;
  onSubmit: (profile: ProfileDataFormValuesType) => void;
};

const contactDisplayNames: { [key in keyof ProfileType["contacts"]]: string } =
  {
    github: "GitHub",
    vk: "VK",
    facebook: "Facebook",
    instagram: "Instagram",
    twitter: "Twitter",
    website: "Website",
    youtube: "YouTube",
    mainLink: "Telegram",
  };

const ProfileDataForm: React.FC<PropsType> = ({ profile, onSubmit }) => {
  const initialContacts: Partial<ContactsType> = {};
  if (profile.contacts) {
    Object.keys(profile.contacts).forEach((key) => {
      const typedKey = key as keyof ContactsType;
      initialContacts[typedKey] = profile.contacts[typedKey] || "";
    });
  }

  const initialValues: ProfileDataFormValuesType = {
    fullName: profile.fullName || "",
    aboutMe: profile.aboutMe || "",
    lookingForAJob: profile.lookingForAJob || false,
    lookingForAJobDescription: profile.lookingForAJobDescription || "",
    contacts: initialContacts,
  };
  return (
    <Formik<ProfileDataFormValuesType>
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={profileValidationSchema}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Editing profile
            </Typography>
          </Box>
          <Box mb={1} display="flex" alignItems="center">
            <MyTextInputMUI name="fullName" label="Name" type="text" />
          </Box>
          <Box mb={1} display="flex" alignItems="center">
            <MyCheckboxMUI name="lookingForAJob" label="Looking for a job" />
          </Box>
          <Box mb={1} display="flex" flexDirection={"column"}>
            <Typography sx={{ color: "text.disabled", mr: 1 }}>
              About me:
            </Typography>
            <MyTextareaMUI
              name="aboutMe"
              label="About me"
              type="text"
              placeholder="Write about you"
              minRows={2}
              showErrorEmmidiately={true}
            />
          </Box>
          <Box mb={1} display="flex" flexDirection={"column"}>
            <Typography sx={{ color: "text.disabled", mr: 1 }}>
              My professional skills:
            </Typography>
            <MyTextareaMUI
              name="lookingForAJobDescription"
              label="My professional skills"
              type="text"
              placeholder="Enter your professional skills"
              minRows={2}
              showErrorEmmidiately={true}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" alignItems="center" mb={1}>
            <Typography component="h3" sx={{ color: "text.disabled", mr: 1 }}>
              Contacts:
            </Typography>
          </Box>

          <List dense disablePadding>
            {(Object.keys(values.contacts) as Array<keyof ContactsType>).map(
              (key) => (
                <ListItem
                  key={key}
                  sx={{ py: 0.5, display: "flex", alignItems: "center" }}
                >
                  {getContactIcon(key)}
                  <Typography
                    sx={{ fontWeight: 500, mr: 1, color: "text.disabled" }}
                  >
                    {contactDisplayNames[key] || key}:
                  </Typography>
                  <MyTextInputMUI
                    name={`contacts.${key}`}
                    label={key}
                    placeholder={`Enter your ${key}`}
                  />
                </ListItem>
              )
            )}
          </List>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 1 }}
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileDataForm;
