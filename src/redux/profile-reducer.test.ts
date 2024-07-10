import profileReducer, { actions } from './profile-reducer';

let state = {
  posts: [
    {
      text: "Hi,it's my first post",
      id: 1,
      likesCount: 11,
      img:
        'https://i.pinimg.com/originals/80/e5/0d/80e50d775e936217f89af2de58ba7646.jpg',
    },
    {
      text: "It's cool",
      id: 2,
      likesCount: 12,
      img:
        'https://i.pinimg.com/originals/53/f9/8a/53f98a6b76f60356b2b4c261963377e6.jpg',
    },
  ],
  profile: null,
  status: '',
};

it('Тест на удаление поста', () => {
  let action = actions.deletePost(1);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(1);
});
