// при щелчке на кнопку отправки формы
// отправляем форму на сервер
document.querySelector('#formNewUser').onsubmit = SendForm;

// при щелчке на кнопку удаления пользователя в модальном окне
// удаляем пользователя по id
document.querySelector('#formDeleteUser').onsubmit = clickDeleteUser;

getPrincipal();
usersData();
rolesData();

// $('.userDeleteButton').on('click', deleteOnClick() );

// jQuery.on('click', '.userDeleteButton', deleteOnClick(){

// });
// $(".userDeleteButton").click(function ()

