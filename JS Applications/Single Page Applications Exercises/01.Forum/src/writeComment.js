export function writeComment(el, post_id) {
    el.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const postText = formData.get('postText');
        const username = formData.get('username');
        const date = new Date();

        if (username != '' && postText != '') {
            const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postText, username, date, post_id }),
            });

            const data = await res.json();

            const newComment = document.createElement('div');
            newComment.setAttribute('id', 'user-comment');
            newComment.innerHTML = `
                <div class="topic-name-wrapper">
                    <div class="topic-name">
                        <p>
                            <strong>${data.username}</strong> commented on 
                            <time>${data.date.substring(0, 10)} ${data.date.substring(11, 19)}</time>
                        </p>
                        <div class="post-content">
                            <p>
                                ${data.postText}
                            </p>
                        </div>
                    </div>
                </div>
            `;
            document.querySelector('.comment').appendChild(newComment);
        }
    });
}
