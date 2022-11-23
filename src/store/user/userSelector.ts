import { createSelector } from 'reselect';
import { UserState } from './userReducer';
import { RootSate } from '../store';

export const SelectUserReducer = (state: RootSate): UserState => state.user;

export const selectCurrentUser = createSelector([SelectUserReducer], (user) => user.currentUser);
