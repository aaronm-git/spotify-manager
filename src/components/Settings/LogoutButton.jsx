import React from 'react';
import { Button } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
// contexts
import GlobalContext from '../../context/GlobalContext';

export default function LogoutButton() {
	const queryClient = useQueryClient();
	const history = useHistory();
	const { setTokenMetadata } = React.useContext(GlobalContext);
	const HandleLogOut = () => {
		queryClient.clear();
		setTokenMetadata(null);
		history.push('/authorize');
	};

	return (
		<Button variant="outline-danger" onClick={HandleLogOut}>
			<FontAwesomeIcon icon={solid('sign-out-alt')} />
			<span className="mx-2">Logout</span>
		</Button>
	);
}
