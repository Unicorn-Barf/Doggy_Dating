const db = require('../config/connection');
const { Owner, Dog, Conversation } = require('../models');



db.once('open', async () => {
    console.log('-------Connected to Database-------\n\n');

    try {
        // Clear All Data from Colection
        await Owner.deleteMany({});
        console.log('-------Deleted Owners-------\n');
        await Dog.deleteMany({});
        console.log('-------Deleted Dogs-------\n');
        await Conversation.deleteMany({});
        console.log('-------Deleted Conversations-------\n');

        // Insert Many Owners
        const owners = await Owner.insertMany(ownerData);
        console.log('-------Seeded Owners-------\n');

        // Insert Many Dogs
        const dogs = await Dog.insertMany(dogData);
        console.log('-------Seeded Dogs-------\n');

        // Insert Many Conversations
        const conversations = await Conversation.insertMany(conversationData);
        console.log('-------Seeded Conversations-------\n');
        

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw new Error(err);
    }
});

