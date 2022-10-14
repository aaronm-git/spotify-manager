import React from 'react';
// components
import AuthorizeApp from '../components/home/AuthorizeApp';
import DummyCredentials from '../components/home/DummyCredentials';

export default function Home() {
	return (
		<>
			<AuthorizeApp />
			<DummyCredentials />
		</>
	);
}
