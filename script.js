// Wait until the HTML document is fully loaded
document.addEventListener( 'DOMContentLoaded', () =>
{
  const addButton = document.getElementById( "add-task-btn" );
  const taskInput = document.getElementById( "task-input" );
  const taskList = document.getElementById( "task-list" );

  // Load tasks from Local Storage when page loads
  loadTasks();

  // Add task when clicking the "Add Task" button
  addButton.addEventListener( "click", () =>
  {
    addTask( taskInput.value );
  } );

  // Add task when pressing "Enter" in the input field
  taskInput.addEventListener( "keypress", ( event ) =>
  {
    if ( event.key === "Enter" )
    {
      addTask( taskInput.value );
    }
  } );

  // Function to add a task
  function addTask ( taskText, save = true )
  {
    const trimmedText = taskText.trim();

    if ( trimmedText === "" )
    {
      alert( "Please enter a task" );
      return;
    }

    // Create list item and remove button
    const li = document.createElement( "li" );
    li.textContent = trimmedText;

    const removeBtn = document.createElement( "button" );
    removeBtn.textContent = "Remove";
    removeBtn.classList.add( "remove-btn" ); // <-- use classList.add here
    removeBtn.onclick = () =>
    {
      taskList.removeChild( li );
      if ( save ) removeTaskFromStorage( trimmedText );
    };

    li.appendChild( removeBtn );
    taskList.appendChild( li );

    // Save task to Local Storage
    if ( save )
    {
      saveTaskToStorage( trimmedText );
    }

    taskInput.value = "";
  }

  // Load tasks from Local Storage
  function loadTasks ()
  {
    const storedTasks = JSON.parse( localStorage.getItem( "tasks" ) || "[]" );
    storedTasks.forEach( task => addTask( task, false ) ); // false prevents duplicate save
  }

  // Save a task to Local Storage
  function saveTaskToStorage ( taskText )
  {
    const storedTasks = JSON.parse( localStorage.getItem( "tasks" ) || "[]" );
    storedTasks.push( taskText );
    localStorage.setItem( "tasks", JSON.stringify( storedTasks ) );
  }

  // Remove a task from Local Storage
  function removeTaskFromStorage ( taskText )
  {
    let storedTasks = JSON.parse( localStorage.getItem( "tasks" ) || "[]" );
    storedTasks = storedTasks.filter( task => task !== taskText );
    localStorage.setItem( "tasks", JSON.stringify( storedTasks ) );
  }
} );
