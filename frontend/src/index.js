import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware,compose } from 'redux'
import {BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk'
import rootreducer from './reducers'

// const middlewareCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const middlewareCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootreducer, middlewareCompose(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
       <App />
    </BrowserRouter>  
   </Provider>, document.getElementById('root'));
registerServiceWorker();
