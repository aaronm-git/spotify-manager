import { useContext, useState } from 'react';
import AlertContext from '../context/alerts/AlertContext';

export const useAlert = () => {
	const alertContext = useContext(AlertContext);
	return { showAlert: alertContext.setAlert };
};
