import { LOADING } from '../../actions/types';
import { createReducer } from '../utils';
import { setLoading } from './ui'

const initialState = {
    isLoading: false,
    sessionInit: false
}

const uiHandler = {
    [LOADING]: setLoading
}

const ui = createReducer(uiHandler, initialState);

export default ui;