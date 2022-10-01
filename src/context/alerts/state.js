import { useReducer } from 'react';
import alertReducer from './reducer';
import AlertContext from './context';

const AlertContextProvider = (props) => {
	const [state, dispatch] = useReducer(alertReducer, {
		type: null,
		icon: null,
		message: '',
	});

	const setAlert = (type, message) => {
		dispatch({
			type,
			payload: message,
		});
	};

	return <AlertContext.Provider value={{ state, setAlert }}>{props.children}</AlertContext.Provider>;
};

export default AlertContextProvider;
