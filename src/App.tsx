import React, { FC, ReactElement, useEffect } from "react"
import Container from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"
import { ErrorSnackbar, Header, AppRouter } from "components"
import { useAppDispatch } from "hooks"
import { useSelector } from "react-redux"
import { selectIsInitialized } from "store/selectors/app"
import { getAuthorizedUserData } from "store/asyncActions"

export const App: FC = (): ReactElement => {

  const dispatch = useAppDispatch()

  const isInitialized = useSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(getAuthorizedUserData())
  }, [])

  if (!isInitialized) {
    return <div className="preloader"><CircularProgress/></div>
  }

  return (
    <div className="app">
      <Header/>
      <Container fixed maxWidth={"xl"}>
        <AppRouter/>
      </Container>
      <ErrorSnackbar/>
    </div>
  )
}
