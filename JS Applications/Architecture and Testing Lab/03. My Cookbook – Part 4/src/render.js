import { hideAllSections, removeHiddenClass } from './utils.js';

export function viewSection(section) {
    hideAllSections();
    removeHiddenClass(section);
    section.classList.add('visible-block');
}
