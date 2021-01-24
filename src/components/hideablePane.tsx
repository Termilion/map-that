import * as React from 'react';
import { Divider } from 'antd';
import { RightOutlined, LeftOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';

interface Props {
    direction: string;
    hidden?: boolean;
}

class HideablePane extends React.Component<Props> {
    state = {
        visible: true
    }

    constructor(props: Props) {
        super(props);
        if(props.hidden) {
            this.state.visible = false;
        }
    }

    getOpener(open: boolean) {
        switch(this.props.direction) {
            case "left":
                if (open) {
                    return (<LeftOutlined className="hide" onClick={() => this.toggleVisibility()}/>);
                }
                return (<RightOutlined className="hide" onClick={() => this.toggleVisibility()}/>);
            case "right":
                if (open) {
                    return (<RightOutlined className="hide" onClick={() => this.toggleVisibility()}/>);
                }
                return (<LeftOutlined className="hide" onClick={() => this.toggleVisibility()}/>);
            case "bottom":
                if (open) {
                    return (<DownOutlined className="hide" onClick={() => this.toggleVisibility()}/>);
                }
                return (<UpOutlined className="hide" onClick={() => this.toggleVisibility()}/>);
            case "top":
                if (open) {
                    return (<UpOutlined className="hide" onClick={() => this.toggleVisibility()}/>);
                }
                return (<DownOutlined className="hide" onClick={() => this.toggleVisibility()}/>);
            default:
                if (open) {
                    return (<RightOutlined className="hide" onClick={() => this.toggleVisibility()}/>);
                }
                return (<LeftOutlined className="hide" onClick={() => this.toggleVisibility()}/>);
            }
    }

    render() {
        if (this.props.direction === "top") {
            if (this.state.visible) {
                return (
                    <div className="pane visible">
                        <div className="content">
                            {this.props.children}
                        </div>
                        <Divider />
                        {this.getOpener(true)}
                    </div>
                );
            } else {
                return (
                    <div className="pane hidden">
                        <Divider />
                        {this.getOpener(false)}
                    </div>
                );
            }
        }
        if (this.state.visible) {
            return (
                <div className="pane visible">
                    {this.getOpener(true)}
                    <Divider />
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="pane hidden">
                    {this.getOpener(false)}
                    <Divider />
                </div>
            );
        }
    }

    toggleVisibility() {
        this.setState({...this.state, visible: !this.state.visible});
    }
}

export default HideablePane;