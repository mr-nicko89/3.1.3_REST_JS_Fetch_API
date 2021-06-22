function deleteUser(but) {
    // console.log('Пример 1 сработал');
    // // var but = (this);
    // // var tr = but.closest("tr")   // Finds the closest row <tr>
    // //         .find("#nameUserID${id}")     // Gets a descendent with class="nr"
    // //         .text();         // Retrieves the text within <td>
    // var name = but.closest("tr")
    //     .find("#nameUserID")
    //     .text();
    //
    //
    // console.log(name);
    // // $("#resultas").append($item);       // Outputs the answer
    // userDeleteButton


    $(".userDeleteButton").click(function () {
        const elem = [
            {
                find: "idUserID",
                delete: "#idDeleteUser"
            },
            {
                find: "#nameUserID",
                delete: "#nameDeleteUser"
            },
            {
                find: "ageUserID",
                delete: "#ageDeleteUser"
            },
            {
                find: "emailUserID",
                delete: "#emailDeleteUser"
            },
            {
                find: "passwordUserID",
                delete: "#passwordDeleteUser"
            }
            // {
            //     find: ,
            //     delete:
            // },
        ]


        elem.forEach(el => {
            const $item = $(this).closest("tr")   // Finds the closest row <tr>
                .find(el.find)     // Gets a descendent with class="nr"
                .text();         // Retrieves the text within <td>
            $(el.delete).val($item);       // Outputs the answer

        });
        // var $item = $(this).closest("tr")   // Finds the closest row <tr>
        //     .find("#nameUserID")     // Gets a descendent with class="nr"
        //     .text();         // Retrieves the text within <td>
        // $("#nameDeleteUser").val($item);       // Outputs the answer


        // "#nameUserID",
        //     "#idDeleteUser",
        //     "#ageDeleteUser",
        //     "#emailDeleteUser",
        //     "#passwordDeleteUser"
        //
        // idDeleteUser
        // ageDeleteUser
        // emailDeleteUser
        // passwordDeleteUser

    });
}