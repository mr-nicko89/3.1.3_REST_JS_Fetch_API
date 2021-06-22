function usersData() {
    console.log("START FETCH")
    //example GET query

    fetch("/rest/listUsers").then(response => {
        // console.log(response);
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    }).then(data => {
        // console.log(data);
        const html = data.map(user => {
            return `
                <tr class="border-top">
                   <td>${user.name}</td> 
                   <td>${user.age}</td> 
                   <td>${user.email}</td> 
                   <td>${user.password}</td> 
                   <td>${user.roleSet.map(role => {
                return role.name;
            })}</td>
                   <td>
                   <!--Ссылка на модальное окно редактирования пользователя-->
                       <button type="button" class="btn btn-info"
                                data-bs-toggle="modal" data-bs-target="#editUserModal">Edit
                       </button> 
                   </td>
                    <!--Модальное окно удаления пользователя-->
                    <td>
                    <!--Ссылка на модальное окно удаления пользователя-->
                        <button type="button" class="btn btn-danger"
                                data-bs-toggle="modal" data-bs-target="#deleteUserModal"> 
                            Delete
                        </button>
                    </td>
                </tr> 
`;
        })
            .join("");
        // console.log(html);
        document
            .querySelector('#usersList')
            .insertAdjacentHTML("afterbegin", html);
        // .innerHTML = html;
    }).catch(error => {
        console.log(error);
    });
}

function getPrincipal() {
    fetch("/rest/getPrincipal").then(response => {
        // console.log(response);
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    }).then(dataPrincipal => {
            const htmlHeaderPrincipal = `<span class="navbar-brand" href="#">${dataPrincipal.email} with roles: ${
                dataPrincipal.roleSet.map(roles => roles.name).join(" ")
            }</span>`;
            // console.log(htmlPrincipal);
            document
                .querySelector('#principal')
                .insertAdjacentHTML("afterbegin", htmlHeaderPrincipal);

            const htmlActiveUser = `
                <tr class="border-top">
                    <td>${dataPrincipal.name}</td>
                    <td>${dataPrincipal.age}</td>
                    <td>${dataPrincipal.email}</td>
                    <td>${dataPrincipal.password}</td>
                    <td>${dataPrincipal.roleSet.map(roles => roles.name)}</td>
                </tr>
`;
            document
                .querySelector('#activeUser')
                .insertAdjacentHTML("afterbegin", htmlActiveUser);
            // console.log(htmlActiveUser)
        }
    ).catch(error => {
        console.log(error);
    });
}

function addUser(data) {
    console.log(JSON.stringify(data))
    fetch("/rest/admin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            data
        )
        // body: JSON.stringify(
        //     {
        //         "name": "testUser",
        //         "age": 33,
        //         "email": "testUser@email.com",
        //         "password": "testUser",
        //         "roleSet": [
        //             {"id": 1, "name": "ROLE_ADMIN"}
        //         ]
        //     }
        // )
        // body: new FormData(userForm)
    }).then(response => {
        // console.log(response);
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    }).then(data => {
        console.log(data)
    }).catch(error => {
        console.log(error);
    });
}

//Действие при нажатии на Отправить в форме Создания пользователя


async function SendForm(event) {
    // останавливает действие по умолчанию
    event.preventDefault();

    // event.target — это HTML-элемент form
    let formData = new FormData(event.target);

    // // Собираем данные формы в объект
    let obj = {};

    formData.forEach((value, key) => obj[key] = value);

    addUser(obj);

};

// при щелчке на кнопку отправки формы
// отправляем форму на сервер
document.querySelector('#formNewUser').onsubmit = SendForm;


// addUser()
getPrincipal();
usersData();