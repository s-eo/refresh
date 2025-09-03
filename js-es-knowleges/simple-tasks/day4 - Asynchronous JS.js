/* 🔹 Day 4 — Asynchronous JS (async/await)

Review: async/await, try/catch.

Exercises:

    Rewrite the function from Day 3 using async/await.
*/
async function placeholderFetcher() {
    try {
        const url = "https://jsonplaceholder.typicode.com/posts/1";

        const rawResp = await fetch(url);
        const jsonResp = await rawResp.json();

        console.log(jsonResp.title);
    } catch (e) {
        console.error('Can`t write a title right now. Please try later')
    }
}

// Write a function getTodos() that fetches tasks from https://jsonplaceholder.typicode.com/todos and returns only the first 5.
//    Add try/catch to handle errors (log “Request failed” if the API doesn’t respond).

async function getTodos() {
    try {
        const url = "https://jsonplaceholder.typicode.com/todos";

        const rawResp = await fetch(url);
        const jsonResp = await rawResp.json();

        console.log(jsonResp.slice(0, 5));
    } catch (e) {
        console.error('Can`t write todos right now. Please try later')
    }
}
