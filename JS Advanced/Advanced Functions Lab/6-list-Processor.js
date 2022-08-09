function solve(array) {
  let myList = listCreator();

  for (const command of array) {
    if (command === 'print') {
      myList.print();
      continue;
    }
    let [option, name] = command.split(' ');

    if (option === 'add') {
      myList.add(name);
    } else if (option === 'remove') {
      myList.remove(name);
    }
  }

  function listCreator() {
    let list = [];
    return {
      add(name) {
        list.push(name);
      },
      remove(name) {
        list = list.filter((x) => x !== name);
      },
      print() {
        console.log(list.join(','));
      },
    };
  }
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);
