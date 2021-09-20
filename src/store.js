import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/rootReducer";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  composeWithDevTools()
);

export default store;
