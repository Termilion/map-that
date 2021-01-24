import * as React from 'react';
import { Store } from 'redux';
import ApplicationFrame from "./layouts/applicationFrame";
import 'antd/dist/antd.css';

function App(props: {store: Store}) {
    return (
        <ApplicationFrame store={ props.store }/>
    );
}

export default App;