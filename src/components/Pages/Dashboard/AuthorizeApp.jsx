import React from 'react';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BsSpotify } from 'react-icons/bs';

import { Redirect } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const handleGetAuth = () => {
	const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
	const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
	const scopes = process.env.REACT_APP_SPOTIFY_SCOPES;
	const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
	window.location = url;
};

const AuthorizeApp = () => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData(['spotifyUser']);

	return user ? (
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
};

export default AuthorizeApp;
