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