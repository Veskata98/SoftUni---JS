import { getUser, clearUser, getToken } from "../utils/userUtils.js";

const request = async (method, url, data = null) => {
    const options = {
        method,
        headers: {},
    };

    if (getUser()) {
        options.headers['X-Authorization'] = getToken();
    }

    if (method != 'GET') {
        options.headers['Content-Type'] = 'application/json';
        if (data) {
            options.body = JSON.stringify(data);
        }
    }

    try {
        const response = await fetch(url, options);
        if (response.ok != true) {
            if (response.status == 403) {
                clearUser();
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return await response.json();
        }

    } catch (error) {

        // Comment if we have data/... POST method (can crash last 2 tests of bonus)
        return error.message;
    }
};

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export { get, post, put, del as delete };
