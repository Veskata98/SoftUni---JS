import * as api from './api.js';

const baseUrl = 'http://localhost:3030/data';

const endpoints = {
    all: '/cars?sortBy=_createdOn%20desc',
    oneById: (id) => `/cars/${id}`,
    myCars: (userId) => `/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,

    create: '/cars',
    edit: (id) => `/cars/${id}`,
    del: (id) => `/cars/${id}`,

    search: (query) => `/cars?where=year%3D${query}`
}

export const getAll = async () => {
    const data = await api.get(baseUrl + endpoints.all);
    return Object.values(data);
};

export const getById = async (id) => {
    return await api.get(baseUrl + endpoints.oneById(id));
};

export const getMyCars = async (userId) => {
    return await api.get(baseUrl + endpoints.myCars(userId));
};


export const create = async (data) => {
    console.log(data);
    return await api.post(baseUrl + endpoints.create, data);
};

export const edit = async (id, data) => {
    return await api.put(baseUrl + endpoints.edit(id), data);
};

export const del = async (id) => {
    return await api.delete(baseUrl + endpoints.del(id));
};


export const search = async (query) => {
    return await api.get(baseUrl + endpoints.search(query));
};
