import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Menu } from '@mui/icons-material'
import { LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectIsLoading } from 'redux/app/selectors'

export const Header = () => {

	const isLoading = useSelector(selectIsLoading)

	return (
		<AppBar position='fixed' >
			<Toolbar >
				<IconButton edge='start' color='inherit' aria-label='menu'>
					<Menu />
				</IconButton>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					To-Do List
				</Typography>
				<Button color='inherit'>Log out</Button>
			</Toolbar>
			{isLoading && <LinearProgress />}
		</AppBar>
	)
}
