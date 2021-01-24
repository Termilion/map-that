import * as React from 'react';
import { Store } from 'redux';
import HideablePane from "../components/hideablePane";
import MainControls from '../components/mainControls';
import NodeStyleEditor from "../components/nodeStyleEditor";
import NodeTemplateEditor from "../components/nodeTemplateEditor";
import "../css/applicationFrame.css";

function ApplicationFrame(props: {store: Store}) {
    return (
        <>
            <div id="uiFrame">
                <div id="topFrame">
                    <HideablePane direction="top">
                        <MainControls store={props.store}/>
                    </HideablePane>
                </div>
                <div id="leftFrame">
                    <HideablePane direction="left" hidden>
                        <NodeTemplateEditor/>
                    </HideablePane>
                </div>
                <div id="rightFrame">
                    <HideablePane direction="right" hidden>
                        <NodeStyleEditor store={props.store}/>
                    </HideablePane>
                </div>
                <div id="bottomFrame">
                    <HideablePane direction="bottom" hidden>
                        <p>Here is the content editor!</p>
                    </HideablePane>
                </div>
            </div>
        </>
    );
}

export default ApplicationFrame;