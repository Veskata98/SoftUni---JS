export async function getAllComments(id) {
    const res = await fetch('http://localhost:3030/jsonstore/collections/myboard/comments');
    const data = await res.json();

    Object.values(data)
        .filter((comment) => comment.post_id === id)
        .forEach((data) => {
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
        });
}
