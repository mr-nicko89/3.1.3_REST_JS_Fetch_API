function addUser(data) {
    // console.log(JSON.stringify(data))
    let id = "";
    fetch("/rest/admin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            data
        )
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            id = data;
        });
    return id;
}

//Действие при нажатии на Отправить в форме Создания пользователя
async function SendForm(event) {
    // останавливает действие по умолчанию
    event.preventDefault();

    let elementUserRoles = document.getElementById('selectedRoleNewUser');

    let roleSelectedValues = Array.from(elementUserRoles.selectedOptions).map(el => el.value);
    let roleArray = convertToRoleSet(roleSelectedValues);

    let formData = {
        name: document.querySelector('#nameNewUser').value,
        age: document.querySelector('#ageNewUser').value,
        email: document.querySelector('#emailNewUser').value,
        password: document.querySelector('#passwordNewUser').value,

        roleSet: roleArray
    };
    let idNewUser = addUser(formData);
    console.log(idNewUser);
    //Отчистить форму
    event.target.reset();
    //Добавить строку в Users table

    const htmlAddNewUser = `
                <tr id="trUserID${formData.id}" class="border-top">
                   <td hidden id = "idUserID">${idNewUser}</td>
                   <td id="nameUserID">${formData.name}</td> 
                   <td id="ageUserID">${formData.age}</td> 
                   <td id="emailUserID">${formData.email}</td> 
                   <td id="rolesUserID">${formData.roleSet.map(role => {
        return role.name;
    })}</td>
                   <td>
                   <!--Ссылка на модальное окно редактирования пользователя-->
                       <button id="editUserID${formData.id}" type="button" class="btn btn-info" 
                                data-bs-toggle="modal" data-bs-target="#editUserModal" 
                                onclick="loadFormEditOnClick(this)">Edit
                       </button>
                   </td>
                    <!--Модальное окно удаления пользователя-->
                    <td>
                    <!--Ссылка на модальное окно удаления пользователя-->
                        <button id="deleteUserID${formData.id}" type="button" class="btn btn-danger userDeleteButton"
                                data-bs-toggle="modal" data-bs-target="#deleteUserModal"
                                onclick="loadFormDeleteOnClick(this)"> 
                            Delete
                        </button>
                    </td>
                </tr> 
`;
    document
        .querySelector('#usersList')
        .insertAdjacentHTML("beforeend", htmlAddNewUser);

    //Перейти на вкладку Users table
    document.getElementById('usersTable-tab').click();
};

//Преобразуем роли в roleSet
function convertToRoleSet(Array) {
    let roleSelectedArray = [];

    Array.forEach(element => {
        roleSelectedArray.unshift({
            id: element.split(",")[0],
            name: element.split(",")[1]
        });
    })
    return roleSelectedArray;
}