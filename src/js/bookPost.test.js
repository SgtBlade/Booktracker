import Store from './Store';
import bookPost from './bookPost';

test('Creating a bookPost', () => {
  const t = new bookPost({
    title: 'Harry Potter and the Cursed Child',
    release: '2020-02-13',
    isbn: '9781338216677'
  });
  expect(t.title).toBe('Harry Potter and the Cursed Child');
  expect(t.release).toBe('2020-02-13');
  expect(t.isbn).toBe('9781338216677');
  expect(t.owned).toBe(false);
});

test('Changing book to owned', () => {
  const t = new bookPost({
    title: 'Harry Potter and the Cursed Child',
    release: '2020-02-13',
    isbn: '9781338216677'
  });
  t.setOwned();
  expect(t.owned).toBe(true);
});
