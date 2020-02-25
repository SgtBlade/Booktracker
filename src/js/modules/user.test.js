import User from './User';

test('Create a new user', () => {
  const user = new User('testuser', 5);
  expect(user.name).toBe('testuser');
});