import * as api from './api.js';

const baseUrl = 'http://localhost:3030/data';

const endpoints = {
    recentGames: '/games?sortBy=_createdOn%20desc&distinct=category',
    all: '/games?sortBy=_createdOn%20desc',
    getById: (id) => `/games/${id}`,

    create: '/games',
    edit: (id) => `/games/${id}`,
    del: (id) => `/games/${id}`,

    allComments: (gameId) => `/comments?where=gameId%3D%22${gameId}%22`,
    createComment: '/comments',
}

export const getRecentGames = async () => {
    return await api.get(baseUrl + endpoints.recentGames);
};


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


export const allComments = async (gameId) => {
    return await api.get(baseUrl + endpoints.allComments(gameId));
};

export const createComment = async (data) => {
    return await api.post(baseUrl + endpoints.createComment, data);
};
