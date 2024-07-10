import React from 'react';
import { PostType } from '../../../types/types';
import AddPostForm, { AddPostFormValuesType } from './AddPostForm/AddPostForm';

import Post from './Post/Post';
 export type MapPropsType = {
  posts: Array<PostType>;
};
export type DispatchPropsType = {
  addPost: (newPostText: string) => void;
  deletePost: (id: number) => void;
};
const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  let postsElements = props.posts.map((post) => (
    <Post
      key={post.id}
      idPost={post.id}
      img={post.img}
      message={post.text}
      onDeletePost={props.deletePost}
    />
  ));
  let onAddPost = (value: AddPostFormValuesType) => {
    props.addPost(value.newPostText);
  };

  return (
    <div>
      <div>
        <AddPostForm onSubmit={onAddPost} />
      </div>
      {postsElements.reverse()}
    </div>
  );
};

export default MyPosts;
