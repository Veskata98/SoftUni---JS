function createSortedList() {
    let list = [];

    return {
        size,
        add(el) {
            list.push(el);
            list = list.sort((a, b) => a - b);
        },
        remove(index) {
            if (list[index] !== undefined) {
                list.splice(index, 1);
            }
        },
        get(index) {
            if (list[index] !== undefined) {
                return list[index];
            }
        },
        get size() {
            return list.length;
        }
    }
}


let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));
