function usersData() {
    // console.log("START FETCH")
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
                <tr id="trUserID${user.id}" class="border-top">
                   <td hidden id = "idUserID">${user.id}</td>
                   <td id="nameUserID">${user.name}</td> 
                   <td id ="ageUserID">${user.age}</td> 
                   <td id ="emailUserID">${user.email}</td> 
                   <td id ="rolesUserID">${user.roleSet.map(role => {
                return role.name;
            })}</td>
                   <td>
                   <!--Ссылка на модальное окно редактирования пользователя-->
                       <button id="editUserID${user.id}" type="button" class="btn btn-info"
                                data-bs-toggle="modal" data-bs-target="#editUserModal"
                                onclick="loadFormEditOnClick(this)">Edit
                       </button> 
                   </td>
                    <!--Модальное окно удаления пользователя-->
                    <td>
                    <!--Ссылка на модальное окно удаления пользователя-->
                        <button id="deleteUserID${user.id}" type="button" class="btn btn-danger userDeleteButton"
                                data-bs-toggle="modal" data-bs-target="#deleteUserModal"
                                onclick="loadFormDeleteOnClick(this)"> 
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