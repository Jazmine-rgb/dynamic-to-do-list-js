// Ensure the DOM is fully loaded before running any JavaScript
document.addEventListener( "DOMContentLoaded", function ()
{

  // Select DOM elements
  const addButton = document.getElementById( "add-task-btn" ); // "Add Task" button
  const taskInput = document.getElementById( "task-input" );   // Input field for tasks
  const taskList = document.getElementById( "task-list" );     // UL element to hold tasks

  // Function to add a new task
  function addTask ()
  {
    const taskText = taskInput.value.trim(); // Get input value and remove spaces

    if ( taskText === "" )
    {
      alert( "Please enter a task." ); // Alert if input is empty
      return;
    }

    // Create new task element
    const li = document.createElement( "li" ); // Create <li> element
    li.textContent = taskText;               // Set the task text

    // Create remove button for this task
    const removeButton = document.createElement( "button" );
    removeButton.textContent = "Remove";     // Button text
    removeButton.className = "remove-btn";   // Apply CSS class

    // Remove task when button is clicked
    removeButton.onclick = function ()
    {
      taskList.removeChild( li );           // Remove <li> from <ul>
    };

    li.appendChild( removeButton );           // Append remove button to task
    taskList.appendChild( li );               // Add task to the list

    taskInput.value = "";                    // Clear input field
  }

  // Event listener for the "Add Task" button
  addButton.addEventListener( "click", addTask );

  // Event listener for pressing "Enter" key in the input field
  taskInput.addEventListener( "keypress", function ( event )
  {
    if ( event.key === "Enter" )
    {           
      addTask();                         
    }
  } );

} );
