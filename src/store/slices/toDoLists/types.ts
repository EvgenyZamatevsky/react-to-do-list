import { ToDoListType } from "api/toDoLists/types"

export interface ToDoListsSliceInitialStateType {
  toDoLists: ToDoListSupplementedType[]
  titleSearchValue: string
  currentToDoList: ToDoListSupplementedType
}

export type ToDoListSupplementedType = ToDoListType & {
  filter: FilterValueType
  isDisabledToDoList: boolean
}

export type FilterValueType = "all" | "active" | "completed"
