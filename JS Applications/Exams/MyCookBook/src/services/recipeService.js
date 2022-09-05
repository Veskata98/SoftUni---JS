import * as api from './apiService.js';

const baseUrl = 'http://localhost:3030/data/recipes';

const pageSize = 5;

export const getAll = async () => {
    const data = await api.get(baseUrl + '?select=_id%2Cname%2Cimg');
    return Object.values(data);
};

export const getOne = async (id) => {
    return await api.get(baseUrl + `/${id}`);
};

export const getLastThree = async () => {
    return await api.get(baseUrl + '?select=_id%2Cname%2Cimg&sortBy=_createdOn%20desc&pageSize=3');
};

export const getPaginatedRecipes = async (page = 1) => {
    return await api.get(baseUrl + `?select=_id%2Cname%2Cimg&offset=${(page - 1) * pageSize}&pageSize=${pageSize}`);
};

export const search = async (queryText, page = 1) => {
    return await api.get(baseUrl + `?where=name%20LIKE%20%22${queryText}%22&offset=${(page - 1) * pageSize}&pageSize=${pageSize}`);
};

export const searchCount = async (queryText) => {
    const recipes = await api.get(baseUrl + `?where=name%20LIKE%20%22${queryText}%22`);
    return recipes.length;
};

export const getPages = async () => {
    const count = await api.get(baseUrl + '?count');
    const pages = Math.ceil(count / pageSize);
    return pages;
};

export const create = async (data) => {
    return await api.post(baseUrl, data);
};

export const update = async (id, data) => {
    return await api.put(baseUrl + `/${id}`, data);
};

export const del = async (id) => {
    return await api.delete(baseUrl + `/${id}`);
};
