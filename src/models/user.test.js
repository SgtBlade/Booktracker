import User from './User';


test('Create a new user', () => {
  const user = new User({name: 'testuser', id: '5dawda-312dfw-fewft23'});
  expect(user.name).toBe('testuser');
  expect(user.id).toBe('5dawda-312dfw-fewft23');
});
