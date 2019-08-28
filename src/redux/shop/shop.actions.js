import {
  SET_COLLECTIONS,
  FETCH_COLLECTION_START,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAILURE
} from './shop.types';
import {
  db,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

export const setCollections = collections => ({
  type: SET_COLLECTIONS,
  payload: collections
});

export const fetchCollectionsSuccess = collections => ({
  type: FETCH_COLLECTION_SUCCESS,
  payload: collections
});
export const fetchCollectionsFailure = errorMessage => ({
  type: FETCH_COLLECTION_FAILURE,
  payload: errorMessage
});

export const fetchCollectionsStart = () => ({
  type: FETCH_COLLECTION_START
});

export const fetchCollectionsAsync = () => dispatch => {
  // Fetch - start
  dispatch(fetchCollectionsStart());
  // Fetch collections from db
  db.collection('collections')
    .get()
    .then(snapShot => {
      const collectionMap = convertCollectionsSnapshotToMap(snapShot);
      // fetch - success
      dispatch(fetchCollectionsSuccess(collectionMap));
    })
    .catch(({ message }) => {
      // Fetch - failure
      dispatch(fetchCollectionsFailure(message));
    });
};
