import User from '../models/user.js';

export const getAllUsers = async () => {
    let users = await User.findOne({username: 'alvee', password: 'password'}).then((users, err) => {
        console.log(users);
    })

    return users;
}