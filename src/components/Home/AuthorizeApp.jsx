import { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsSpotify } from 'react-icons/bs';
import { useQueryClient } from '@tanstack/react-query';
import { useAlert } from '../../hooks/alert';

const handleGetAuth = () => {
	const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
	const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
	const scopes = process.env.REACT_APP_SPOTIFY_SCOPES;
	const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
	window.location = url;
};

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
								<Button className="btn-lg my-3" onClick={handleGetAuth}>
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
