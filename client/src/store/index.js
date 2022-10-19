import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

const composeEnhancer=  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer, composeEnhancer( applyMiddleware( thunk ) ) );
// compose aplica la middleware de thunk para que en el navegador aparezcan 
// las devtools



export default store;
