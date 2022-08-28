import { getUser } from './utils.js';

const recipesUrl = 'http://localhost:3030/data/recipes';
const usersUrl = 'http://localhost:3030/users/';

const postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

const putOptions = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
};

const deleteOptions = {
    method: 'DELETE',
    headers: {},
};

async function responseErrorCheck(res) {
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
    }
}

export async function getRecipesCount() {
    try {
        const res = await fetch(`${recipesUrl}?count`);

        await responseErrorCheck(res);

        return await res.json();
    } catch (err) {
        alert(err);
    }
}
export async function getRecipes(offset) {
    try {
        const res = await fetch(`${recipesUrl}?select=_id%2Cname%2Cimg&offset=${offset}&pageSize=5`);

        await responseErrorCheck(res);

        return await res.json();
    } catch (err) {
        alert(err);
    }
}

export async function getRecipe(id) {
    try {
        const res = await fetch(`${recipesUrl}/${id}`);

        await responseErrorCheck(res);

        return await res.json();
    } catch (err) {
        alert(err);
    }
}

export async function loginUser(email, password) {
    try {
        postOptions.headers = {
            'Content-Type': 'application/json',
        };
        postOptions.body = JSON.stringify({ email, password });

        const res = await fetch(`${usersUrl}/login`, postOptions);

        await responseErrorCheck(res);

        return await res.json();
    } catch (err) {
        alert(err);
    }
}

export async function registerUser(email, password) {
    try {
        postOptions.headers = {
            'Content-Type': 'application/json',
        };
        postOptions.body = JSON.stringify({ email, password });
        const res = await fetch(`${usersUrl}/register`, postOptions);

        await responseErrorCheck(res);

        return await res.json();
    } catch (err) {
        alert(err);
    }
}

export async function addRecipe(name, img, ingredients, steps) {
    postOptions.headers['X-Authorization'] = getUser().accessToken;
    postOptions.body = JSON.stringify({
        name,
        img,
        ingredients: ingredients.trim().split('\n'),
        steps: steps.trim().split('\n'),
    });

    try {
        const res = await fetch(recipesUrl, postOptions);
        await responseErrorCheck(res);
    } catch (err) {
        alert(err);
    }
}

export async function updateRecipe(recipeId, name, img, ingredients, steps) {
    putOptions.headers['X-Authorization'] = getUser().accessToken;
    putOptions.body = JSON.stringify({
        name,
        img,
        ingredients: ingredients.trim().split('\n'),
        steps: steps.trim().split('\n'),
    });

    try {
        const res = await fetch(`${recipesUrl}/${recipeId}`, putOptions);
        await responseErrorCheck(res);
    } catch (err) {
        alert(err);
    }
}

export async function delRecipe(recipeId) {
    deleteOptions.headers['X-Authorization'] = getUser().accessToken;

    try {
        const res = await fetch(`${recipesUrl}/${recipeId}`, deleteOptions);
        await responseErrorCheck(res);
    } catch (err) {
        alert(err);
    }
}
