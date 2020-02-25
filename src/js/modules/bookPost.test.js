import bookPost from './bookPost';
import VIEWSTATE from './bookPost';
import {comment} from './comment';


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
  expect(t.view).toBe('comments');
  expect(t.wordCountPercentage).toBe(0);
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

  
  t.comments.push(new comment({ user: 'Pikachu99', userID: (Math.random()*10000), content: 'test' }));
  expect(t.comments[0].content).toBe('test');
});

test('Changing book wordcount', () => {
  const t = new bookPost({
    title: 'Harry Potter and the Cursed Child',
    release: '2020-02-13T00:00:00.000Z',
    isbn: '9781338216677'
  });
  expect(t.wordCountPercentage).toBe(0);
  t.setComment('testing')
  expect(t.wordCountPercentage).toBe(4);//7 van 156 floored  
});

test('Changing viewstate', () => {
  const t = new bookPost({
    title: 'Harry Potter and the Cursed Child',
    release: '2020-02-13T00:00:00.000Z',
    isbn: '9781338216677'
  });
  expect(t.view).toBe('comments');
  t.changeView();
  expect(t.view).toBe('description');
});