const getUser = () => localStorage.getItem('user');
const saveUser = (user) => localStorage.setItem('user', JSON.stringify(user));
const clearUser = () => localStorage.removeItem('user');

const request = async (method, url, data = null) => {
    const options = {
        method,
        headers: {},
    };

    if (getUser()) {
        const accessToken = JSON.parse(getUser()).accessToken;
        options.headers['X-Authorization'] = accessToken;
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
        alert(error);
        throw error;
    }
};

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export { getUser, get, post, put, del as delete };
