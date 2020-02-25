import Store from '../stores/Store';
import {comment, STATE} from './comment';
import User from './user';

test('Creating a comment', () => {

  const user = new User('MiguelDP', 1);
  const t = new comment({
    user: user,
    content: 'Ah mah gawd I luv dis book'
  });

  expect(t.user.name).toBe('MiguelDP');
  expect(t.user.id).toBe(1);
  expect(t.content).toBe('Ah mah gawd I luv dis book');

  expect(t.upvotes).toBe(0);
  expect(t.downvotes).toBe(0);
  expect(t.state).toBe(STATE.none);
});

test('Upvoting a comment', () => {
  const t = new comment({
    user: 'Pikachu99',
    userID: 4124,
    content: 'Ah mah gawd I luv dis book'
  });

  t.upvote();
  expect(t.upvotes).toBe(1);
  expect(t.state).toBe(STATE.upvote);
});

test('Downvoting a comment', () => {
  const t = new comment({
    user: 'Pikachu99',
    userID: 4124,
    content: 'Ah mah gawd I luv dis book'
  });

  t.downvote();
  expect(t.downvotes).toBe(1);
  expect(t.state).toBe(STATE.downvote);
});

test('Downvoting then upvoting a comment', () => {
  const t = new comment({
    user: 'Pikachu99',
    userID: 4124,
    content: 'Ah mah gawd I luv dis book'
  });

  t.downvote();
  t.upvote();
  expect(t.downvotes).toBe(0);
  expect(t.upvotes).toBe(1);
  expect(t.state).toBe(STATE.upvote);
});
