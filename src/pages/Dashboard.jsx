import { Redirect } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';

// Components
import SpotifyUserLibraryTable from '../components/Tables/SpotifyUserLibraryTable';

const Dashboard = () => {
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData('user');
	if (!user) {
		return <Redirect to="/" />;
	} else {
		return (
			<Card className="bg-dark text-white mt-2 shadow-lg">
				<Card.Body>
					<Card.Title className="fw-light border-bottom border-primary">Dashboard</Card.Title>
					<TrackLibrary />
				</Card.Body>
			</Card>
		);
	}
};

export default Dashboard;
