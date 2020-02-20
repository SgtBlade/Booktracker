import Store from './Store';
import {comment, STATE} from './comment';

test('Creating a comment', () => {
  const t = new comment({
    user: 'Pikachu99',
    userID: 4124,
    content: 'Ah mah gawd I luv dis book',
    rating: 4
  });

  expect(t.user).toBe('Pikachu99');
  expect(t.userID).toBe(4124);
  expect(t.content).toBe('Ah mah gawd I luv dis book');
  expect(t.rating).toBe(4);

  expect(t.upvotes).toBe(0);
  expect(t.downvotes).toBe(0);
  expect(t.state).toBe(STATE.none);
});

test('Upvoting a comment', () => {
  const t = new comment({
    user: 'Pikachu99',
    userID: 4124,
    content: 'Ah mah gawd I luv dis book',
    rating: 4
  });

  t.upvote();
  expect(t.upvotes).toBe(1);
  expect(t.state).toBe(STATE.upvote);
});

test('Downvoting a comment', () => {
  const t = new comment({
    user: 'Pikachu99',
    userID: 4124,
    content: 'Ah mah gawd I luv dis book',
    rating: 4
  });

  t.downvote();
  expect(t.downvotes).toBe(1);
  expect(t.state).toBe(STATE.downvote);
});

test('Downvoting then upvoting a comment', () => {
  const t = new comment({
    user: 'Pikachu99',
    userID: 4124,
    content: 'Ah mah gawd I luv dis book',
    rating: 4
  });

  t.downvote();
  t.upvote();
  expect(t.downvotes).toBe(0);
  expect(t.upvotes).toBe(1);
  expect(t.state).toBe(STATE.upvote);
});
