import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/index.js';
import thunk from 'redux-thunk';
//import { helloSaga } from './sagas/sagas';
//import { createLogger } from 'redux-logger';
//const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

//sagaMiddleware.run(helloSaga);

export default store;
