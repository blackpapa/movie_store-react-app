import { createStore } from 'redux';
import rootReducer from './Redux/Reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(rootReducer, composeWithDevTools());

export default store;
