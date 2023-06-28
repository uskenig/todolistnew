import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {TaskType} from "./TodoList";
import todoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoList: string]: Array<TaskType>
}

function App(): JSX.Element {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Ice cream", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: false}
        ]
    })
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId
                ? {...t, isDone: newIsDoneValue}
                : t)
        })
    }
    const addTask = (title: string, todoListId: string) => {
        //  const tasksForTodolist: Array<TaskType> = tasks[todoListId]
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const updatedTasks: Array<TaskType> = [newTask,...tasksForTodolist]
        // const copyTasks: TasksStateType = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const removeTask = (taskId: string, todoListId: string) => {
        // const tasksForTodolist: Array<TaskType> = tasks[todoListId]
        // const updatedTasks: Array<TaskType> = tasksForTodolist.filter((t) => t.id !== taskId)
        // const copyTasks: TasksStateType = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId)
        })
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {

        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId
                ? {...t, title}
                : t)
        })
    }

    const removeTodoList = (todoListId: string) => {
        const updatedTodoList: Array<TodoListType> = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(updatedTodoList)
        delete tasks[todoListId]
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId, title: title, filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }
    const changeTodoListFilter = (nextFilterValue: FilterValuesType, todoListId: string) => {
        const updatedTodoLists: TodoListType[]
            = todoLists.map(tl => tl.id === todoListId ? {...tl, filter: nextFilterValue} : tl)
        setTodoLists(updatedTodoLists)
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        const updatedTodoLists: TodoListType[]
            = todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl)
        setTodoLists(updatedTodoLists)
    }


    const maxTodoListTitleLength = 15
    const getFilteredTasks =
        (allTasks: Array<TaskType>, currentFilterValue: FilterValuesType): Array<TaskType> => {
            switch (currentFilterValue) {
                case "completed":
                    return allTasks.filter(t => t.isDone)
                case "active":
                    return allTasks.filter(t => !t.isDone)
                default:
                    return allTasks
            }
        }
    const todolistComponents: Array<JSX.Element> = todoLists.map(tl => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        return(
            <TodoList
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
            />
        );
    })

    return (
        <div className="App">
            {todolistComponents}
            <AddItemForm maxItemTitleLength={maxTodoListTitleLength} addItem={addTodoList} />
        </div>
    );
}

export default App;
