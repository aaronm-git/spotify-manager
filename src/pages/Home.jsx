import React from 'react';
import AuthorizeApp from '../components/home/AuthorizeApp';

const Home = () => {
	console.log('process.envs', process.env);
	return <AuthorizeApp />;
};

export default Home;
