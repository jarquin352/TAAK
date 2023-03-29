import React, { useState } from "react";

const tasks = [
  { name: "Task 1", duration: 3, expertise: "beginner" },
  { name: "Task 2", duration: 2, expertise: "intermediate" },
  { name: "Task 3", duration: 4, expertise: "expert" },
  { name: "Task 4", duration: 1, expertise: "beginner" },
  { name: "Task 5", duration: 2, expertise: "intermediate" },
];

const assignTasks = (volunteers) => {
  const sortedVolunteers = volunteers.sort(
    (a, b) => a.availability - b.availability
  );

  let assignedTasks = [];

  for (let task of tasks) {
    let volunteerIndex = -1;
    for (let i = 0; i < sortedVolunteers.length; i++) {
      if (
        sortedVolunteers[i].expertise === task.expertise &&
        sortedVolunteers[i].availability >= task.duration
      ) {
        volunteerIndex = i;
        break;
      }
    }

    if (volunteerIndex >= 0) {
      assignedTasks.push({
        task: task.name,
        volunteer: sortedVolunteers[volunteerIndex].name,
      });

      sortedVolunteers[volunteerIndex].availability -= task.duration;
    }
  }

  return assignedTasks;
};

const TaskAssigner = () => {
  const [volunteers, setVolunteers] = useState([
    { name: "Volunteer 1", availability: 4, expertise: "beginner" },
    { name: "Volunteer 2", availability: 3, expertise: "intermediate" },
    { name: "Volunteer 3", availability: 2, expertise: "expert" },
    { name: "Volunteer 4", availability: 1, expertise: "beginner" },
    { name: "Volunteer 5", availability: 2, expertise: "intermediate" },
  ]);

  const assignedTasks = assignTasks(volunteers);

  return (
    <div>
      <h2>Assigned Tasks:</h2>
      <ul>
        {assignedTasks.map((task, index) => (
          <li key={index}>
            Task: {task.task} - Volunteer: {task.volunteer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskAssigner;