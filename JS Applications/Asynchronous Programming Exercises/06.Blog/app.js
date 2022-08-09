function attachEvents() {
    const postsUrl = 'http://localhost:3030/jsonstore/blog/posts';
    const commentsUrl = 'http://localhost:3030/jsonstore/blog/comments';

    const postsSelect = document.getElementById('posts');
    const loadBtn = document.getElementById('btnLoadPosts');
    const viewBtn = document.getElementById('btnViewPost');
    const postTitle = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    loadBtn.addEventListener('click', loadPostsHandler);
    viewBtn.addEventListener('click', viewPostHandler);

    async function loadPostsHandler() {
        postsSelect.innerHTML = '';
        const postsRes = await fetch(postsUrl);
        const posts = await postsRes.json();

        Object.values(posts).forEach((post) => {
            const option = document.createElement('option');
            option.value = post.id;
            option.text = post.title;

            postsSelect.appendChild(option);
        });
    }

    async function viewPostHandler() {
        postComments.innerHTML = '';
        if (postsSelect.children.length) {
            const title = postsSelect.options[postsSelect.selectedIndex].text;
            const id = postsSelect.value;

            const viewPostRes = await fetch(`${commentsUrl}`);
            const viewPost = await viewPostRes.json();

            postTitle.textContent = title;

            Object.values(viewPost)
                .filter((p) => p.postId === id)
                .forEach((x) => {
                    const li = document.createElement('li');
                    li.setAttribute('id', x.id);
                    li.textContent = x.text;

                    postComments.appendChild(li);
                });
        }
    }
}

attachEvents();
