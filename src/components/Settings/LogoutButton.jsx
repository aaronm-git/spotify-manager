import React from 'react';
import { Button } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';

const HandleLogOut = () => useQueryClient().clear();

export default function LogoutButton() {
	return <Button onClick={HandleLogOut}>LogoutButton</Button>;
}
