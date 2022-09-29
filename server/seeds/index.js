const db = require('../config/connection');
const { Owner, Dog, Conversation } = require('../models');


console.info('-------Connected to Database-------\n\n');
db.once('open', async () => {
    console.log('-------Connected to Database-------\n\n');

    // try {
    //     await Owner.deleteMany({});
    //     await Dog.deleteMany({});
    //     await Profile.create(profileSeeds);

    //     console.log('all done!');
    //     process.exit(0);
    // } catch (err) {
    //     throw new Error(err);
    // }
});

