import { takeEvery } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes'
import { 
    logoutSaga, 
    checkAuthTimeoutSaga, 
    authUserSaga 
} from './auth'
import { initIngredients } from './burgerBuilder'


export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredients)
}




