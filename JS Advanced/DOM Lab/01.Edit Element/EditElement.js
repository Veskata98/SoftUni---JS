function editElement(ref, match, replacer) {
  let regEx = new RegExp(match, "g");
  ref.textContent = ref.textContent.replace(regEx, replacer);
}
