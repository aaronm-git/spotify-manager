import { Spinner, Card } from 'react-bootstrap';

const Loading = () => {
	return (
		<Card bg="dark" className="py-2">
			<Card.Body className="text-center">
				<Spinner className="d-block mx-auto mb-2" animation="border" role="status" variant="primary" />
				<span>Loading...</span>
			</Card.Body>
		</Card>
	);
};

export default Loading;
