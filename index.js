let task = document.getElementById("task");
let description = document.getElementById("description");

let show = document.getElementById("table");

let ind;
function saveInd(i) {
  this.ind = i;
  let arr = JSON.parse(localStorage.getItem("tasks"));

  let updateTask = document.getElementById("updateTask");
  let updateDescription = document.getElementById("updateDescription");

  updateTask.value = arr[i].Task;
  updateDescription.value = arr[i].Description;
}

function addTask() {
  if (task.value === "") {
    window.alert("Please Add Task");
    return;
  } else if (description.value === "") {
    window.alert("please Add Description");
    return;
  } else {
    let date = new Date();
    let time = date.toLocaleString();
    let arr = JSON.parse(localStorage.getItem("tasks"));

    let obj = {
      Task: task.value,
      Description: description.value,
      Date: time,
      status: false,
    };

    arr.push(obj);

    console.log(arr);

    localStorage.setItem("tasks", JSON.stringify(arr));

    task.value = "";
    description.value = "";
  }
  checkCompletedTask();
  focusIndex = 0;
  showFocus();
}

function clearTask() {

  localStorage.clear();
  let arr = [];
  localStorage.setItem("tasks", JSON.stringify(arr));
  task.value = "";
  description.value = "";
  checkCompletedTask();
  focusIndex = 0;
  showFocus();
}

function updateTask() {

  let arr = JSON.parse(localStorage.getItem("tasks"));

  let updateTask = document.getElementById("updateTask");
  let updateDescription = document.getElementById("updateDescription");
  console.log(updateTask, updateDescription);
  if (updateTask.value === "") {
    window.alert("Please add Task");
    return;
  }

  if (updateDescription.value === "") {
    window.alert("Please add Description");
    return;
  }

  let obj = arr[this.ind];

  obj.Task = updateTask.value;
  obj.Description = updateDescription.value;
  obj.Date = arr[this.ind].Date;

  arr[this.ind] = obj;

  localStorage.setItem("tasks", JSON.stringify(arr));
  checkCompletedTask();
  focusIndex = 0;
  showFocus();
}

function deleteTask(myIndex) {

  let arr = JSON.parse(localStorage.getItem("tasks"));

  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (i !== myIndex) {
      newArr.push(arr[i]);
    }
  }

  localStorage.setItem("tasks", JSON.stringify(newArr));
  checkCompletedTask();
}

function markAsComplete(k) {

  let arr = JSON.parse(localStorage.getItem("tasks"));

  let obj = arr[k];

  obj.status = !obj.status;

  arr[k] = obj;

  console.log(obj);

  localStorage.setItem("tasks", JSON.stringify(arr));

  checkCompletedTask();
}

