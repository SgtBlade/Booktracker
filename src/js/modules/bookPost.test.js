import bookPost from './bookPost';
import User from './user';
import {Comment} from './comment';

test('Creating a bookPost', () => {
  const t = new bookPost({
    title: 'Harry Potter and the Cursed Child',
    release: '2020-02-13T00:00:00.000Z',
    isbn: '9781338216677'
  });
  expect(t.title).toBe('Harry Potter and the Cursed Child');
  expect(t.release.toISOString()).toBe('2020-02-13T00:00:00.000Z');
  expect(t.isbn).toBe('9781338216677');
  expect(t.owned).toBe(false);
  expect(t.comments.toString()).toBe('');
});

test('Changing book to owned', () => {
  const t = new bookPost({
    title: 'Harry Potter and the Cursed Child',
    release: '2020-02-13T00:00:00.000Z',
    isbn: '9781338216677'
  });
  t.setOwned();
  expect(t.owned).toBe(true);
});

test('Pushing a comment', () => {
  const t = new bookPost({
    title: 'Harry Potter and the Cursed Child',
    release: '2020-02-13T00:00:00.000Z',
    isbn: '9781338216677'
  });

  const user = new User({name: 'ThomasWayne', id: 'dwadw123-fwefw123-3dfsfw2-dwada1'})
  const ExampleComment = new Comment({user: user, content: 'test' })
  t.comments.push(ExampleComment)
  expect(t.comments[0]).toBe(ExampleComment);
});
