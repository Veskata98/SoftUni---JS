import * as api from './api.js';

const endpoints = {
    ideas: '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    createIdea: '/data/ideas',
    details: '/data/ideas/',
};

export async function getIdeas() {
    return api.get(endpoints.ideas);
}

export async function createIdea(data) {
    return api.post(endpoints.createIdea, data);
}

export async function getDetails(id) {
    return api.get(endpoints.details + id);
}

export async function deleteIdea(id) {
    return api.delete(endpoints.details + id);
}
