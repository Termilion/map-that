import * as React from 'react';
import ForceGraph3D, { NodeObject } from "react-force-graph-3d";
import { connect } from 'react-redux';
import { Node, State } from '../structures';
import { Store } from 'redux';

interface Props {
    state: State,
    store: Store;  
}

class GraphComponent extends React.Component<Props> {

    nodeClick(node: NodeObject) {
        this.props.store.dispatch({type: { type: "node/select", payload: node.id}});
    }

    render() {
        return (
            <ForceGraph3D
                graphData={this.props.state.graph}
                enableNavigationControls={true}
                nodeResolution={100}
                showNavInfo={false}
                enableNodeDrag={false}
                nodeColor={node => {
                    const n = node as any as Node;
                    return n.color;
                }}
                onNodeClick={node => this.nodeClick(node)}
            />
        );
    }
}

function mapStateToProps(state: State, props: {store: Store}) {
    return {
        state: state, store: props.store
    };
}

export default connect(mapStateToProps)(GraphComponent);