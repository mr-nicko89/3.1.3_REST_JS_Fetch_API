function addUser(data) {
    // console.log(JSON.stringify(data))
    fetch("/rest/admin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            data
        )
    });

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
    addUser(formData);
    //Отчистить форму
    event.target.reset();
    //Добавить строку в Users table

    const htmlAddNewUser = `
                <tr class="border-top">
                   <td>${formData.name}</td> 
                   <td>${formData.age}</td> 
                   <td>${formData.email}</td> 
                   <td>${formData.password}</td> 
                   <td>${formData.roleSet.map(role => {
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