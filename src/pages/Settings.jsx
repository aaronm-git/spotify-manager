import React from 'react';
// components
import { Container, Card, Button } from 'react-bootstrap';
import LogoutButton from '../components/settings/LogoutButton';

const Settings = () => {
	return (
		<Container className="mt-2">
			<Card className="bg-dark text-white">
				<Card.Body>
					<Card.Title className="fw-light border-bottom border-primary">Settings</Card.Title>
					<div className="text-end">
						<LogoutButton />
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Settings;
