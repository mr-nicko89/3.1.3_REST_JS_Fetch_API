function loadFormEditOnClick(context) {
    let elem = [
        {
            find: "#idUserID",
            target: "#idEditUser"
        },
        {
            find: "#nameUserID",
            target: "#nameEditUser"
        },
        {
            find: "#ageUserID",
            target: "#ageEditUser"
        },
        {
            find: "#emailUserID",
            target: "#emailEditUser"
        },
        {
            find: "#passwordUserID",
            target: "#passwordEditUser"
        },
        {
            find: "#rolesUserID",
            innerHTML: "#selectedRoleEditUser"
        }
    ];

    elem.forEach(element => {

        const $item = $(context).closest("tr")   // Finds the closest row <tr>
            .find(element.find)     // Gets a descendent with class="nr"
            .text();         // Retrieves the text within <td>
        if (element.target) {
            $(element.target).val($item);       // Outputs the answer
        } else {
            var rolesInBase = $(element.innerHTML).html().split('\n')
                .map(element => element.trim()) //Убрать все пробелы в строках состоящих только из пробелов
                .filter(element => element !== ""); //Удалить пустые элементы массива
            // console.log(rolesInBase);
            $(element.innerHTML).html(() => {
                const rolesUser = $item.split(",");
                // console.log(rolesUser);
                let html = "";
                html = rolesInBase;


                //Недоделанный код для подсвечивания текущих ролей пользователя(selected)
                // html.map(elementHTML =>{
                //     rolesUser.forEach(elementRolesUser => {
                //         if (elementHTML.search(elementRolesUser)){
                //             elementHTML = elementHTML.split(" ").map(elementInElementHTML =>{
                //                 if (elementInElementHTML.search("<option")){
                //                     elementInElementHTML = `${elementInElementHTML} selected`;
                //                 }
                //             });
                //         }
                //     })
                // })
                // for (let i = 0; i < rolesUser.length; i++) {
                //     html += `<option selected>${rolesUser[i]}</option>`;
                // }

                // console.log(html);
                return html;
            });       // Outputs the answer
        }
    });

};

function editUser(data) {
    // console.log(JSON.stringify(data))
    fetch("/rest/admin/edituser", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            data
        )
    });

}

//Действие при нажатии на Отправить в форме Создания пользователя
async function clickEditUser(event) {
    // останавливает действие по умолчанию
    event.preventDefault();

    let elementUserRolesEditUser = document.getElementById('selectedRoleEditUser');

    let roleSelectedValuesEditUser = Array.from(elementUserRolesEditUser.selectedOptions).map(el => el.value);
    let roleArrayEditUser = convertToRoleSet(roleSelectedValuesEditUser);

    let formDataEditUser = {
        id: document.querySelector('#idEditUser').value,
        name: document.querySelector('#nameEditUser').value,
        age: document.querySelector('#ageEditUser').value,
        email: document.querySelector('#emailEditUser').value,
        password: document.querySelector('#passwordEditUser').value,

        roleSet: roleArrayEditUser
    };
    editUser(formDataEditUser);
    //Отчистить форму
    event.target.reset();

    editUserList(formDataEditUser);

    //Скрыть модальное окно удаления пользователя
    $('#editUserModal').modal("hide");
};

function editUserList(formDataEditUser) {

    //Найти и изменить строку в Users table

    // Добавить строку измененного пользователя
    const htmlAddEditUser = `
                <tr id="trUserID${formDataEditUser.id}" class="border-top">
                   <td hidden id="idUserID" >${formDataEditUser.id}</td>
                   <td id="nameUserID">${formDataEditUser.name}</td>
                   <td id="ageUserID">${formDataEditUser.age}</td>
                   <td id="emailUserID">${formDataEditUser.email}</td>
                   <td id="rolesUserID">${formDataEditUser.roleSet.map(role => {
        return role.name;
    })}</td>
                   <td>
                   <!--Ссылка на модальное окно редактирования пользователя-->
                       <button id="editUserID${formDataEditUser.id}" type="button" class="btn btn-info"
                                data-bs-toggle="modal" data-bs-target="#editUserModal"
                                onclick="loadFormEditOnClick(this)">Edit
                       </button>
                   </td>
                    <!--Модальное окно удаления пользователя-->
                    <td>
                    <!--Ссылка на модальное окно удаления пользователя-->
                        <button id="deleteUserID${formDataEditUser.id}" type="button" class="btn btn-danger"
                                data-bs-toggle="modal" data-bs-target="#deleteUserModal"
                                onclick="loadFormDeleteOnClick(this)">
                            Delete
                        </button>
                    </td>
                </tr>
`;

// //    Изменить в списке пользователей поля измененные поля после редактирования
//
//     let trUser = $(`#trUserID${formDataEditUser.id}`).html();
//     console.log(trUser);

    //Удалить строку текущего пользователя
    $(`#trUserID${formDataEditUser.id}`).remove();
    //Добавить строку измененного пользователя
    document
        .querySelector('#usersList')
        .insertAdjacentHTML("beforeend", htmlAddEditUser);

};

// //Преобразуем роли в roleSet
// function convertToRoleSet(Array) {
//     let roleSelectedArray = [];
//
//     Array.forEach(element => {
//         roleSelectedArray.unshift({
//             id: element.split(",")[0],
//             name: element.split(",")[1]
//         });
//     })
//     return roleSelectedArray;
// }