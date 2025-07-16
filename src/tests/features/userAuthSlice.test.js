import userAuthReducer, { userLoggedIn, userLoggedOut } from '../../features/auth/userAuthSlice';

describe('userAuth slice', () => {
  const initialState = {
    accessToken: undefined,
    user: undefined,
  };

  test('should return the initial state', () => {
    expect(userAuthReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should handle userLoggedIn', () => {
    const user = { name: 'Test User', email: 'user@example.com' };
    const accessToken = 'user-test-token';
    
    const newState = userAuthReducer(
      initialState,
      userLoggedIn({ accessToken, user })
    );
    
    expect(newState).toEqual({
      accessToken,
      user,
    });
  });

  test('should handle userLoggedOut', () => {
    const loggedInState = {
      accessToken: 'user-test-token',
      user: { name: 'Test User' },
    };
    
    const newState = userAuthReducer(loggedInState, userLoggedOut());
    
    expect(newState).toEqual(initialState);
  });
});
