import { Fragment } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { BsSpotify, BsFillGearFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
	const user = useQueryClient(['user']);

	return (
		<Fragment>
			<Navbar bg="black" variant="dark">
				<Container className="position-relative">
					<Link to="/" className="mx-auto navbar-brand">
						<span className="fw-bold">SPOTIFY SHORTCUTS</span>
						<BsSpotify className="icon" />
					</Link>
				</Container>
			</Navbar>
			{user && (
				<div className="bg-primary py-2">
					<Container>
						<p className="text-dark text-end m-0">
							Logged in as: <strong>{user.display_name}</strong>
							<Link to="/settings" className="text-dark">
								<BsFillGearFill className="icon" />
							</Link>
						</p>
					</Container>
				</div>
			)}
		</Fragment>
	);
};

export default Header;
