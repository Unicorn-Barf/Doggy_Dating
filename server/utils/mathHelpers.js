const randNumInRange = (min, max) => {
    const num = Math.round((Math.random()*(max-min) + min));
    return num;
}

module.exports = {
    randNumInRange,
}