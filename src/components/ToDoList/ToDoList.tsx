import React, { FC, memo, useCallback, useEffect } from 'react'
import { Delete } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { TaskStatus, TaskType } from '../../api/tasksAPI'
import { useTypedDispatch } from '../../redux/store'
import { addTaskTC, getTasksTC } from '../../redux/tasksReducer'
import { changeToDoListTitleTC, removeToDoListTC, changeToDoListFilterAC, ToDoListSupplementedType } from '../../redux/toDoListsReducer'
import { AddItemForm } from '../AddItemForm/AddItemForm'
import { EditableSpan } from '../EditableSpan/EditableSpan'
import { Task } from '../Task/Task'

type ToDoListPropsType = {
	toDoList: ToDoListSupplementedType
	tasks: Array<TaskType>
}

export const ToDoList: FC<ToDoListPropsType> = memo(({ toDoList, tasks }) => {

	const dispatch = useTypedDispatch()

	useEffect(() => {
		dispatch(getTasksTC(toDoList.id))
	}, [])

	const removeToDoList = () => {
		dispatch(removeToDoListTC(toDoList.id))
	}

	const addTask = useCallback((title: string) => {
		dispatch(addTaskTC(toDoList.id, title))
	}, [toDoList.id, dispatch])

	const changeToDoListTitle = useCallback((newToDoListTitle: string) => {
		dispatch(changeToDoListTitleTC(toDoList.id, newToDoListTitle))
	}, [toDoList.id, dispatch])

	const onClickAllHandler = () => {
		dispatch(changeToDoListFilterAC(toDoList.id, 'all'))
	}

	const onClickActiveHandler = () => {
		dispatch(changeToDoListFilterAC(toDoList.id, 'active'))
	}

	const onClickCompletedHandler = () => {
		dispatch(changeToDoListFilterAC(toDoList.id, 'completed'))
	}

	let filteredTasks = tasks
	if (toDoList.filter === 'active') {
		filteredTasks = tasks.filter(t => t.status === TaskStatus.Active)
	}
	if (toDoList.filter === 'completed') {
		filteredTasks = tasks.filter(t => t.status === TaskStatus.Completed)
	}

	return (
		<div>
			<h3>
				<EditableSpan title={toDoList.title} onChange={changeToDoListTitle} />
				<IconButton onClick={removeToDoList} disabled={toDoList.disabledStatus === 'loading'}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} disabledStatus={toDoList.disabledStatus} />
			<div>
				{filteredTasks.map(t => <Task key={t.id} disabledStatus={toDoList.disabledStatus} task={t} />)}
			</div>
			<div style={{ paddingTop: '10px' }}>
				<Button onClick={onClickAllHandler} variant={toDoList.filter === 'all' ? 'outlined' : 'text'} color={'primary'}>All</Button>
				<Button onClick={onClickActiveHandler} variant={toDoList.filter === 'active' ? 'outlined' : 'text'} color={'primary'}>Active</Button>
				<Button onClick={onClickCompletedHandler} variant={toDoList.filter === 'completed' ? 'outlined' : 'text'} color={'primary'}>Completed</Button>
			</div>
		</div>
	)
})