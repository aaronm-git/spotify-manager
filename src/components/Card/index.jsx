import React from 'react';
// components
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function index({ title, text, children }) {
	return (
		<Container className="mt-5">
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<Card className="bg-dark">
						<Card.Body>
							<Card.Title className="border-bottom border-primary">{title}</Card.Title>
							<Card.Text style={{ fontSize: '.75rem' }}>{text}</Card.Text>
							{children}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
