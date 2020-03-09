import Store from './Store';
import bookPost from '../modules/bookPost';

test('Checking a bookPost', () => {

  const store = new Store();
  store.seedbookPosts();

  const firstItem = store.bookPosts[0];
  expect(firstItem['title']).toBe('Harry Potter and the Cursed Child');
  expect(firstItem['release'].toISOString()).toBe('2020-06-13T00:00:00.000Z');
  expect(firstItem['isbn']).toBe('9781338216677');
  expect(firstItem['owned']).toBe(false);
});

test('Remove a book post', () => {

  const store = new Store();
  store.seedbookPosts();


  expect((store.bookPosts).length).toBe(2);
  const Example = new bookPost({
    title: 'Harry Potter and the Cursed Child',
    release: '2020-06-13T00:00:00.000Z',
    isbn: '9781338216677'
  })

  store.removeBookPost(Example);
  expect((store.bookPosts).length).toBe(1);


});

test('Creating a book post', () => {

  const store = new Store();

  store.setAdditionField("title", 'test')
  store.setAdditionField("release", '2020-02-28')
  store.setAdditionField("isbn", '1111')

  expect(store.additionField.title).toBe('test');
  expect(store.additionField.release).toBe('2020-02-28');
  expect(store.additionField.isbn).toBe('1111');
});
