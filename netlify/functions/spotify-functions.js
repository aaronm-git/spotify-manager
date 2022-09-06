exports.handler = async function (event, context) {
	const queryStringParameters = JSON.parse(event.body);
	console.log(queryStringParameters);
};
