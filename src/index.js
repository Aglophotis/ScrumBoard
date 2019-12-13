import React from 'react';
import ReactDOM from 'react-dom';
import InitialData from "./InitialData";
import {DragDropContext} from "react-beautiful-dnd";
import styled from "styled-components";
import Column from './column';
import AddItem from "./AddItem";

const Container = styled.div`
    display: flex;
`;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = InitialData;

        if (localStorage.getItem('tasks') && localStorage.getItem('columns')
            && localStorage.getItem('columnOrder')) {
            this.state ={
                tasks: JSON.parse(localStorage.getItem('tasks')),
                columns: JSON.parse(localStorage.getItem('columns')),
                columnOrder: JSON.parse(localStorage.getItem('columnOrder'))
            }
        }
    }

    onDragStart = start => {
        const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

      this.setState({
          homeIndex
      })
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.tasks);
        console.log(this.state.columns);
        console.log(this.state.columnOrder);
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
        localStorage.setItem('columns', JSON.stringify(this.state.columns));
        localStorage.setItem('columnOrder', JSON.stringify(this.state.columnOrder));
    }

    onDragEnd = result => {
        this.setState({
            homeIndex: null
        });

        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn
                }
            };

            this.setState(newState);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };

        this.setState(newState);
    };

    editCallback = (data) => {
        let tasks = this.state.tasks;
        let task = tasks[data.taskId];
        task.content = data.content;
        task.isDraggable = data.isDraggable;
        tasks[data.taskId] = task;

        this.setState({tasks: tasks});
    };

    addCallback = (data) => {
        let tasks = this.state.tasks;
        let taskId = Number(Object.keys(tasks).reduce((a, b) => tasks[a] > tasks[b] ? a : b)) + 1;
        tasks[taskId] = {
            content: data.content,
            isDraggable: data.isDraggable,
            id: taskId.toString()
        };

        let columns = this.state.columns;
        let column = columns[1];
        column.taskIds.push(taskId);

        this.setState({tasks: tasks, columns: columns});
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                <Container>
                    {this.state.columnOrder.map((columnId, index) => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                        const isDropDisabled = index < this.state.homeIndex;

                        return <Column key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} parentCallback={this.editCallback}/>;
                    })}
                </Container>
                <AddItem parentCallback={this.addCallback}></AddItem>
            </DragDropContext>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
