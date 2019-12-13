import React from 'react';
import styled from 'styled-components';
import {Droppable} from "react-beautiful-dnd";
import Task from "./Task";

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;
    
    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    flex-grow: 1;
    min-height: 100px;
`;

export default class Column extends React.Component {

    callback = (data) => {
        this.props.parentCallback(data);
    };

    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id} isDropDisabled={this.props.isDropDisabled}>
                    {provided => (
                        <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                            {this.props.tasks.map((task, index) => (
                                <Task key={task.id} task={task} index={index} parentCallback={this.callback}/>
                            ))}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        )
    }
}