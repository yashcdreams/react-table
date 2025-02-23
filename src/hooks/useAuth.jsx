export const useAuth = () => {
  return {
    isAuthenticated: localStorage.getItem('auth') === 'true',
    login: () => localStorage.setItem('auth', 'true'),
    logout: () => localStorage.removeItem('auth')
  };
};
