//THIRD APPROACH 
export const taskAssigner = (users, tasks) => {
  let resArray = [];
  // Build a lookup table that maps each skill to the users that have that skill
  const skillToUsers = new Map();
  for (const user of users) {
    for (const skill of user.skills) {
      if (!skillToUsers.has(skill)) {
        skillToUsers.set(skill, []);
      }
      skillToUsers.get(skill).push(user);
    }
  }

  // Filter out unassigned tasks
  const unassignedTasks = tasks.filter((task) => !task.isAssigned);
  // Assign each unassigned task to the best matching user
  for (const task of unassignedTasks) {
    const taskSkills = task.taskSkills;
    let bestMatch = null;
    let bestMatchLength = null;
    let taskMatchId = null;
    let bestMatchId = null;
    for (const skill of taskSkills) {
      const usersWithSkill = skillToUsers.get(skill) || [];
      for (const user of usersWithSkill) {
        const commonValues = taskSkills.filter((value) =>
          user.skills.includes(value)
        ).length;
        if (bestMatch === null || commonValues > bestMatchLength) {
          bestMatch = user.name;
          bestMatchId = user._id;
          bestMatchLength = commonValues;
        }
      }
    }
    taskMatchId = task._id;
    resArray.push({ taskid: taskMatchId,usermatch: bestMatch, userid: bestMatchId });
  }
  return resArray;
};
