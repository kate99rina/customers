
document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:3000/api/data')
    .then(response => response.json())
    .then(data => {
      data.forEach(row => {
        addRow(row);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});



function addRow(row) {

  const parent = document.getElementById('table');
  var newRow = document.createElement('tr');
  console.log(row.status);

  addStatus(row.status, newRow);

  addField(row.account_number, newRow);

  addField(row.surname, newRow);
  addField(row.name, newRow);

  addField(row.patronymic, newRow);
  addField(row.birth_date, newRow);
  addField(row.inn, newRow);


  parent.appendChild(newRow);
}

function addField(value, parent) {
  var t = document.createElement('td');
  t.textContent = value;
  parent.appendChild(t);
}


function addStatus(status, parentElement) {
  var t = document.createElement('td');
  var sel = document.createElement('select');
  var opt1 = document.createElement('option');
  opt1.textContent = 'Не в работе';
  var opt2 = document.createElement('option');
  opt2.textContent = 'В работе';
  var opt3 = document.createElement('option');
  opt3.textContent = 'Отказ';
  var opt4 = document.createElement('option');
  opt4.textContent = 'Сделка закрыта';

  sel.appendChild(opt1);
  sel.appendChild(opt2);
  sel.appendChild(opt3);
  sel.appendChild(opt4);

  sel.value = status;
  t.appendChild(sel);
  parentElement.appendChild(t);

}


