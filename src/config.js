<<<<<<< HEAD
export default {
  apiUrl: 'https://moon-procure.herokuapp.com/api',
=======
export default{
  apiUrl: 'http://localhost:8000/api',
>>>>>>> 8c24d96b815e81906f9928fea9e7d018e9897b5a

  set_token(token) {
    localStorage.setItem('token', token);
  },

  get_token() {
    return localStorage.getItem('token');
  },

  set_auth(auth) {
    localStorage.setItem('auth', auth);
  },

  set_user(user) {
    localStorage.setItem('user', user);
  },

  get_auth() {
    return localStorage.getItem('auth');
  },
  get_user() {
    return localStorage.getItem('user');
  },
};
