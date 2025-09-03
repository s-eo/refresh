/*
* 🔹 Day 5 — TypeScript basics

Review: variable types, interfaces, functions.

Exercises:

Define an interface:

**/

interface User {
  id: number;
  name: string;
  email?: string;
}


// Create an array of users: User[].
const users: User[] = [];

// Write a function getUserName(user: User): string.
function getUserName(user: User): string {
  return user.name;
}

// Write a function getUserEmails(users: User[]): string[] that returns an array of emails (skip users without email).
function getUserEmails(users: User[]): string[] {
  return users.filter(user => !!user.email).map(user => user.email);
}