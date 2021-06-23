function deleteOnClick(context) {
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
                console.log(html);
                return html;
            });       // Outputs the answer
        }
    })
    ;

};
