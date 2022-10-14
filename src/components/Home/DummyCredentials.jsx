import React from 'react';
// components
import Card from '../Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';

function handleCopy(key) {
	let value = '';
	switch (key) {
		case 'EMAIL':
			value = document.getElementById('copy-email').innerText;
			break;
		case 'PASSWORD':
			value = document.getElementById('copy-password').innerText;
			break;

		default:
			value = document.getElementById('copy-email').innerText;
			break;
	}
	navigator.clipboard.writeText(value);
}

export default function DummyCredentials() {
	return (
		<Card title="Dummy Account" text="Use these credentials in Spotify's Authorization screen">
			<p className="m-0">
				<strong>Email</strong>: <span id="copy-email">spotify-shortcuts@mailinator.com</span>
				<Button variant="link" onClick={() => handleCopy('EMAIL')}>
					<FontAwesomeIcon icon={solid('copy')} />
				</Button>
			</p>
			<p className="m-0">
				<strong>Password</strong>: <span id="copy-password">P@ssw0rd!</span>
				<Button variant="link" onClick={() => handleCopy('PASSWORD')}>
					<FontAwesomeIcon icon={solid('copy')} />
				</Button>
			</p>
		</Card>
	);
}
