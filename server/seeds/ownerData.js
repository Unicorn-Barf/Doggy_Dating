const fetch = require('node-fetch');
const { randNumInRange } = require('../utils/mathHelpers');

const gender = ['Male', 'Female', 'Prefer not to say'];
var ownerData = [];
// IIFE to fetch random user data
// Uses https://random-data-api.com/
(async () => {
    const users = await fetch('https://random-data-api.com/api/v2/users?size=100');
    const parsedUsers = await users.json();

    for (const user of parsedUsers) {
        
        const editedUser = {
            username: user.username,
            email: user.email,
            password: 'password',
            firstName: user.first_name,
            lastName: user.last_name,
            sex: gender[randNumInRange(0, 2)],
            birthday: user.date_of_birth,
            images: [user.avatar],
        }
        // Add to the owner array
        ownerData.push(editedUser);
    }
    console.log(ownerData);
})();

module.exports = ownerData;