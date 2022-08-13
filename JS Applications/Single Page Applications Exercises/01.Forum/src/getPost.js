import { writeComment } from './writeComment.js';

const main = document.querySelector('div.container > main');

export async function getPost(id) {
    const res = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${id}`);
    const data = await res.json();

    const section = document.createElement('section');
    section.innerHTML = `
        <div class="theme-content">
            <div class="theme-title">
                <div class="theme-name-wrapper">
                    <div class="theme-name">
                        <h2>${data.topicName}</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="comment">
            <div class="header">
                <img src="./static/profile.png" alt="avatar">
                <p><span>${data.username}</span> posted on 
                    <time>${data.date.substring(0, 10)} ${data.date.substring(11, 19)}</time>
                </p>

                <p class="post-content">${data.postText}</p>
            </div>
        </div>

        <div class="answer-comment" style="padding: 1em">
        <p><span>currentUser</span> comment:</p>
        <div class="answer">
            <form>
                <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
                <div>
                    <label for="username">Username <span class="red">*</span></label>
                    <input type="text" name="username" id="username">
                </div>
                <button>Post</button>
            </form>
        </div>
    </div>`;
    main.appendChild(section);

    writeComment(document.querySelector('div.answer > form'), data._id);
}
