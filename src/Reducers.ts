import { Action } from 'redux';
import { node } from 'webpack';
import { Node, State, Graph, Link } from './structures';

interface NodeAction {
    type: string;
    payload: any;
}

interface ActualLink {
    source: Node,
    target: Node
}

function addNode(state: State, currentId: number) {
    console.log("add node");
    const newId = currentId+1;
    const newNode: Node = {
        id: newId,
        val: 10,
        color: '#A0A0A0'
    }
    const newNodes = [...state.graph.nodes, newNode];
    const newGraph = {
        nodes: newNodes,
        links: state.graph.links,
        selected: newId
    };
    const newState = {
        graph: newGraph,
        settings: state.settings
    };
    return newState;
}

function addNodeWithLink(state: State, currentId: number) {
    console.log("add node with link");
    const newId = currentId+1;
    const newNode: Node = {
        id: newId,
        val: 10,
        color: '#A0A0A0'
    }
    const newLink: Link = {
        source: state.graph.selected,
        target: newId
    }
    const newNodes = [...state.graph.nodes, newNode];
    const newLinks = [...state.graph.links, newLink];
    const newGraph = {
        nodes: newNodes,
        links: newLinks,
        selected: newId
    };
    const newState = {
        graph: newGraph,
        settings: state.settings
    };
    return newState;
}

function removeNode(state: State, action: Action<NodeAction>, currentId: number) {
    const nodeId = action.type.payload;
            
    const newNodes: Node[] = [];
    const newLinks: Link[] = [];
    let newSelected: number = undefined;

    state.graph.nodes.forEach(node => {
        if(node.id != nodeId) {
            newNodes.push(node);
        }
    });

    if (newNodes.length > 0) {
        newSelected = newNodes[newNodes.length-1].id;
    }

    state.graph.links.forEach(link => {
        const actualLink: ActualLink = link as any as ActualLink;
        if (actualLink.source.id !== nodeId && actualLink.target.id !== nodeId) {
            newLinks.push(link);
        }
    });

    const newGraph = {
        nodes: newNodes,
        links: newLinks,
        selected: newSelected
    };

    const newState = {
        graph: newGraph,
        settings: state.settings
    };

    return newState;
}

function selectNode(state: State, action: Action<NodeAction>) {
    const newState = {
        graph: {
            nodes: state.graph.nodes,
            links: state.graph.links,
            selected: action.type.payload
        },
        settings: state.settings
    }
    return newState;
}



function updateNode(state: State, action: Action<NodeAction>) {
    const updatedNode : Node = action.type.payload;
    const nodes: Node[] = Object.assign([], state.graph.nodes);

    const index = nodes.findIndex(n => n.id === updatedNode.id);
    nodes.splice(index, 1, updatedNode);
    const newState: State = {
        graph: {
            nodes: nodes,
            links: state.graph.links,
            selected: state.graph.selected
        },
        settings: state.settings
    }
    return newState;
}

export function modifyNodeList_reducer(state: State = {graph: {nodes: [], links: []}, settings: {}}, action: Action<NodeAction>) {
    const nodes = state.graph.nodes;
    const currentId = nodes.length > 0 ? nodes[nodes.length-1].id : 0;

    switch (action.type.type) {
        case 'node/select':
            return selectNode(state, action);
        case 'node/add':
            return addNode(state, currentId);
        case 'node/remove':
            return removeNode(state, action, currentId);
        case 'node/addWithLink':
            return addNodeWithLink(state, currentId);
        case 'node/update':
            return updateNode(state, action);
        default:
            console.log("unknown action");
            console.log(action);
            return state;
    }
}
