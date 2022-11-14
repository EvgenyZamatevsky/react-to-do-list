import React, { FC, memo, useCallback, useEffect } from "react"
import Delete from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import { useAppDispatch } from "hooks"
import { changeToDoListTitle, getTasks, removeToDoList } from "store/asyncActions"
import { EditableItem, Tasks } from "components"
import { ToDoListItemPropsType } from "./types"

export const ToDoListItem: FC<ToDoListItemPropsType> = memo(({toDoListId, filter, isDisabledToDoList, title}) => {

  const dispatch = useAppDispatch()

  const handleChangeToDoListTitleClickOrBlur = useCallback((updatedTitle: string): void => {
    dispatch(changeToDoListTitle({toDoListId, toDoListTitle: updatedTitle}))
  }, [toDoListId])

  const onRemoveToDoListClick = (): void => {
    dispatch(removeToDoList(toDoListId))
  }

  useEffect(() => {
    dispatch(getTasks(toDoListId))
  }, [])

  return (
    <Paper sx={{position: "relative", padding: "10px"}}>
      <IconButton
        size={"small"}
        sx={{position: "absolute", right: "5px", top: "5px"}}
        disabled={isDisabledToDoList}
        onClick={onRemoveToDoListClick}
      >
        <Delete fontSize={"small"}/>
      </IconButton>
      <h3>
        <EditableItem
          currentTitle={title}
          updateValue={handleChangeToDoListTitleClickOrBlur}
          isDisabled={isDisabledToDoList}
        />
      </h3>
      <Tasks filter={filter} toDoListId={toDoListId} isDisabledToDoList={isDisabledToDoList}/>
    </Paper>
  )
})
