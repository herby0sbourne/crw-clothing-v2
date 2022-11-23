import { takeLatest, put, all, call } from 'typed-redux-saga/macro';
import { USER_ACTION_TYPES } from './userTypes';
import { User } from 'firebase/auth';

import {
    signInFailed,
    signOutFailed,
    signInSuccess,
    signOutSuccess,
    signUpSuccess,
    EmailSignInStart,
    SignUpStart,
    SignUpSuccess,
} from './userAction';

import {
    AddtionalInformation,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    signUserInWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import { createUserDocumentFromAuth, getCurrentUser, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AddtionalInformation) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
        if (userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
    try {
        const UserCredential = yield* call(signUserInWithEmailAndPassword, email, password);

        if (UserCredential) {
            const { user } = UserCredential;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signUpWithEmail({ payload: { email, password, displayName } }: SignUpStart) {
    try {
        const UserCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);

        if (UserCredential) {
            const { user } = UserCredential;
            yield* put(signUpSuccess(user, { displayName }));
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
    yield* all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}
