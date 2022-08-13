export function renderPosts() {
    getPosts();
}

const divPosts = document.querySelector('div.topic-container');

async function getPosts() {
    divPosts.replaceChildren();
    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
    const data = await res.json();

    Object.values(data).map((x) => {
        const post = document.createElement('div');
        post.classList = 'topic-name-wrapper';
        post.innerHTML = `
        <div class="topic-name">
            <a href="/post" id="${x._id}" class="normal">
                <h2>${x.topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>
                        Date: <time>${x.date}</time>
                    </p>
                    <div class="nick-name">
                        <p>
                            Username: <span>${x.username}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `;
        divPosts.appendChild(post);
    });
}
