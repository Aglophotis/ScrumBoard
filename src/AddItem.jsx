import styled from "styled-components";
import React from "react";

const Container = styled.div`
    width: 15px;
    height: 15px;
    background-color: orange;
    border-radius: 10px;
    
    display: flex;
`;

const Content = styled.input`
    margin: 8px;
`;

const IsDraggable = styled.input`
    margin: 8px;
`;

const ConfirmAddTaskButton = styled.div`
    width: 15px;
    height: 15px;
    background-color: green;
    border-radius: 10px;
    
    float: left;
`;


export default class AddItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuOpen: false,
            content: '',
            isDraggable: false
        }
    }

    onMenuClick = menu => {

        if (this.state.isMenuOpen === null) {
            this.setState({
                isMenuOpen: true
            });
        } else {
            this.setState({
                isMenuOpen: !this.state.isMenuOpen
            });
        }
    };

    render() {
        return (
            <div>
                <Container onClick={this.onMenuClick}></Container>
                {this.state.isMenuOpen ? this.getEditMenu() : null}
            </div>
        );
    }

    onEditConfirmClick = edit => {
        let changes = {
            content: this.state.content,
            isDraggable: this.state.isDraggable,
        };

        this.props.parentCallback(changes);
        this.setState({
            isMenuOpen: false
        });
    };

    onContentChanged = event => {
        this.setState({content: event.target.value});
    };

    onDraggableChanged = event => {
        this.setState({isDraggable: !this.state.isDraggable});
    };

    getEditMenu() {
        return (
            <div>
                <div>
                    <Content value={this.state.content} onChange={this.onContentChanged}></Content>
                    <IsDraggable type={'checkbox'} checked={this.state.isDraggable} onChange={this.onDraggableChanged}></IsDraggable>
                </div>
                <div>
                    <ConfirmAddTaskButton onClick={this.onEditConfirmClick}></ConfirmAddTaskButton>
                </div>
            </div>
        )
    };
}