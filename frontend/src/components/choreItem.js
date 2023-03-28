import React from 'react';

function ChoreItem({ choreItem }) {
	return (
		<div className="choreItem">
			<div>{choreItem.text}</div>
		</div>
	);
}

export default ChoreItem;
