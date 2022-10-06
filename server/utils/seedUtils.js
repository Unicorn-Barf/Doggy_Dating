const randNumInRange = (min, max) => {
    const num = Math.round((Math.random()*(max-min) + min));
    return num;
}

const capFirstLetter = (string) => {
    if (/\s/.test(string)) {
        const breedArr = string.split(' ');
        for (i=0; i<breedArr.length; i++) {
            breedArr[i] = breedArr[i][0].toUpperCase() + breedArr[i].slice(1);
        }
        return breedArr.join(' ');
    } else {
        return string[0].toUpperCase() + string.slice(1);
    }
};



module.exports = {
    randNumInRange,
    capFirstLetter
}