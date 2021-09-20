import { applyMiddleware, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './redux/reducers/rootReducer';
import { compose } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, 
    compose(composeWithDevTools(), applyMiddleware(thunk))
    );

export default store;
