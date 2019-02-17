
function toloc() {
  var td = list.innerHTML
 localStorage.setItem('todos', td);
}
if (localStorage.getItem('todos')) {
  list.innerHTML = localStorage.getItem('todos')
}

document.querySelector('button').addEventListener(
  'click',
  function(event) {
    var newItem = document.createElement("li");
    var removeItem = document.createElement("button");
    var buttonChange = document.createElement("button");
    var buttonChangeSave = document.createElement("button");
    var buttonChangeCansel = document.createElement("button");
    var inputChange = document.createElement("input");
    var a = document.getElementById('item').value;
    removeItem.classList.add('remove');
    newItem.classList.add('item');
    buttonChange.classList.add('change');
    inputChange.classList.add('input-change');
    buttonChangeSave.classList.add('save');
    buttonChangeCansel.classList.add('cansel');
    newItem.innerHTML = '<span class="content">' + a + '</span>' 
    removeItem.innerHTML = 'Удалить';
    buttonChange.innerHTML = 'Изменить';
    buttonChangeSave.innerHTML = '';
    buttonChangeCansel.innerHTML = '';

    todo.insertBefore(newItem, todo.firstChild);
    newItem.insertBefore(inputChange, newItem.firsttChild);
    newItem.insertBefore(removeItem, newItem.lastChild);
    newItem.insertBefore(buttonChange, newItem.lasttChild);
    newItem.insertBefore(buttonChangeSave, newItem.lasttChild);
    newItem.insertBefore(buttonChangeCansel, newItem.lasttChild);

    inputChange.addEventListener('click', function(event) {
      event.stopPropagation();
    })
     
    newItem.addEventListener('click', check(newItem, buttonChange))

    removeItem.addEventListener('click', remove(newItem))


    buttonChange.addEventListener('click', change(buttonChange, buttonChangeSave, buttonChangeCansel, inputChange))

    buttonChangeSave.addEventListener('click', save(inputChange, newItem.childNodes[0], buttonChangeSave, buttonChangeCansel, buttonChange));

    buttonChangeCansel.addEventListener('click', cansel(buttonChange, buttonChangeCansel, buttonChangeSave, inputChange));

    toloc();
  }
)

//cansel
var canselItem = document.querySelectorAll('.cansel'),
  indexCansel, buttonCansel;

for (indexCansel = 0; indexCansel < canselItem.length; indexCansel++) {
  buttonCansel = canselItem[indexCansel];
  buttonCansel.addEventListener('click', cansel(buttonCansel.parentNode.childNodes[3],
    buttonCansel, buttonCansel.parentNode.childNodes[4], buttonCansel.parentNode.childNodes[2]
  ), )
}

function cansel(change, cansel, save, input) {
  return function(event) {
    event.stopPropagation();
    change.style.display = 'inline-block';
    cansel.style.display = 'none';
    save.style.display = 'none';
    input.style.opacity = '0'
    toloc();
  }
}

//save item
var itemSave = document.querySelectorAll('.save'),
  indexSave, buttonSave;

for (indexSave = 0; indexSave < itemSave.length; indexSave++) {
  buttonSave = itemSave[indexSave];
  buttonSave.addEventListener('click', save(buttonSave.parentNode.childNodes[2], buttonSave.parentNode.childNodes[0], buttonSave, buttonSave.parentNode.childNodes[5],
    buttonSave.parentNode.childNodes[3]
  ), )
  buttonSave.parentNode.childNodes[2].addEventListener('click', function(event) {
    event.stopPropagation();
  })
}

function save(input, item, button, cansel, change) {
  return function(event) {
    event.stopPropagation();
    if (input.value == '') {
      item.textContent = item.textContent;
    } else {
      item.textContent = input.value;
    }
    input.style.opacity = '0';
    button.style.display = 'none';
    cansel.style.display = 'none';
    change.style.display = 'inline-block';
    toloc();
  }
}

//change item
var itemChange = document.querySelectorAll('.change'),
  indexChange, btnChange;

for (indexChange = 0; indexChange < itemChange.length; indexChange++) {
  btnChange = itemChange[indexChange];
  btnChange.addEventListener('click', change(btnChange, btnChange.parentNode.childNodes[4], btnChange.parentNode.childNodes[5], btnChange.parentNode.childNodes[2]), )
}

function change(element, save, cansel, input) {
  return function(event) {
    event.stopPropagation();
    cansel.style.display = 'inline-block';
    save.style.display = 'inline-block';
    element.style.display = 'none';
    input.style.opacity = '1';
  }
}

var itemContent = document.querySelectorAll('.content'),
  indexContent, buttonContent;

for (indexContent = 0; indexContent < itemContent.length; indexContent++) {
  buttonContent = itemContent[indexContent];
  buttonContent.addEventListener('click', function(event) {
  event.stopPropagation();
  });
}

//check item
var item = document.querySelectorAll('.item'),
  index, button;

for (index = 0; index < item.length; index++) {
  button = item[index];
  button.addEventListener('click', check(button, button.childNodes[3]));
}

function check(element, change) {
  return function() {
    if (element.classList.contains("check")) {
      element.classList.remove('check');
      todo.insertBefore(element, todo.firstChild);
      change.style.display = 'inline-block'
    } else {
      element.classList.add('check');
      done.insertBefore(element, done.firstChild);
      change.style.display = 'none'
    }
    toloc();
  }
}

// remove item
var itemRemove = document.querySelectorAll('.remove'),
  indexRemove, buttonRemove;

for (indexRemove = 0; indexRemove < itemRemove.length; indexRemove++) {
  buttonRemove = itemRemove[indexRemove];
  buttonRemove.addEventListener('click', remove(buttonRemove.parentNode));
}

function remove(element) {
  return function(event) {
    event.stopPropagation();
    element.remove();
    toloc();
  }
}




