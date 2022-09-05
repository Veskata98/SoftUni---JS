import * as api from './api.js';

const baseUrl = 'http://localhost:3030/data';

const endpoints = {
    all: '/posts?sortBy=_createdOn%20desc',
    one: (id) => `/posts/${id}`,
    myPosts: (userId) => `/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
    create: '/posts',

    donate: `/donations`,
    donationCount: (postId) => `/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    hasDonated: (postId, userId) => `/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
}

export const getAll = async () => {
    const data = await api.get(baseUrl + endpoints.all);
    return Object.values(data);
};

export const getMyPosts = async (userId) => {
    return await api.get(baseUrl + endpoints.myPosts(userId));
};

export const getDonationCount = async (postId) => {
    return await api.get(baseUrl + endpoints.donationCount(postId));
};

export const hasDonated = async (postId, userId) => {
    return await api.get(baseUrl + endpoints.hasDonated(postId, userId));
};

export const getOne = async (id) => {
    return await api.get(baseUrl + endpoints.one(id));
};

export const donate = async (data) => {
    return await api.post(baseUrl + endpoints.donate, data);
};

export const create = async (data) => {
    return await api.post(baseUrl + endpoints.create, data);
};

export const edit = async (id, data) => {
    return await api.put(baseUrl + endpoints.one(id), data);
};

export const del = async (id) => {
    return await api.delete(baseUrl + endpoints.one(id));
};
