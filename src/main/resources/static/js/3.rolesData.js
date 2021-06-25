function rolesData() {
    console.log("START FETCH")
    //example GET query

    fetch("/rest/admin/listRoles").then(response => {
        // console.log(response);
        if (!response.ok) {
            throw Error("ERROR");
        }
        return response.json();
    }).then(data => {
        // console.log(data);

        const html = data.map(role => {

                return `                
                <option value="${role.id},${role.name}">${role.name}</option>
`;
            }
        )
            .join("");
        // console.log(html);
        //Добавляем роли в список пользователей
        document
            .querySelector('#selectedRoleNewUser')
            .insertAdjacentHTML("afterbegin", html);
        //Добавляем роли на страницу edit User
        document
            .querySelector('#selectedRoleEditUser')
            .insertAdjacentHTML("afterbegin", html);
    }).catch(error => {
        console.log(error);
    });
}