import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import rootReducer from './reducers/index'
import Layout from './Layout';

const store = createStore(rootReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Layout />
    </Provider>
);