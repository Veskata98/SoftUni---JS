function hideContent(element) {
    element.style.display = 'none';
}

function showContent(element) {
    element.style.display = 'block';
}

function monthToNumber(month) {
    const monthNum = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sept: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12,
    };

    return monthNum[month];
}

export { hideContent, showContent, monthToNumber };
