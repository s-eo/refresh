/** 🔹 День 2 — практика с массивами

Повтори: map, filter, reduce, find, some/every.

    Задания:

Есть массив */
const users = [ {id:1, name:"Dana"}, {id:2, name:"Moshe"}, {id:3, name:"Lea"} ];

//    Найди пользователя с id=2.
const user2ID = users.filter(user => user.id === 2);

// Получи массив имён.
//   Есть массив чисел:
const numbers = [5, 10, 3, 8, 2];

 //   Отфильтруй только чётные.
const evens = numbers.filter(n => n % 2 === 0);

//    Посчитай сумму через reduce.
const sum = numbers.reduce((a, b) => a + b, 0);

//    Напиши функцию getLongestWord(words: string[]): string, которая возвращает самое длинное слово.
function getLongestWord() {
    let longest;
    let length = 0;

    [...arguments].forEach(word => {
        if (word.length > length) {
            longest = word;
            length = word.length;
        }
    })

    // return first longest word
    return longest;
}