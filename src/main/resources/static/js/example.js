// alert("JavaScript загружен");

// function fetchData() {
//     console.log("START FETCH")
//     //example GET query
//     fetch("https://reqres.in/api/users").then(response => {
//         // console.log(response);
//         if (!response.ok) {
//             throw Error("ERROR");
//         }
//         return response.json();
//     }).then(data => {
//         // console.log(data.data);
//         const html = data.data
//             .map(user => {
//                 return `
//                 <div class="user">
//                 <p><img src="${user.avatar}" alt="${user.first_name}" /> </p>
//                 <p>Name ${user.first_name}</p>
//                 <p>Email ${user.email}</p>
//                 </div>
//                 `;
//             })
//             .join("");
//         // console.log(html);
//         document
//             .querySelector('#app')
//             .insertAdjacentHTML("afterbegin", html);
//     })
//         .catch(error => {
//             console.log(error);
//         });
// }
//
// fetchData()
//
// //example POST query
// function postData() {
//     fetch("https://reqres.in/api/users",{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             "name": "morpheus",
//             "job": "leader"
//         })
//     }).then(response => {
//         // console.log(response);
//         if (!response.ok) {
//             throw Error("ERROR");
//         }
//         return response.json();
//     }).then(data => {
//         console.log(data)
//     })
//         .catch(error => {
//             console.log(error);
//         });
// }
//
// postData();
