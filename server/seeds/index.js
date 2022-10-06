const db = require('../config/connection');
const mongoose = require('mongoose');
const { Owner, Dog, Conversation } = require('../models');
const getOwnerData = require('./ownerData');
const getDogData = require('./dogData');



db.once('open', async () => {
    console.log('-------Connected to Database-------\n\n');

    try {
        // Clear All Data from Colections
        await Owner.deleteMany({});
        console.log('-------Deleted Owners-------\n');
        await Dog.deleteMany({});
        console.log('-------Deleted Dogs-------\n');
        await Conversation.deleteMany({});
        console.log('-------Deleted Conversations-------\n');

        // Insert Many Owners
        let ownerData = await getOwnerData();
        const owners = await Owner.insertMany(ownerData);
        console.log(`-------Seeded ${owners.length} Owners-------\n`);

        // Insert Many Dogs
        // Loop through the dogs and add the owner id field
        let dogData = await getDogData();
        let allOwners = await Owner.find({});

        for (let i=0; i<dogData.length; i++) {
            dogData[i].ownerId = new mongoose.Types.ObjectId(allOwners[i]._id);
            const newDog = await Dog.create(dogData[i]);
            // Create ObjectId for dogIds array
            const dogId = new mongoose.Types.ObjectId(newDog._id);
            // Add Dog id to owner dogIds array
            allOwners[i].dogIds = [dogId];
            await allOwners[i].save();
        }
        // const dogs = await Dog.insertMany(dogData);
        console.log(`-------Seeded ${dogData.length} Dogs-------\n`);

        // // Insert Many Conversations
        // const conversations = await Conversation.insertMany(conversationData);
        // console.log('-------Seeded Conversations-------\n');
        

        console.log('all done!');
        process.exit(0);
    } catch (err) {
        throw new Error(err);
    }
});

