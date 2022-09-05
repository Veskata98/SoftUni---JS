import * as api from './api.js';

const baseUrl = 'http://localhost:3030/data/';

const endpoints = {
    getAll: 'pets?sortBy=_createdOn%20desc&distinct=name',
    getById: (id) => `pets/${id}`,
    create: 'pets',
    edit: (id) => `pets/${id}`,
    delete: (id) => `pets/${id}`,
    donate: 'donation',
    allDonationCount: (petId) => `donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    hasDonated: (petId, userId) => `donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}


export const getAll = async () => {
    const data = await api.get(baseUrl + endpoints.getAll);
    return Object.values(data);
};

export const getById = async (id) => {
    return await api.get(baseUrl + endpoints.getById(id));
};

export const create = async (data) => {
    return await api.post(baseUrl + endpoints.create, data);
};

export const edit = async (id, data) => {
    return await api.put(baseUrl + endpoints.edit(id), data);
};

export const del = async (id) => {
    return await api.delete(baseUrl + endpoints.delete(id));
};

export const donate = async (data) => {
    return await api.post(baseUrl + endpoints.donate, data);
};

export const donationCount = async (petId) => {
    return await api.get(baseUrl + endpoints.allDonationCount(petId));
};

export const hasDonated = async (petId, userId) => {
    return await api.get(baseUrl + endpoints.hasDonated(petId, userId));
};
