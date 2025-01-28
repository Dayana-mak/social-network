import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

function MyPostsContainer(props) {
  const state = props.store.getState();

  const addPost= () => {
    props.store.dispatch(addPostActionCreator());
  }

  const updateNewPostText = (text) => {
    //const text = newPostElement.current.value;
    props.store.dispatch(updateNewPostTextActionCreator(text));
  }

  return (
    <MyPosts addPost={addPost}
             updateNewPostText={updateNewPostText}
             posts={state.profilePage.posts}
             newPostText={state.profilePage.newPostText}/>
  );
}

export default MyPostsContainer;