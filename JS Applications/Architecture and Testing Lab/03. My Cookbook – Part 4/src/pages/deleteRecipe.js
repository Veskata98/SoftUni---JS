import { catalog } from './catalog.js';
import { delRecipe } from '../api.js';

export async function deleteRecipe(id) {
    if (confirm('Press Ok to confirm deletion')) {
        await delRecipe(id);

        alert('Successful Deleted');
        catalog();
    }
}
