import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as dataService from '../services/dataService.js';

const commentsTemplate = (comment) => 
    html`
    <li class="comment">
        <p>Content: ${comment.comment}</p>
    </li>
`; 

const detailsTemplate = (game, isLoggedIn, isOwner, deleteHandler, addCommentHandler, comments) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src=${game.imageUrl} />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
    
            <p class="text">${game.summary}</p>

            <div class="details-comments">
                <h2>Comments:</h2>

                ${comments.length == 0 
                    ? html`<p class="no-comment">No comments.</p>`
                    : html` 
                        <ul>
                            ${comments.map(commentsTemplate)}
                        </ul>`
                }
            </div>
    
    
    
            <!-- Edit/Delete buttons ( Only for creator of this game )  -->
            ${isOwner 
                ? html` 
                    <div class="buttons">
                        <a href="/edit/${game._id}" class="button">Edit</a>
                        <a href="javascript:void(0)" @click=${deleteHandler} class="button">Delete</a>
                    </div>`
                 :nothing
            }

        </div>

            ${isLoggedIn && !isOwner 
                ? html` 
                    <article class="create-comment">
                        <label>Add new comment:</label>
                        <form class="form" @submit=${addCommentHandler}>
                            <textarea name="comment" placeholder="Comment......"></textarea>
                            <input class="btn submit" type="submit" value="Add Comment">
                        </form>
                    </article>`
                : nothing
            }

    </section>
`;


export const detailsView = async (ctx) => {
    const gameId = ctx.params.id;
    const game = await dataService.getById(gameId);

    const user = ctx.user;
    const isLoggedIn = user;
    const isOwner = user && user._id == game._ownerId;

    let comments = await dataService.allComments(gameId);
    

    ctx.render(detailsTemplate(game, isLoggedIn, isOwner, deleteHandler, addCommentHandler, comments));

    async function deleteHandler() {
        const choice = confirm('Are you sure you want to delete?');

        if (choice) {
            await dataService.del(gameId);
            ctx.page.redirect('/');
        }
    }

    async function addCommentHandler(e) {
        e.preventDefault();
        const comment = new FormData(e.currentTarget).get('comment');

        if (comment.length > 0){
            const commentData = {
                gameId,
                comment
            };
            e.currentTarget.reset();
            await dataService.createComment(commentData);

            comments = await dataService.allComments(gameId);
            ctx.render(detailsTemplate(game, isLoggedIn, isOwner, deleteHandler, addCommentHandler, comments));
        }
        
    }
}