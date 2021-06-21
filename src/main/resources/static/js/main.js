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
        console.log(data);
        const html = data.map(user => {
            return `
                <tr class="border-top">
                   <td>${user.name}</td> 
                   <td>${user.age}</td> 
                   <td>${user.email}</td> 
                   <td>${user.password}</td> 
                   <td>${user.roleSet.map(role =>{
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
        console.log(html);
        document
            .querySelector('#usersList')
            .insertAdjacentHTML("afterbegin", html);
        // .innerHTML = html;
    }).catch(error => {
        console.log(error);
    });
}

usersData()