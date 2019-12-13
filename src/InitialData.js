const InitialData = {
    tasks: {
        '3': {id: '3', content: 'test3', isDraggable: false},
        '4': {id: '4', content: 'test4', isDraggable: false},
        '1': {id: '1', content: 'test1', isDraggable: false},
        '2': {id: '2', content: 'test2', isDraggable: true},
    },
    columns: {
        '1': {
            id: '1',
            title: 'To do',
            taskIds: ['1', '2', '3', '4']
        },
        '2': {
            id: '2',
            title: 'In progress',
            taskIds: []
        },
        '3': {
            id: '3',
            title: 'Done',
            taskIds: []
        }
    },

    columnOrder: ['1', '2', '3']
};

export default InitialData;