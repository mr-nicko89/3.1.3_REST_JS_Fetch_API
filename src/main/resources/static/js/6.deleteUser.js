function loadFormDeleteOnClick(context) {
    let elem = [
        {
            find: "#idUserID",
            delete: "#idDeleteUser"
        },
        {
            find: "#nameUserID",
            delete: "#nameDeleteUser"
        },
        {
            find: "#ageUserID",
            delete: "#ageDeleteUser"
        },
        {
            find: "#emailUserID",
            delete: "#emailDeleteUser"
        },
        {
            find: "#passwordUserID",
            delete: "#passwordDeleteUser"
        },
        {
            find: "#rolesUserID",
            innerHTML: "#selectedRoleDeleteUser"
        }
    ];

    elem.forEach(element => {

        const $item = $(context).closest("tr")   // Finds the closest row <tr>
            .find(element.find)     // Gets a descendent with class="nr"
            .text();         // Retrieves the text within <td>
        if (element.delete) {
            $(element.delete).val($item);       // Outputs the answer
        } else {
            $(element.innerHTML).html(() => {
                const items = $item.split(",")
                // console.log(items);
                let html = "";
                for (let i = 0; i < items.length; i++) {
                    html += `<option>${items[i]}</option>`;
                }
                // console.log(html);
                return html;
            });       // Outputs the answer
        }
    })
    ;

};


//Отправка запроса на удаление пользователя
function deleteUser(data) {
    // console.log(data);
    const URL = `/rest/admin/${data.id}`;
    // console.log(URL);

    fetch(URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

}

//Действие при нажатии на Отправить в форме Создания пользователя
async function clickDeleteUser(event) {
    // останавливает действие по умолчанию
    event.preventDefault();

    let formData = {
        id: document.querySelector('#idDeleteUser').value,
    };
    deleteUser(formData);
    //Отчистить форму
    event.target.reset();

//     //Скрыть модальное окно удаления пользователя
    $('#deleteUserModal').modal("hide");
    $(`#trUserID${formData.id}`).remove();
    // trUserID${user.id}
};