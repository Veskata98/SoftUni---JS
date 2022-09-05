import * as api from './api.js';

const baseUrl = 'http://localhost:3030/data';

const endpoints = {
    all: '/books?sortBy=_createdOn%20desc',
    getById: (id) => `/books/${id}`,
    getMyBooks: (userId) => `/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,

    create: '/books',
    edit: (id) => `/books/${id}`,
    del: (id) => `/books/${id}`,

    like: '/likes',
    likesCount: (bookId) => `/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`,
    hasLiked: (bookId, userId) => `/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export const getAll = async () => {
    const data = await api.get(baseUrl + endpoints.all);
    return Object.values(data);
};

export const getById = async (id) => {
    return await api.get(baseUrl + endpoints.getById(id));
};

export const getMyBooks = async (userId) => {
    return await api.get(baseUrl + endpoints.getMyBooks(userId));
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
    return await api.post(baseUrl + endpoints.like, data);
};

export const likesCount = async (bookId) => {
    return await api.get(baseUrl + endpoints.likesCount(bookId));
};

export const hasLiked = async (bookId, userId) => {
    return await api.get(baseUrl + endpoints.hasLiked(bookId, userId));
};
