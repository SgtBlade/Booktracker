import Store from '../stores/Store';
import {Comment, STATE} from './comment';
import User from './user';


test('Creating a comment', () => {

  const usr = new User({name: 'ThomasWayne', id: 'dwadw123-fwefw123-3dfsfw2-dwada1'});
  const t = new Comment({ user: usr, content: 'Ah mah gawd I luv dis book' });
  expect(t.user.name).toBe('ThomasWayne');
  expect(t.user.id).toBe('dwadw123-fwefw123-3dfsfw2-dwada1');
  expect(t.content).toBe('Ah mah gawd I luv dis book');

  expect(t.upvotes).toBe(0);
  expect(t.downvotes).toBe(0);
  expect(t.state).toBe(STATE.none);
});

test('Upvoting a comment', () => {
  const usr = new User({name: 'ThomasWayne', id: 'dwadw123-fwefw123-3dfsfw2-dwada1'})
  const t = new Comment({ user: usr, content: 'Ah mah gawd I luv dis book' });

  t.upvote(usr);
  expect(t.upvotes).toBe(1);
  expect(t.state).toBe(STATE.upvote);
});

test('Downvoting a comment', () => {
  const usr = new User({name: 'ThomasWayne', id: 'dwadw123-fwefw123-3dfsfw2-dwada1'});
  const t = new Comment({ user: usr, content: 'Ah mah gawd I luv dis book' });

  t.downvote(usr);
  expect(t.downvotes).toBe(1);
  expect(t.state).toBe(STATE.downvote);
});

test('Downvoting then upvoting a comment', () => {
  const usr = new User({name: 'ThomasWayne', id: 'dwadw123-fwefw123-3dfsfw2-dwada1'});
  const t = new Comment({ user: usr, content: 'Ah mah gawd I luv dis book' });

  t.downvote(usr);
  t.upvote(usr);
  expect(t.downvotes).toBe(0);
  expect(t.upvotes).toBe(1);
  expect(t.state).toBe(STATE.upvote);
});
