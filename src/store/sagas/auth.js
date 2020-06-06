import { put, delay } from 'redux-saga/effects'

import * as actions from '../actions/auth'

export function* logoutSaga(action) {
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('expirationTime')
    yield localStorage.removeItem('userId')
    yield put(actions.logoutSuccess())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())
}

export function* authUserSaga(action) {
    yield put(actions.authStart())
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzO_1i4jq7j3NA55uY5ZUJRjWnilGD5ns'
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzO_1i4jq7j3NA55uY5ZUJRjWnilGD5ns'
    }

    const response = yield fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: action.email,
                password: action.password,
                returnSecureToken: true
            })
        }
    )
    if (!response.ok) {
        const errorResData = yield response.json()
        const errorId = errorResData.error.message
        let message = 'Something went wrong!'
        if (errorId === 'EMAIL_EXISTS') {
            message = 'This email exists already!'
            //console.log(message)
            return yield put(actions.authFail(message))
        }     
    }

    const resData = yield response.json()
    const expirationDate = yield new Date(new Date().getTime() + resData.expiresIn * 1000)
    yield localStorage.setItem('token', resData.idToken)
    yield localStorage.setItem('expirationDate', expirationDate)
    yield localStorage.setItem('userId', resData.localId)
    yield put(actions.checkAuthTimeout(resData.expiresIn))
    yield put(actions.authSuccess(
        resData.idToken, 
        resData.localId
    ))
}

