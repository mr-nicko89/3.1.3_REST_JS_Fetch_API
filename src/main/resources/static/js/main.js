// при щелчке на кнопку отправки формы
// отправляем форму на сервер
document.querySelector('#formNewUser').onsubmit = SendForm;


getPrincipal();
usersData();
rolesData();

// $('.userDeleteButton').on('click', deleteOnClick() );

// jQuery.on('click', '.userDeleteButton', deleteOnClick(){

// });
// $(".userDeleteButton").click(function ()

