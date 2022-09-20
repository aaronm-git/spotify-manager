import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AppAlert from './components/layout/AppAlert';
// import Settings from "./pages/Settings";
// import TrackData from "../3-tracks.json";
// import TrackData from "./all-my-tracks.json";
import { GlobalState } from './context/GlobalContext';
import SpotifyState from './context/spotify/spotifyState';
import Callback from './pages/Callback';
import NotFoundPage from './pages/404';
import PrivateRoute from './components/App/PrivateRoute';
import { Container } from 'react-bootstrap';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalState>
				<SpotifyState>
					<AppAlert />
					<Router>
						<Header />
						<Container className="mt-3" fluid>
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/callback" component={Callback} />
								<PrivateRoute exact path="/dashboard" component={Dashboard} />
								{/* <Route exact path="/settings" component={Settings} /> */}
								<Route path="*" component={NotFoundPage} />
							</Switch>
						</Container>
					</Router>
				</SpotifyState>
			</GlobalState>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
