function rolesData() {
    console.log("START FETCH")
    //example GET query

    fetch("/rest/listRoles").then(response => {
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
        document
            .querySelector('#selectedRoleNewUser')
            .insertAdjacentHTML("afterbegin", html);
    }).catch(error => {
        console.log(error);
    });
}