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

    constructor() public {
        createTask("buy more ethereum!");
    }

    // A function that creates a new Task object and assigns it to the mapping.
    function createTask(string memory _content) public {
        // Increment the taskcount state
        taskcount++;
        // Assign the new task to the tasks mapping
        tasks[taskcount] = Task(taskcount, _content, false);
    }
}