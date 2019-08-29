import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  currentUser => (currentUser ? currentUser.email : null)
);
