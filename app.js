let untitledTaskCount = 0;

const taskList = document.getElementById('task-list');

const newTask = () => {
    const inputName = document.getElementById('task-name');
    const taskName = document.createElement('p');
    const taskContainer = document.createElement('div');
    const deleteTaskBtn = document.createElement('button');
    const checkTaskBtn = document.createElement('button');

    deleteTaskBtn.innerText = 'Delete';
    checkTaskBtn.innerText = 'Check';

    if (inputName.value === '') {
        untitledTaskCount += 1;
        taskName.innerText = `Untitled Task #${untitledTaskCount}`;
    } else {
        untitledTaskCount = 0;
        taskName.innerText = inputName.value;
    }

    deleteTaskBtn.classList.add('delete-task-btn');
    checkTaskBtn.classList.add('check-task-btn');

    taskContainer.appendChild(taskName);
    taskContainer.appendChild(deleteTaskBtn);
    taskContainer.appendChild(checkTaskBtn);

    taskList.appendChild(taskContainer);
    inputName.value = '';
    return;
}

taskList.addEventListener('click', event => {
    const clickedElement = event.target;

    if (event.target.classList.contains('delete-task-btn')) {
        clickedElement.parentElement.remove();
        untitledTaskCount = 0;
        return;
    }
})
document.getElementById('add-btn').addEventListener('click', newTask);

document.getElementById('task-name').addEventListener('keyup', event => {
    if (event.key === 'Enter')
        newTask();
    return;
})