import * as React from 'react';
import { Store } from 'redux';
import { connect } from 'react-redux';
import { Input, Divider } from 'antd';
import { SliderPicker } from 'react-color';

import "../css/nodeStyleEditor.css";
import { State, Node } from '../structures';

interface StyleEditorProps {
    store: Store;
    state: State;
}

interface StyleEditorState {
    color: string;
    selectedNode?: Node;
}

class NodeStyleEditor extends React.Component<StyleEditorProps> {
    
    state: StyleEditorState = {
        color: "#A0A0A0"
    }

    constructor(props: StyleEditorProps) {
        super(props);

        if (this.props.state.graph.selected!!) {
            const selected = this.props.state.graph.selected;
            const nodes = this.props.state.graph.nodes;
            this.state.selectedNode = nodes.find(n => n.id === selected);
            this.state.color = this.state.selectedNode.color;
        }
    }

    handleChange(color: string) {
        this.setState({...this.state, color: color});
    }

    handleChangeComplete(color: string) {
        this.setState({...this.state, color: color});
        if (this.state.selectedNode!!) {
            const nodes = this.props.state.graph.nodes;
            const updatedNode: Node = {
                ...this.state.selectedNode,
                color: color
            }
            console.log(updatedNode);
            this.props.store.dispatch({type: {type: "node/update", payload: updatedNode}});
        }
    }

    render() {
        return (
            <>
                <Divider orientation="center" className="sectionHeader">Node Color</Divider>
                <SliderPicker
                    color={ this.state.color }
                    onChange={(color) => this.handleChange(color.hex)}
                    onChangeComplete={(color) => this.handleChangeComplete(color.hex)}
                />
                <Input addonBefore={'#'} value={this.state.color.split('#')[1].toUpperCase()} onChange={(color) => this.handleChangeComplete(`#${color.target.value}`)}/>
            </>
        );
    }
}

function mapStateToProps(state: State, props: {store: Store}) {
    return {
        state: state, store: props.store
    };
}

export default connect(mapStateToProps)(NodeStyleEditor);