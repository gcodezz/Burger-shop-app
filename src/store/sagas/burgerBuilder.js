import { put } from 'redux-saga/effects'

import * as actions from '../actions/burgerBuilder'
import axios from '../../axios-orders'

export function* initIngredients () {
    try {
        const response = yield axios.get('https://myburger-193b9.firebaseio.com/ingredients.json')
        yield put(actions.setIngredients(response.data))
    } catch (e) {
        yield put(actions.fetchIngredientFailed(e))
    }
}