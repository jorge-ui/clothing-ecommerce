import {
  SET_COLLECTIONS,
  FETCH_COLLECTION_START,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAILURE
} from './shop.types';

const INITIAL_STATE = {
  collections: null,
  isFetching: false,
  errorMessage: ''
};

const shopReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_COLLECTIONS:
      return {
        ...state,
        collections: payload
      };
    case FETCH_COLLECTION_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: payload
      };
    case FETCH_COLLECTION_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload
      };
    default:
      return state;
  }
};

export default shopReducer;
