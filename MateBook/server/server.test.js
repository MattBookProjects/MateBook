import fetch from 'node-fetch';

let response = await fetch('http://localhost:8080/api/logout', {
    method: 'POST',
    body: JSON.stringify({
        id: 1
    }),
    headers: {
        'Content-Type': 'Application/json',
        'MateBookAuthToken': '000000000'
    },
});
console.log(response.status);
let data = await response.json();
console.log(data);