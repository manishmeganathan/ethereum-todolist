// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract Todolist {
    // An integer that represents the number of tasks in the todo list.
    uint public taskcount = 0;

    // A struct definition of a generic task
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    // A mapping of the task id to the Task object that represents the todo list.
    mapping(uint => Task) public tasks;

    // An event that represents the creation of a new task
    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    // An event that represents the completion of a task
    event TaskCompleted(
        uint id,
        bool completed
    );

    constructor() public {
        createTask("buy more ethereum!");
    }

    // A function that creates a new Task object and assigns it to the mapping.
    function createTask(string memory _content) public {
        // Increment the taskcount state
        taskcount++;
        // Assign the new task to the tasks mapping
        tasks[taskcount] = Task(taskcount, _content, false);
        // Emit a new TaskCreated event
        emit TaskCreated(taskcount, _content, false);
    }

    function toggleCompleted(uint _id) public {
        // Fetch the task from the mapping
        Task memory _task = tasks[_id];
        // Toggle its completion bool
        _task.completed = !_task.completed;
        // Reassign it to the mapping
        tasks[_id] = _task; 
        // Emit a new TaskCompleted event
        emit TaskCompleted(_id, _task.completed);
    }
}