export const getSavedOwner = () => {
    const savedOwner = localStorage.getItem('saved_owner')
        ? JSON.parse(localStorage.getItem('saved_owner'))
        : null;
    return savedOwner;
};

export const saveOwner = (ownerData) => {
    if (ownerData) {
        localStorage.setItem('saved_owner', JSON.stringify(ownerData));
    } else {
        localStorage.removeItem('saved_owner');
    }
};

export const getSavedDogArr = () => {
    const savedDogs = localStorage.getItem('saved_dogs')
        ? JSON.parse(localStorage.getItem('saved_dogs'))
        : [];
    return savedDogs;
};

export const saveDogArr = (dogData) => {
    if (dogData.length) {
        localStorage.setItem('saved_dogs', JSON.stringify(dogData));
    } else {
        localStorage.removeItem('saved_dogs');
    }
};

export const getCurrentDogIndex = () => {
    const index = localStorage.getItem('dogArr_index')
        ? JSON.parse(localStorage.getItem('dogArr_index'))
        : 0;
    return index;
};

export const setCurrentDogIndex = (index) => {
    if (typeof index === 'number') {
        localStorage.setItem('dogArr_index', JSON.stringify(index));
    } else {
        localStorage.removeItem('dogArr_index');
    }
};

export const pushDogToArr = (dogData) => {
   const dogArray = getSavedDogArr();
   dogArray.push(dogData);
   saveDogArr(dogArray);
}

export const deleteCurrDogFromArr = () => {
   const oldDogArray = getSavedDogArr();
   const newDogArray = [];
   for(let i=0; i<oldDogArray; i++) {
      if(i !== getCurrentDogIndex) {
         newDogArray.push(oldDogArray[i]);
      }
   }
   saveDogArr(newDogArray);
   setCurrentDogIndex(0);
}