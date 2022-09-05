import * as api from './api.js';

const baseUrl = 'http://localhost:3030/data';

const endpoints = {
    all: '/albums?sortBy=_createdOn%20desc&distinct=name',
    getById: (id) => `/albums/${id}`,

    create: '/albums',
    edit: (id) => `/albums/${id}`,
    del: (id) => `/albums/${id}`,

    search: (query) => `/albums?where=name%20LIKE%20%22${query}%22`
}

export const getAll = async () => {
    const data = await api.get(baseUrl + endpoints.all);
    return Object.values(data);
};

export const getById = async (id) => {
    return await api.get(baseUrl + endpoints.getById(id));
};



export const create = async (data) => {
    return await api.post(baseUrl + endpoints.create, data);
};

export const edit = async (id, data) => {
    return await api.put(baseUrl + endpoints.getById(id), data);
};

export const del = async (id) => {
    return await api.delete(baseUrl + endpoints.getById(id));
};


export const search = async (query) => {
    return await api.get(baseUrl + endpoints.search(query));
};
