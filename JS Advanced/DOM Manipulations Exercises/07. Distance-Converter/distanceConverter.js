function attachEventsListeners() {
  let buttonElement = document.getElementById('convert');
  buttonElement.addEventListener('click', () => {
    let inputValue = document.getElementById('inputDistance').value;
    let inputUnit = document.getElementById('inputUnits').value;

    let outputValue = document.getElementById('outputDistance');
    let outputUnit = document.getElementById('outputUnits').value;

    let units = {
      km: 1000,
      m: 1,
      cm: 0.01,
      mm: 0.001,
      mi: 1609.34,
      yrd: 0.9144,
      ft: 0.3048,
      in: 0.0254,
    };

    let inputInMeters = inputValue * units[inputUnit];

    outputValue.value = inputInMeters / units[outputUnit];
  });
}
