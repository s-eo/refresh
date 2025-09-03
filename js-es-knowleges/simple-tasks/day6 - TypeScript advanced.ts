/*🔹 Day 6 — TypeScript advanced

        Review: union types, generics, function typing.

Exercises:
*/

// Create a union type Status = "loading" | "success" | "error".
type Status = "loading" | "error" | "success";

//  Write a function printStatus(status: Status) that logs a different message depending on the value.
function printStatus(status: Status) {
    let message: string;

    switch (status) {
        case "error":
            message = 'Error has occurred';
            break;
        case "loading":
            message = "Data is loading";
            break;
        case "success":
            message = "Data is successful";
            break;
        default:
            message = "Actual status is: " + status;
    }

    console.log(message);
}

// Write a generic function identity<T>(value: T): T that simply returns the input value.

function identity<T>(value: T): T {
    return value;
}

// Define a Task type:
type Task = { id: number; title: string; completed: boolean }

// Create an array of tasks.
const tasks = [
    {
        id: 1,
        title: 'Task 1',
        completed: false,
    },
    {
        id: 2,
        title: 'Task 2',
        completed: false,
    },
    {
        id: 3,
        title: 'Task 3',
        completed: true,
    }
];

// Write a function toggleTask(id: number) that flips the completed field.
function toggleTask(id: number) {
    const askedTask = tasks.filter((task) => task.id == id)[0];

    askedTask.completed = !askedTask.completed;
}