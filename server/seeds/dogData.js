const fetch = require('node-fetch');
const dogNames = require('dog-names');
const { randNumInRange, capFirstLetter } = require('../utils/seedUtils');


// Function to fetch random dog data
// Uses https://dog.ceo/dog-api/documentation/
const getDogData = async () => {

    const gender = ['Male', 'Female'];
    var dogData = [];

    // Get breed data and store in an array
    const breedsData = await fetch('https://dog.ceo/api/breeds/list/all');
    const parsedBreedsData = await breedsData.json();
    const breedsObj = parsedBreedsData.message;
    let breedArr = [];

    for (const breed in breedsObj) {
        if (breedsObj[breed].length === 0) {
            breedArr.push(breed);
        }
        else {
            for (const type of breedsObj[breed]) {
                breedArr.push(type + ' ' + breed);
            };
        };
    };

    // Create 100 dog data for seeding
    for (let i = 0; i < 100; i++) {
        const dog = {};

        // Get Name
        if (dog.sex === 'Male') dog.name = dogNames.maleRandom();
        else dog.name = dogNames.femaleRandom();

        // Get Breed
        const breed = breedArr[randNumInRange(0, breedArr.length - 1)];
        dog.breed = capFirstLetter(breed);

        // Get Birthday
        const yearMillis = 1000 * 60 * 60 * 24 * 365;
        let millisAgo = randNumInRange(yearMillis, 14 * yearMillis);
        const birthday = new Date(Date.now() - millisAgo);
        dog.birthday = birthday;

        // Get Sex
        dog.sex = gender[randNumInRange(0, 1)];

        // Get Random Weight (might not align with breed, lol...)
        dog.weight = randNumInRange(10, 120);

        // Get Image url
        let imageData;
        if (breed.split(' ').length === 2) {
            imageData = await fetch(`https://dog.ceo/api/breed/${breed.split(' ')[1]}/${breed.split(' ')[0]}/images/random`);
        } else imageData = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const parsedImageData = await imageData.json();
        const imageUrl = parsedImageData.message;
        dog.images = [imageUrl];

        // Push this dog to the dogData array
        dogData.push(dog);
    }
    return dogData;
};

// // Test Function: to debug just uncomment and run this file
// (async () => {
//     const testData = await getDogData();
//     console.log(testData);
// })();

module.exports = getDogData;