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
                console.log(rolesUser);
                let html = "";
                html = rolesInBase;

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
        name: document.querySelector('#nameNewUser').value,
        age: document.querySelector('#ageNewUser').value,
        email: document.querySelector('#emailNewUser').value,
        password: document.querySelector('#passwordNewUser').value,

        roleSet: roleArrayEditUser
    };
    editUser(formDataEditUser);
    // //Отчистить форму
    // event.target.reset();

    //Найти и изменить строку в Users table
//
//     const htmlAddEditUser = `
//                 <tr class="border-top">
//                    <td>${formDataEditUser.name}</td>
//                    <td>${formDataEditUser.age}</td>
//                    <td>${formDataEditUser.email}</td>
//                    <td>${formDataEditUser.password}</td>
//                    <td>${formDataEditUser.roleSet.map(role => {
//         return role.name;
//     })}</td>
//                    <td>
//                    <!--Ссылка на модальное окно редактирования пользователя-->
//                        <button type="button" class="btn btn-info"
//                                 data-bs-toggle="modal" data-bs-target="#editUserModal">Edit
//                        </button>
//                    </td>
//                     <!--Модальное окно удаления пользователя-->
//                     <td>
//                     <!--Ссылка на модальное окно удаления пользователя-->
//                         <button type="button" class="btn btn-danger"
//                                 data-bs-toggle="modal" data-bs-target="#deleteUserModal">
//                             Delete
//                         </button>
//                     </td>
//                 </tr>
// `;
//     document
//         .querySelector('#usersList')
//         .insertAdjacentHTML("beforeend", htmlAddEditUser);

    // //Перейти на вкладку Users table
    // document.getElementById('usersTable-tab').click();
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