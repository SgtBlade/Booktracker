import Store from './Store';
import BookPost from '../models/BookPost';
import User from '../models/user';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

test('test', () => {

  expect(false).toBe(false);
});

test('Checking a bookPost', async () => {

  localStorage.clear();
  const store = new Store();
  store.jestSyncPosts();
  const firstItem = store.bookPosts[0];
  expect(firstItem['title']).toBe('Harry Potter and the Cursed Child');
  expect(firstItem['release'].toISOString()).toBe('2020-06-13T00:00:00.000Z');
  expect(firstItem['isbn']).toBe('9781338216677');
  expect(firstItem['owned']).toBe(false);
});

test('Remove a book post', () => {

  localStorage.clear();
  const store = new Store();
  store.jestSyncPosts();


  expect((store.bookPosts).length).toBe(2);
  const Example = new BookPost({
    title: 'Harry Potter and the Cursed Child',
    release: '2020-06-13T00:00:00.000Z',
    isbn: '9781338216677',
    originalPoster: store.user
  })
  store.removeBookPost(Example);
  expect((store.bookPosts).length).toBe(1);


});

test('Creating a book post', async () => {

  localStorage.clear();
  const store = new Store();

  store.setAdditionField("title", 'test')
  store.setAdditionField("release", '2020-02-28')
  store.setAdditionField("isbn", '1111')

  expect(store.additionField.title).toBe('test');
  expect(store.additionField.release).toBe('2020-02-28');
  expect(store.additionField.isbn).toBe('1111');
  expect(store.bookPosts.length).toBe(0);
  store.addbookPost();
  await sleep(1000)
  expect(store.bookPosts.length).toBe(1);
  

});

test('A post cannot be removed by a different user', async () => {

  localStorage.clear();
  const user = new User({name: 'MiguelDP', id: '61e58fe9-22e8-43a1-bc3c-830dc9dbbd09'});
  const store = new Store(user);
  store.jestSyncPosts();

  expect(store.bookPosts.length).toBe(2);
  store.removeBookPost(store.bookPosts[0]);
  expect(store.bookPosts.length).toBe(2);

});

test('Get a book by isbn number', () => {
  localStorage.clear();
  const store = new Store();
  store.jestSyncPosts();
  expect(store.returnBookByIsbn('9781949202168')).toBe(store.bookPosts[1]);

});
