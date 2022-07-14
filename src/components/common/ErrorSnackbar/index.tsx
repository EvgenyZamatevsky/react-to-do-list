import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useTypedDispatch } from 'hooks'
import { useSelector } from 'react-redux'
import { selectError } from 'redux/app/selectors'
import { setError } from 'redux/app/slice'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {

	const dispatch = useTypedDispatch()

	const error = useSelector(selectError)

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(setError(null))
	}

	return (
		<Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
			<Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
				{error}
			</Alert>
		</Snackbar>
	)
}
