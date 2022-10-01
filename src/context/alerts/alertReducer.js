import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function alertReducer(state, action) {
	switch (action.type) {
		case 'SUCCESS':
			return {
				variant: 'success',
				icon: <FaCheckCircle />,
				message: action.payload,
				show: true,
			};

		case 'ERROR':
			return {
				variant: 'error',
				icon: <FaTimesCircle />,
				message: action.payload,
				show: true,
			};

		case 'INFO':
			return {
				variant: 'info',
				icon: <FaInfoCircle />,
				message: action.payload,
				show: true,
			};

		case 'WARNING':
			return {
				variant: 'warning',
				icon: <FaExclamationTriangle />,
				message: action.payload,
				show: true,
			};

		case 'CLEAR':
			return {
				...state,
				show: false,
			};

		default:
			return state;
	}
}
