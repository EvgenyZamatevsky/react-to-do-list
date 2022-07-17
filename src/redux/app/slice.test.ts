import { EMPTY_STRING } from 'constants/base'
import appSlice, { setErrorMessage } from 'redux/app/slice'
import { AppSliceInitialStateType } from './types'

let startState: AppSliceInitialStateType

beforeEach(() => {
	startState = {
		errorMessage: EMPTY_STRING,
		isLoading: false,
		isInitializedApp: false
	}
})

test('correct error message should be set', (() => {
	const endState = appSlice(startState, setErrorMessage('my error!'))

	expect(endState.errorMessage).toBe('my error!')
}))
