function generateReport() {
  let textAreaElement = document.getElementById('output');
  let checkedElements = document.querySelectorAll('thead tr th input');
  let rowDataElements = document.querySelectorAll('tbody tr');

  let res = [];

  for (let i = 0; i < rowDataElements.length; i++) {
    let tempObj = {};
    for (let j = 0; j < checkedElements.length; j++) {
      if (checkedElements[j].checked) {
        tempObj[checkedElements[j].name] =
          rowDataElements[i].children[j].textContent;
      }
    }
    res.push(tempObj);
  }

  textAreaElement.textContent = JSON.stringify(res);
}
