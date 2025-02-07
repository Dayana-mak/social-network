import axios from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": "652b3824-fcfd-42f5-994b-679eaa6e088c"
  }
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => response.data);
  },

  follow(userId) {
    return instance.post(`follow/${userId}`)
      .then(response => response.data)
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`)
      .then(response => response.data)
  }
}

export const profileAPI = {
  getUserProfile(userId) {
    return instance.get(`profile/${userId}`)
      .then(response => response.data);
  },

  getUserStatus(userId) {
    return instance.get(`profile/status/${userId}`)
      .then(response => response.data);
  },

  updateUserStatus(status) {
    return instance.put(`profile/status/`, { status: status })
      .then(response => response.data);
  }
}

export const authAPI = {
  getMe() {
    return instance.get("auth/me")
      .then(response => response.data)
  }
}
