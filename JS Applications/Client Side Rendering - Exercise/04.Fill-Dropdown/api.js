const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

const getOptions = async () => {
    const response = await fetch(url);
    const options = await response.json();
    return Object.values(options);
};

const postData = async (text) => {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
    });
};

export { getOptions, postData };