checkCompletedTask();
function checkCompletedTask() {

  let arr = JSON.parse(localStorage.getItem("tasks"));

  if (arr.length === 0) {
    show.innerHTML = `<div class="alert alert-success" role="alert">
        Congratulations You Don't have any Pending Task To Do Please Add Task....
        </div>`;
  } else {
    let str = "";
    str += `
    <table class="table table-light table-sm table-hover" id="start" id="myTable">
    <caption>List of Tasks</caption>
<thead>
<tr>
  <th scope="col">SN</th>
  <th scope="col">Task</th>
  <th scope="col">Description</th>
  <th scope="col">Date</th>
  <th scope="col">Action</th>
</tr>
</thead>
<tbody>
`;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].status === true) {
        str += `
        <tr>
            <th scope="row"><del>${i + 1}</del></th>
            <td><del>${arr[i].Task}</del></td>
            <td><del>${arr[i].Description}</del></td>
            <td><del>${arr[i].Date}</del></td>
            <td>
            <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="saveInd(${i})"><span class="material-symbols-outlined">
            border_color
            </span></button>
            <button type="button" class="btn btn-success" onclick="markAsComplete(${i})"><span class="material-symbols-outlined">
            check_circle
            </span></button>
            <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${i})"><span class="material-symbols-outlined">
            delete
            </span></button>
            </td>
        </tr>        
        `;
      } else {
        str += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${arr[i].Task}</td>
            <td>${arr[i].Description}</td>
            <td>${arr[i].Date}</td>
            <td>
        <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="saveInd(${i})"><span class="material-symbols-outlined">
        border_color
        </span></button>
        <button type="button" class="btn btn-outline-success" onclick="markAsComplete(${i})"><span class="material-symbols-outlined">
        check_circle
        </span></button>
        <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${i})"><span class="material-symbols-outlined">
        delete
        </span></button>
        </td>
        </tr>        
        `;
      }
    }
    str += `</tbody>
    </table>`;
    show.innerHTML = str;

    let myTable = document.getElementById('start');
    let totalRowCount = myTable.rows.length;
    
    task.value = "";
    description.value = "";
  }
}

let date = new Date().toLocaleString();
let myDate = document.getElementById("myDate");

let hr = new Date(date).getHours();
let min = new Date(date).getMinutes();
let sec = new Date(date).getSeconds();

function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if (hh === 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  document.getElementById("myDate").innerText = time;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}

currentTime();

let focusIndex = 0;

document.onkeydown = function (event) {
  // ctr + rightArrow to navigate right
  // ctr + leftArrow to navigate left
    let arr = JSON.parse(localStorage.getItem('tasks'));

  if (focusIndex > 3 || focusIndex < 0) {
    focusIndex = 3;
  }

  if (event.ctrlKey == true) {
    switch (event.keyCode) {
      case 37: {
        focusIndex--;
        showFocus();
        //alert("Left Key")
        break;
      }
      case 38: {
        
        tableInd--;
        if(tableInd < 1 )
        {
            tableInd=arr.length;
        }
        showTableFocus();
        
        //alert('Up key');
        break;
      }
      case 39: {
        focusIndex++;
        showFocus();
        //alert("Right Key")
        break;
      }
      case 40: {
        tableInd++;
        if(tableInd > arr.length)
        {
            tableInd=1;
        }
        showTableFocus();
        //alert("Down key")
        break;
      }
    }
  }
};

//trying to implement arrow function

function showFocus() {
  if (focusIndex == 0) {
    let d = document.getElementById("task");
    d.focus();
  } else if (focusIndex == 1) {
    let d = document.getElementById("description");
    d.focus();
  } else if (focusIndex == 2) {
    let d = document.getElementById("btnId");
    d.focus();
  } else if (focusIndex == 3) {
    let d = document.getElementById("btnId2");
    d.focus();
  } else if (focusIndex < 0) {
    let d = document.getElementById("btnId2");
    d.focus();
    focusIndex = 4;
  } else {
    let d = document.getElementById("task");
    d.focus();
    focusIndex = 0;
  }
}

document.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && event.shiftKey == true) {
    // Prevent default shift + Enter
    event.preventDefault();
    // shift + Enter
    document.getElementById("btnId").click();
  } else if (event.key === "D" && event.shiftKey == true) {
    event.preventDefault();
    document.getElementById("btnId2").click();
  }
});

let tableInd=0;
console.log(tableInd);

function showTableFocus()
{
    let arr = JSON.parse(localStorage.getItem("tasks"));

    console.log(tableInd);
    var x = document.getElementById("start");
    // x.style.color = "red";
    //    for(let i=1;i<arr.length;i++)
    //    {
    //     if(i==tableInd-1)
    //     {
    //         console.log(i)
    //         x.rows[tableInd].style.color = "red";
    //     }
    //     else
    //     {
    //         console.log(i)
    //         x.rows[tableInd].style.color = "green";
    //     }
    //    }


       // Convering to arrow key shortcut

       if (arr.length === 0) {
        show.innerHTML = `<div class="alert alert-success" role="alert">
            Congratulations You Don't have any Pending Task To Do Please Add Task....
            </div>`;
      } else {
        let str = "";
        str += `
        <table class="table table-light table-sm table-hover" id="start"  id="myTable">
        <caption>List of Tasks</caption>
    <thead>
    <tr>
      <th scope="col">SN</th>
      <th scope="col">Task</th>
      <th scope="col">Description</th>
      <th scope="col">Date</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    `;
    
        for (let i = 0; i < arr.length; i++) {
          if (tableInd-1 === i) {
            str += `
            <tr class="table-danger">
                <th scope="row">${i + 1}</th>
                <td>${arr[i].Task}</td>
                <td>${arr[i].Description}</td>
                <td>${arr[i].Date}</td>
                <td>
                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="saveInd(${i})"><span class="material-symbols-outlined">
                border_color
                </span></button>
                <button type="button" class="btn btn-success" onclick="markAsComplete(${i})"><span class="material-symbols-outlined">
                check_circle
                </span></button>
                <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${i})"><span class="material-symbols-outlined">
                delete
                </span></button>
                </td>
            </tr>        
            `;
          } else {
            str += `
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${arr[i].Task}</td>
                <td>${arr[i].Description}</td>
                <td>${arr[i].Date}</td>
                <td>
            <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onclick="saveInd(${i})"><span class="material-symbols-outlined">
            border_color
            </span></button>
            <button type="button" class="btn btn-outline-success" onclick="markAsComplete(${i})"><span class="material-symbols-outlined">
            check_circle
            </span></button>
            <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${i})"><span class="material-symbols-outlined">
            delete
            </span></button>
            </td>
            </tr>        
            `;
          }
        }
        str += `</tbody>
        </table>`;
        show.innerHTML = str;
       
    }
}

document.addEventListener("keypress", function (event) {
    if(window.event.key === 'Enter')
    {
      focusIndex++;
      showFocus();
    }
  });