import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
