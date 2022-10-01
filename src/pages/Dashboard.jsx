import { Card } from 'react-bootstrap';
import TrackLibrary from '../components/SpotifySavedTracksLibraryTable';
import { useQueryClient } from '@tanstack/react-query';
import { Redirect } from 'react-router-dom';

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
