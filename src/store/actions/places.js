import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch("https://us-central1-rncourse-1556607395012.cloudfunctions.net/storeImage", {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    }).catch(err => {
      console.log(err);
      alert("Something went wrong, please try again.");
      dispatch(uiStopLoading());
    }).then(res => res.json())
    .then(parsedRes => {
      const placeData = {
        name: placeName,
        location: location,
        image: parsedRes.imageUrl
      };
      return fetch("https://rncourse-1556607395012.firebaseio.com/places.json", {
        method: "POST",
        body: JSON.stringify(placeData)
      });
    }).catch(err => {
      console.log(err);
      alert("Something went wrong, please try again.");
      dispatch(uiStopLoading());
    }).then(res => res.json())
    .then(parsedres => {
      console.log(parsedres);
      dispatch(uiStopLoading());
    });
  };
};

export const getPlaces = () => {
  return dispatch => {
    fetch("https://rncourse-1556607395012.firebaseio.com/places.json")
    .catch(err => {
      alert("Something went wrong in getting place");
    })
    .then(res => res.json())
    .then(parsedRes => {
      const places = [];
      for (let key in parsedRes) {
        places.push({
          ...parsedRes[key],
          image: {
            uri: parsedRes[key].image
          },
          key: key
        });
      }
      dispatch(setPlaces(places));
    });
  };
}

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  }
}

export const deletePlace = (key) => {
  return dispatch => {
    dispatch(removePlace(key));
    fetch("https://rncourse-1556607395012.firebaseio.com/places/" + key + ".json", {
      method: "DELETE"
    })
    .catch(err => {
      alert("Something went wrong in delete");
    })
    .then(res => res.json())
    .then(parsedRes => {
      alert("Place Deleted!");
    });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};