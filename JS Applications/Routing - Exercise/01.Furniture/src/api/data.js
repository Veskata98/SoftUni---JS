import * as api from './api.js';

const endpoints = {
    item: '/data/catalog/',
    allItems: '/data/catalog/',
    myItems: '/data/catalog',
};

export const getItem = async (id) => {
    return api.get(endpoints.item + id);
};

export const getItems = async () => {
    return api.get(endpoints.allItems);
};

export const getMyItems = async (id) => {
    return api.get(endpoints.myItems + `?where=_ownerId%3D%22${id}%22`);
};

export const createItem = async (data) => {
    return api.post(endpoints.item, data);
};

export const editItem = async (id, data) => {
    return api.put(endpoints.item + id, data);
};

export const deleteItem = async (id) => {
    return api.delete(endpoints.item + id);
};
