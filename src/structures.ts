export interface Node {
    id: number;
    val: number;
    color: string;
}

export interface Link {
    source: number;
    target: number;
}

export interface Graph {
    nodes: Node[];
    links: Link[];
    selected?: number;
}

export interface Settings {

}

export interface State {
    graph: Graph;
    settings: Settings;
}