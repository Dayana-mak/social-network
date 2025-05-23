export type PhotosType = {
  small: string | null
  large: string | null
}

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  aboutMe: string
  photos: PhotosType
}

export type ContactsType = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}

export type UserType = {
  id: number
  name: string
  status: string
  photos: PhotosType
  followed: boolean
}
export type DialogType = {
  id: number;
  name: string;
  avatar: string;
  messages: MessageType[]
};

export type MessageType = {
  id: number;
  text: string;
  fromMe: boolean;
  date: string;
};

export type PostType = {
  id: number;
  text: string;
  likesCount: number;
  isLiked: boolean;
};