import User from './User';
import {Comment} from './comment.js';
import Store from '../stores/Store';


test('Create a new user', () => {
  const user = new User({name: 'testuser', id: '5dawda-312dfw-fewft23'});
  expect(user.name).toBe('testuser');
  expect(user.id).toBe('5dawda-312dfw-fewft23');
});

test('Checking a user liked comments', () => {

  const usr = new User({name: 'testuser', id: '5dawda-312dfw-fewft23'});
  const store = new Store(usr);
  
  store.setAdditionField("title", 'test');
  store.setAdditionField("release", '2020-02-28');
  store.setAdditionField("isbn", '1111');
  store.addbookPost();
  const t = new Comment({user: usr, content: 'tetete'});
  store.bookPosts[0].comments.push(t);
  store.bookPosts[0].comments[0].upvote(store.user);
  t.upvote(usr);
  expect(store.user.interactedComments[0]).toBe(t);
});