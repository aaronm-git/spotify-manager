import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useAsyncDebounce } from 'react-table';

export default function GlobalFilter({ globalFilter, setGlobalFilter }) {
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 500);

	return (
		<Row>
			<Col lg="3">
				<Form.Control
					value={value || ''}
					type="text"
					placeholder="Search..."
					className="my-2"
					onChange={(e) => {
						setValue(e.target.value);
						onChange(e.target.value);
					}}
				/>
			</Col>
		</Row>
	);
}
