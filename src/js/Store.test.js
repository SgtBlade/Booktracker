import Store from './Store';
import bookPost from './bookPost';

test('Creating a bookPost', () => {

  const store = new Store();
  store.seedbookPosts();

  const firstItem = store.bookPosts[0];
  expect(firstItem['title']).toBe('Harry Potter and the Cursed Child');
  expect(firstItem['release']).toBe('2020-02-13');
  expect(firstItem['isbn']).toBe('9781338216677');
  expect(firstItem['owned']).toBe(false);
});