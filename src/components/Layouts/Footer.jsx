import React from 'react';
// components
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
	return (
		<Container>
			<Row>
				<Col className="text-center py-3">
					<span>
						Return to <a href="https://www.aaronmolina.me">aaronmolina.me</a>
					</span>
				</Col>
			</Row>
		</Container>
	);
}
