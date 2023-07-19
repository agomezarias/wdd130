// REFERENCED HELP WITH API: https://www.geeksforgeeks.org/how-to-use-the-javascript-fetch-api-to-get-data/
// REFERENCED HELP/ IDEA: https://www.youtube.com/watch?v=HY6nPFsADDo  
// ALSO GOT HELP FOR THE DELETE BUTTON WITH THIS VIDEO.
const apiUrl = 'https://api.api-ninjas.com/v1/exercises';
const apiKey = 'bpmLXHFS0drVQrlDut5mPg==AE3Y2xmNgKX808F9';

const muscleGroupSelect = document.getElementById('muscleGroupSelect');
const muscleGroupSubmit = document.getElementById('muscleGroupSubmit');
const logForm = document.getElementById('logForm');
const loggedTableBody = document.getElementById('loggedTableBody');
const resultsContainer = document.getElementById('resultsContainer'); // New results container

// This populates the muscle group dropdown list
const muscleGroups = ['abdominals', 'biceps', 'calves', 'chest', 'forearms', 'glutes', 'hamstrings', 'lats', 'quadriceps', 'triceps'];
muscleGroups.forEach(group => {
  const option = document.createElement('option');
  option.value = group;
  option.textContent = group.charAt(0).toUpperCase() + group.slice(1);
  muscleGroupSelect.appendChild(option);
});

// This creates a new log row in the table
const createLogRow = (date, workout, duration) => {
  const newRow = document.createElement('tr');

  const dateElement = document.createElement('td');
  dateElement.textContent = date;
  newRow.appendChild(dateElement);

  const workoutElement = document.createElement('td');
  workoutElement.textContent = workout;
  newRow.appendChild(workoutElement);

  const durationElement = document.createElement('td');
  durationElement.textContent = duration;
  newRow.appendChild(durationElement);

  const deleteElement = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete-btn');
  deleteButton.addEventListener('click', () => {
    newRow.remove();
  });
  deleteElement.appendChild(deleteButton);
  newRow.appendChild(deleteElement);

  return newRow;
};

// Function to display the exercise results
const displayResults = (results) => {
  resultsContainer.innerHTML = ''; // Clear previous results

    results.forEach(exercise => {
      const exerciseContainer = document.createElement('div');
      exerciseContainer.classList.add('exercise-container');

      const nameElement = document.createElement('h3');
      nameElement.textContent = exercise.name;
      exerciseContainer.appendChild(nameElement);

      const typeElement = document.createElement('p');
      typeElement.innerHTML = `<strong>Type:</strong> ${exercise.type.toUpperCase()}`;
      exerciseContainer.appendChild(typeElement);

      const muscleElement = document.createElement('p');
      muscleElement.innerHTML = `<strong>Muscle:</strong> ${exercise.muscle.toUpperCase()}`;
      exerciseContainer.appendChild(muscleElement);

      const equipmentElement = document.createElement('p');
      equipmentElement.innerHTML = `<strong>Equipment:</strong> ${exercise.equipment.toUpperCase()}`;
      exerciseContainer.appendChild(equipmentElement);

      const difficultyElement = document.createElement('p');
      difficultyElement.innerHTML = `<strong>Difficulty:</strong> ${exercise.difficulty.toUpperCase()}`;
      exerciseContainer.appendChild(difficultyElement);

      const instructionsElement = document.createElement('p');
      instructionsElement.innerHTML = `<strong>Instructions:</strong> ${exercise.instructions}`;
      exerciseContainer.appendChild(instructionsElement);

      resultsContainer.appendChild(exerciseContainer);
    });
};

// Event listener for form submission
logForm.addEventListener('submit', event => {
  event.preventDefault();

  const date = document.getElementById('date').value;
  const workout = document.getElementById('workout').value;
  const duration = document.getElementById('duration').value;

  const logRow = createLogRow(date, workout, duration);
  loggedTableBody.appendChild(logRow);

  logForm.reset();
});

// Event listener for muscle group submit button
muscleGroupSubmit.addEventListener('click', async () => {
  const selectedMuscleGroup = muscleGroupSelect.value;

  const url = `${apiUrl}?muscle=${selectedMuscleGroup}`;

  const options = {
    method: 'GET',
    headers: {
      'X-Api-Key': apiKey 
    }
  };

const response = await fetch(url, options);
const data = await response.json();
displayResults(data); // Display the results in the results container

});