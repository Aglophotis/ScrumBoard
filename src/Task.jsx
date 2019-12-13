import React from "react";
import styled from 'styled-components';
import Menu from './Menu';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color: white;
    
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: ${props => props.isDragDisabled ? 'red' : 'blue'};
    border-radius: 4px;
    margin-right: 8px;
`;

const Text = styled.p`
    flex: 1 1 80%;
`;

export default class Task extends React.Component {

    callback = (data) => {
      this.props.parentCallback(data);

    };

    render() {
        const isDragDisabled = this.props.task.isDraggable;
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index} isDragDisabled={isDragDisabled}>
                {(provided) => (
                    <Container {...provided.draggableProps} ref={provided.innerRef}>
                        <Handle {...provided.dragHandleProps} isDragDisabled={isDragDisabled}/>
                        <Text>{this.props.task.content}</Text>
                        <Menu task={this.props.task} parentCallback={this.callback}/>
                    </Container>
                )}
            </Draggable>
        );
    }
}