import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Callback from './pages/Callback';
import NotFoundPage from './pages/404';

// Components
import PrivateRoute from './components/App/PrivateRoute';
import AppAlert from './components/Layouts/AppAlert';
import Header from './components/Layouts/Header';

// Contexts
import AlertContextProvider from './context/alerts/AlertState';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AlertContextProvider>
				<AppAlert />
				<Router>
					<Header />
					<Container className="mt-3" fluid>
						<Switch>
							<Route exact path={['/', '/authorize']} component={Home} />
							<Route exact path="/callback" component={Callback} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<Route exact path="/settings" component={Settings} />
							<Route path="*" component={NotFoundPage} />
						</Switch>
					</Container>
				</Router>
			</AlertContextProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
