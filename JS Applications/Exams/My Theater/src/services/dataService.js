import * as api from './api.js';

const baseUrl = 'http://localhost:3030/data';

const endpoints = {
    all: '/theaters?sortBy=_createdOn%20desc&distinct=title',
    getById: (id) => `/theaters/${id}`,
    myTheaters: (userId) => `/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,

    create: '/theaters',
    edit: (id) => `/theaters/${id}`,
    del: (id) => `/theaters/${id}`,

    like: '/likes',
    likesCount: (theaterId) => `/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`,
    hasLiked: (theaterId, userId) => `/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export const getAll = async () => {
    const data = await api.get(baseUrl + endpoints.all);
    return Object.values(data);
};

export const getById = async (id) => {
    return await api.get(baseUrl + endpoints.getById(id));
};

export const getMyTheaters = async (userId) => {
    return await api.get(baseUrl + endpoints.myTheaters(userId));
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


export const like = async (data) => {
    await api.post(baseUrl + endpoints.like, data);
};

export const likesCount = async (theaterId) => {
    return await api.get(baseUrl + endpoints.likesCount(theaterId));
};

export const hasLiked = async (theaterId, userId) => {
    return await api.get(baseUrl + endpoints.hasLiked(theaterId, userId));
};
