import { UserState } from './userReducer';

import { createSelector } from 'reselect';

export const SelectUserReducer = (state): UserState => state.user;

export const selectCurrentUser = createSelector([SelectUserReducer], (user) => user.currentUser);
