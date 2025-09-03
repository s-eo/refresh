/** 📅 Week 1 — Day by Day (from Day 3)
🔹 Day 3 — Asynchronous JS (Promise)

Review: Promise, then/catch, Promise.all.

    Exercises:
*/

// Write a function delay(ms) that returns a Promise which resolves after the given milliseconds.
function delay(x) {
//    Example: delay(1000).then(() => console.log("1 second passed")).
    return new Promise(resolve => setTimeout(resolve, x));
}

//    Create 3 Promises that resolve after different timeouts.
//    Use Promise.all to wait for all of them at once.
function tripleDelay(x, y, z) {
// > tripleDelay(3000, 4000, 2000).then(() => console.log("4(max) second passed"))
    return Promise.all([...arguments].map(i => delay(i)));
}

//    Write a function that does fetch("https://jsonplaceholder.typicode.com/posts/1") and logs the title.
    async function placeholderFetcher() {
        const url = "https://jsonplaceholder.typicode.com/posts/1";

        const rawResp = await fetch(url);
        const jsonResp = await rawResp.json();

        console.log(jsonResp.title);
    }
