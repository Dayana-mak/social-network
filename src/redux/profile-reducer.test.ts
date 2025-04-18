import profileReducer, { profileActions } from "./profile-reducer";

let state = {
  posts: [
    {id: 1, text:"Hey, why nobody love me?", likesCount: 10, isLiked: false},
    {id: 2, text:"It's our new program! Hey!", likesCount: 20, isLiked: false},
    {id: 3, text:"I'm tired", likesCount: 200, isLiked: false}
  ],
  profile: null,
  status: "",
}
test('length of posts should be incremented after adding', () => {
  let action = profileActions.addPost("New post");

  let newState = profileReducer(state, action);
  
  expect(newState.posts.length).toBe(4)
});