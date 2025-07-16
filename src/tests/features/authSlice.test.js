import authReducer, { adminLoggedIn, adminLoggedOut } from '../../features/auth/authSlice';

describe('auth slice', () => {
  const initialState = {
    accessToken: undefined,
    admin: undefined,
  };

  test('should return the initial state', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('should handle adminLoggedIn', () => {
    const admin = { name: 'Admin User', email: 'admin@example.com' };
    const accessToken = 'test-token';
    
    const newState = authReducer(
      initialState,
      adminLoggedIn({ accessToken, admin })
    );
    
    expect(newState).toEqual({
      accessToken,
      admin,
    });
  });

  test('should handle adminLoggedOut', () => {
    const loggedInState = {
      accessToken: 'test-token',
      admin: { name: 'Admin User' },
    };
    
    const newState = authReducer(loggedInState, adminLoggedOut());
    
    expect(newState).toEqual(initialState);
  });
});
