import Store from './Store';
import bookPost from '../modules/bookPost';
import User from '../modules/user';

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


  expect((store.bookPosts).length).toBe(3);
  const Example = new bookPost({
    title: 'Harry Potter and the Cursed Child',
    release: '2020-06-13T00:00:00.000Z',
    isbn: '9781338216677',
    originalPoster: store.user
  })

  store.removeBookPost(Example);
  expect((store.bookPosts).length).toBe(2);


});

test('Creating a book post', () => {

  const store = new Store();

  store.setAdditionField("title", 'test')
  store.setAdditionField("release", '2020-02-28')
  store.setAdditionField("isbn", '1111')

  expect(store.additionField.title).toBe('test');
  expect(store.additionField.release).toBe('2020-02-28');
  expect(store.additionField.isbn).toBe('1111');
  expect(store.bookPosts.length).toBe(0);
  store.addbookPost();
  expect(store.bookPosts.length).toBe(1);
  

});

test('A post cannot be removed by a different user', () => {

  const store = new Store();
  const post = new bookPost({
    title: 'Stud Muffin',
    isbn: '9780439064866',
    owned: true,
    originalPoster: new User({name: 'ThomasWayne', id: 'dwadw123-fwefw123-3dfsfw2-dwada1'})
  });

  store.bookPosts.push(post);  
  expect(store.bookPosts.length).toBe(1);
  store.removeBookPost(post);
  expect(store.bookPosts.length).toBe(1);

});

test('Get owned bookposts', () => {
  const store = new Store();
  store.seedbookPosts();
  expect(store.owned.length).toBe(2);
});

test('Get a book by isbn number', () => {
  const store = new Store();
  store.seedbookPosts();
  const example = new bookPost({
    title: 'Stud Muffin',
    isbn: '9780439064862116',
    owned: true,
    originalPoster: new User({name: 'ThomasWayne', id: 'dwadw123-fwefw123-3dfsfw2-dwada1'})
  });
  store.bookPosts.push(example)
  expect(store.returnBookByIsbn('9780439064862116')).toBe(example);

});
