/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { css } from '@emotion/react';
import AlertContext from '../../context/alerts/context';

const AppAlert = () => {
	const alertContext = useContext(AlertContext);
	const { state: alert, setAlert } = alertContext;

	useEffect(() => {
		if (alert.show) {
			setTimeout(() => {
				setAlert('CLEAR');
			}, 5000);
		}
		// eslint-disable-next-line
	}, [alert.show]);

	return (
		<div id="app-alert" css={alertStyle}>
			<Alert variant={alert.variant} show={!alert.show}>
				{alert.icon} {alert.message}
			</Alert>
		</div>
	);
};

const alertStyle = css`
	position: absolute;
	bottom: 1rem;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	max-width: 800px;
	svg {
		margin-bottom: 0.25rem;
		margin-right: 0.5rem;
	}
`;

export default AppAlert;
