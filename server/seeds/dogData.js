const fetch = require('node-fetch');
const dogNames = require('dog-names');
const { randNumInRange, capFirstLetter } = require('../utils/seedUtils');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 10,
        min: 3
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      }
})


const headlineArr = [
    'Oooh I treats!',
    'Much park, so play.',
    'Look! Squirrel!!!',
    "I'm a person trapped in a dog.",
    'I love my person.',
    "Arrf, grr, arrrrrf, woof!",
    "No, I don't sit. You sit!",
    "Prease grrmmeee er trert!",
    'E=mc^2, why is the sky blue?',
]


// Function to fetch random dog data
// Uses https://dog.ceo/dog-api/documentation/
const getDogData = async () => {

    const gender = ['Male', 'Female'];
    const boolArr = [true, false];
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

        // Get Random isFixed
        dog.isFixed = boolArr[randNumInRange(0,1)];

        // Get Random Weight (might not align with breed, lol...)
        dog.weight = randNumInRange(10, 120);

        // Get Random Headline
        dog.headline = headlineArr[randNumInRange(0,8)];

        // Get Random About section
        dog.about = lorem.generateParagraphs(randNumInRange(1,2));

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

// Test Function: to debug just uncomment and run this file
// (async () => {
//     const testData = await getDogData();
//     console.log(testData);
// })();

module.exports = getDogData;