import React from 'react';
// components
import ContentLayer from './ContentLayer';
import { Card } from 'react-bootstrap';
import Loading from '../layouts/Loading';

export default function BodyLayer(props) {
	return (
		<Card className="bg-dark text-white mt-2 shadow-lg">
			<Card.Body>
				<Card.Title className="fw-light border-bottom border-primary">Dashboard</Card.Title>
				{props.isLoading ? <Loading /> : props.isError ? <p>error</p> : <ContentLayer />}
			</Card.Body>
		</Card>
	);
}
