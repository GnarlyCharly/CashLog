import request from 'superagent';

export default function callApi(method: string, endpoint: string, data: ?Object = {}) {
	function finish(resolve, reject) {
		return (err, res) => {
			if(err) {
				if(err.response && err.response.body) {
					return reject({ body: err.response.body});
				}

				let message = err;
				if(err.message) {
					message = err.message;
				}
				reject({ message, endpoint });
				return;
			} else if(res.body && (res.body.ErrorMessage || res.body.errorMessage)) {
				reject({ message: res.body.ErrorMessage || res.body.errorMessage, endpoint});
			}

			resolve(res.body);
		};
	}

	return new Promise((resolve, reject) => {
		request[method](toMountedUrl(endpoint))
			.send(data)
			.set('Accept', 'application/json')
			.end(finish(resolve, reject));
	});
}

function toMountedUrl(url) {
	return './api/index.php' + url;
}
