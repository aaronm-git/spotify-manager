import { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsSpotify } from 'react-icons/bs';
import { useQueryClient } from '@tanstack/react-query';
import { useAlert } from '../../hooks/alert';

// api
import { getAppAuthorization } from '../../api/spotify';

export default function AuthorizeApp() {
	const queryClient = useQueryClient();
	const { showAlert } = useAlert();
	const location = useLocation();
	const token = queryClient.getQueryData(['authorization'])?.accessToken;

	useEffect(() => {
		if (location.state?.alert) {
			showAlert(location.state.alert[0], location.state.alert[1]);
		}
	}, [location]);

	return token ? (
		<Redirect to="/dashboard" />
	) : (
		<Container className="mt-5">
			<Row>
				<Col md={{ span: 8, offset: 2 }}>
					<Card className="bg-dark">
						<Card.Body>
							<Card.Title className="border-bottom border-primary">Authorization Required</Card.Title>
							<div className="text-center">
								<Button className="btn-lg my-3" onClick={getAppAuthorization}>
									Authorize App <BsSpotify className="icon" />
								</Button>
								<small className="text-muted d-block">
									Please login using your Spotify account in order to use this app.
								</small>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
