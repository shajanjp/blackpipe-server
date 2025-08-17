const socket = io.connect(window.location.origin);
const outputContainer = document.getElementById("output");
const clearAction = document.getElementById("action-clear");
const autoScrollSwitch = document.getElementById("action-autoscroll");
let autoScrollEnabled = true;

clearAction.onclick = () => {
  outputContainer.innerHTML = '';
}

autoScrollSwitch.onclick = (element) => {
  if(element.target.className.split(' ').indexOf('active') !== -1){
    autoScrollEnabled = false;
    alterClass(element.target, 'active', false);
  } else {
    autoScrollEnabled = true;
    alterClass(element.target, 'active', true);
  }
}

let filterItems = document.getElementById('filter-attributes');

function alterClass(element, classname, insert) {
  let currentClass = element.className.split(" ");
  if(insert == true){
    currentClass.push(classname);
    element.className = currentClass.join(' '); 
  } 
  else {
    while(currentClass.indexOf(classname) !== -1) {
      currentClass.splice(currentClass.indexOf(classname), 1);
    }
    element.className = currentClass.join(' ');
  }
}

filterItems.onclick = (item) => {
  if(item.target.getAttribute('data-enabled') == "0"){
    alterClass(item.target, 'active', true);
    item.target.setAttribute('data-enabled', "1");
  } else {
    alterClass(item.target, 'active', false);
    item.target.setAttribute('data-enabled', "0");
  }
  
  console.log('item', item);
}

socket.on('connect', function(){
  console.log('connected');
  console.log('sessionId', sessionId);
});

socket.on(sessionId, (data) => {
  let textnode = document.createTextNode(data.chunk);
  
  outputContainer.appendChild(textnode);
  
  if(autoScrollEnabled){
    outputContainer.scrollTop = outputContainer.scrollHeight;
  }
});