import React from 'react';
import { addPost, updateNewPostText} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      dispatch(updateNewPostText(text));
    },
    addPost: () => {
      dispatch(addPost());
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;

/* function MyPostsContainer(props) {
  const state = props.store.getState();

  const addPost= () => {
    props.store.dispatch(addPostActionCreator());
  }

  const updateNewPostText = (text) => {
    props.store.dispatch(updateNewPostTextActionCreator(text));
  }

  return (
    <MyPosts addPost={addPost}
             updateNewPostText={updateNewPostText}
             posts={state.profilePage.posts}
             newPostText={state.profilePage.newPostText}/>
  );
}
 */
