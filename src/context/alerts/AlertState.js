import { useReducer } from 'react';
import AlertContext from './AlertContext';
import alertReducer from './alertReducer';

export default function AlertContextProvider(props) {
	const [state, dispatch] = useReducer(alertReducer, {
		type: null,
		icon: null,
		show: false,
		message: '',
	});

	const setAlert = (type, message) => {
		dispatch({
			type,
			payload: message,
		});
	};

	return <AlertContext.Provider value={{ state, setAlert }}>{props.children}</AlertContext.Provider>;
}
