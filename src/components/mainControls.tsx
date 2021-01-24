import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { State } from "../structures";
import { Store } from 'redux';
import "../css/mainControls.css";

interface ControlProps {
    store: Store;
    selected?: number;
}

class MainControls extends React.Component<ControlProps> {

    addNode() {
        this.props.store.dispatch({type: {type: "node/add"}});
    }

    addNodeWithLink() {
        this.props.store.dispatch({type: {type: "node/addWithLink"}});
    }

    removeNode() {
        this.props.store.dispatch({type: {type: `node/remove`, payload: this.props.selected}});
    }

    getConnectButton() {
        if(this.props.selected) {
            return (<Button shape={"round"} size={"small"} icon={<PlusOutlined/>} onClick={() => this.addNodeWithLink()}>Add Connected Node</Button>);
        } else {
            return (<Button shape={"round"} size={"small"} disabled className={"disabled"} icon={<PlusOutlined/>}>Add Connected Node</Button>);
        }
    }

    getRemoveButton() {
        if(this.props.selected) {
            return (<Button shape={"round"} size={"small"} icon={<MinusOutlined/>} onClick={() => this.removeNode()}>Delete Node</Button>);
        } else {
            return (<Button shape={"round"} size={"small"} disabled className={"disabled"} icon={<MinusOutlined/>}>Delete Node</Button>);
        }
    }

    render() {
        return (
            <div className="controls">
                <div className="row">
                    <Button shape={"round"} size={"small"} icon={<PlusOutlined/>} onClick={() => this.addNode()}>Add Node</Button>
                    {this.getConnectButton()}
                    {this.getRemoveButton()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: State) {
    return {selected: state.graph.selected};
}

export default connect(mapStateToProps)(MainControls);