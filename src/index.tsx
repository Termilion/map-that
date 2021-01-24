import * as React from 'react';
import { render } from 'react-dom';
import {createStore, Store} from 'redux';
import { Provider } from 'react-redux';
import {modifyNodeList_reducer} from './Reducers';
import GraphComponent from './components/graphComponent';
import App from './App';
import "./css/index.css";

let store: Store = createStore(modifyNodeList_reducer);


render(
    <Provider store={store}>
        <App store={store}/>
    </Provider>,
    document.getElementById('root')
);

render(
    <Provider store={store}>
        <GraphComponent store={store}/>
    </Provider>,
    document.getElementById("graph")
);