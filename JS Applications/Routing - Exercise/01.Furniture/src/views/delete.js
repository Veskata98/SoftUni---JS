import page from '../../node_modules/page/page.mjs';
import { deleteItem } from '../api/data.js';

export const deleteFurniture = async (ctx) => {
    const choice = confirm('Are you sure you want to delete this item?');
    if (choice) {
        deleteItem(ctx.params.id);
        page.redirect('/');
    }
};
