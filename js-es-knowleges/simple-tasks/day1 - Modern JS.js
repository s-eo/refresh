/**
 * 📅 Неделя 1 — день за днём
 * 🔹 День 1 — современный JS, основы
 *
 * Повтори: let/const, стрелочные функции, шаблонные строки, деструктуризация, spread/rest.
 *
 * Задания:
 *
 * Создай объект person = { name: "Anna", age: 30, city: "Tel Aviv" }.
 *
 * Деструктурируй имя и возраст в переменные.
 */

const person = { name: "Anna", age: 30, city: "Tel Aviv" };
let { name, age } = {...person};

// Создай новый объект personWithEmail, добавив поле email.
const personWithEmail = { ...person, email: "elena@gmail.com" };

// Напиши функцию sumAll(...numbers: number[]), которая суммирует любое количество чисел.
 function sumAll() {
     return [...arguments].reduce((a, b) => a + b, 0);
 }

 const sumAllArrayFn = (...args) => args.reduce((a, b) => a + b, 0);

 // Создай массив строк и с помощью map преврати их все в верхний регистр.
const strings = ['qwe', 'wer', 'ert', 'rty'];

strings.map(str => str[0].toUpperCase() + str.slice(1));

