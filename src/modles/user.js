// server/models/User.js

// Option 1: Using a class
export class UserAuth {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.type = "user";
  }
}

// // Option 2: Using an object with JSDoc for type documentation
// /**
//  * @typedef {Object} UserAuth
//  * @property {string} email - User's email
//  * @property {string} password - User's password
//  * @property {"user"} type - User type
//  */

// export const UserAuth = {
//   email: '',
//   password: '',
//   type: 'user'
// };
