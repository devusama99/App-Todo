// const for all used things
const form1 = document.querySelector('.form-1')
const taskInput = document.querySelector('#taskInput')
const taskSubmit = document.querySelector('#taskSubmit')
const list =document.querySelector('.list')
const clearTask = document.querySelector('.clearTasks')
const searchInput = document.querySelector('#searchInput')

// function to call all ActionListners

actions()

// define action function
function actions()
{
    //content fromm Ls on every reload
    document.addEventListener('DOMContentLoaded', getTasks);
    // event on form
    form1.addEventListener('submit', taskAdded)

    // event on Delete button which is li list-item
    list.addEventListener('click', delTask ) 

    // event on Clear Task to Delete all elements of List
    clearTask.addEventListener('click' , clearTasks)

    // search  for task
    searchInput.addEventListener('keyup' , search)

}

// search for specific task
function search(e)
{
    const text = e.target.value.toLowerCase()
    let Lis = document.querySelectorAll('.list-item')
    Lis.forEach(function(li)
    {
        if(li.textContent.toLowerCase().indexOf(text) != -1)
        {
            li.style.display='flex'
        }
        else
        {
            li.style.display='none'
        }
    })

}

// defination of clearTasks
function clearTasks(e)
{
    // list.innerHTML=''

    // fasterway
    while(list.firstChild)
    {
        list.firstChild.remove()       
    }

     // clear Local Storage
     localStorage.clear()
}
// define delTask
function delTask(e)
{
   if(e.target.classList.contains('delete-item'))
   {
       if(confirm('Do you want to delete this task'))
       {
        e.target.parentElement.parentElement.remove()

        // remove from Ls
        removeTaskLs(e.target.parentElement.parentElement)
       }      
   }

    e.preventDefault()
}
// define removeTaskLs
function removeTaskLs(listItem)
{
    let tasks
    if(localStorage.getItem('tasks') === null)
    {
        tasks=[]
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task , index)
    {
        if(task === listItem.textContent)
        {
            tasks.splice(index , 1)
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

// defination of taskAdded
function taskAdded(e)
{
    let task
    if(taskInput.value === '')
    {
        alert('Please enter task')
    }
    else
    {
        task=taskInput.value
        let li = document.createElement('li')
        li.className = 'list-item'
        li.innerText = task 
        let link = document.createElement('a')
        link.className = 'item-link'
        let del = document.createElement('i')
        del.className = 'fa fa-remove delete-item'
        link.appendChild(del)
        li.appendChild(link)
        list.appendChild(li)     
        addTaskLs()  
        alert('Task Added Successfully')

    }
    
    e.preventDefault()
}

// define addTaskLs
function addTaskLs()
{
    let tasks
    if(localStorage.getItem('tasks') === null)
    {
        tasks=[]
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem('tasks'))        
    }
    tasks.push(taskInput.value)
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

// get tasks on reload from ls
function getTasks()
{
    let tasks
    if(localStorage.getItem('tasks') === null)
    {
        tasks=[]
    }
    else
    {
        tasks=JSON.parse(localStorage.getItem('tasks'))        
    }
    tasks.forEach(function(task)
    {
        let li = document.createElement('li')
        li.className = 'list-item'
        li.innerText = task 
        let link = document.createElement('a')
        link.className = 'item-link'
        let del = document.createElement('i')
        del.className = 'fa fa-remove delete-item'
        link.appendChild(del)
        li.appendChild(link)
        list.appendChild(li)

    })
}