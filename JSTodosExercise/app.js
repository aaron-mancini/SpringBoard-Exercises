const form = document.querySelector('#toDoForm');
const input = document.querySelector('input');
const list = document.querySelector('#toDoList');


const toDoList = JSON.parse(localStorage.getItem("todolist")) || [];
for(let i = 0; i < toDoList.length; i++){
    let listItem = document.createElement('li');
    const RemoveBtn = document.createElement('button');
    listItem.innerText = toDoList[i].taskItem;
    listItem.complete = toDoList[i].complete ? true : false;
    RemoveBtn.innerText = 'Remove';
    list.append(listItem);
    if(toDoList.complete) {
        listItem.classList.add('completed');
    }
    listItem.append(RemoveBtn);
}



form.addEventListener('submit', function(e){
    e.preventDefault();
    const userInput = input.value;
    let listItem = document.createElement('li');
    let RemoveBtn = document.createElement('button');
    listItem.innerText = userInput;
    RemoveBtn.innerText = 'Remove';
    form.reset();
    list.append(listItem);
    listItem.append(RemoveBtn);

   

    toDoList.push({ taskItem: userInput, complete: false });
    localStorage.setItem('todolist', JSON.stringify(toDoList))
})

list.addEventListener('click', function(e){
    let textContent = e.target.parentElement.childNodes[0];
    if(e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove();
        const newToDoList = document.querySelectorAll('li');
        
        const newLocalStorage = [];
        for (item of newToDoList) {
            newLocalStorage.push({ taskItem: item.firstChild.data, complete: item.classList.contains('completed') })
        }
        localStorage.setItem('todolist', JSON.stringify(newLocalStorage))
    }
    // if(e.target.tagName === 'LI'){
    //     // e.target.classList.toggle('completed')
    //     if(!e.target.complete){
    //         e.target.classList.add('completed');
    //         e.target.complete = true;
    //     } else {
    //         e.target.classList.remove('completed');
    //         e.target.complete = false;
    //     }
    // }
    // for (let i = 0; i < toDoList.length; i++) {
    //     if (toDoList[i].taskItem === e.target.innerText) {
    //       toDoList[i].complete = !toDoList[i].complete;
    //       localStorage.setItem("todolist", JSON.stringify(toDoList));
    //     }
    //   }
})

list.addEventListener('click', function(e){
        if(!e.target.complete){
            e.target.classList.add('completed');
            e.target.complete = true;
        } else {
            e.target.classList.remove('completed');
            e.target.complete = false;
        }
    for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].taskItem === e.target.innerText) {
          toDoList[i].complete = !toDoList[i].complete;
          localStorage.setItem("todolist", JSON.stringify(toDoList));
        }
      }
});
