// при щелчке на кнопку отправки формы создания нового пользователя
// отправляем форму на сервер
document.querySelector('#formNewUser').onsubmit = SendForm;

// при щелчке на кнопку удаления пользователя в модальном окне
// удаляем пользователя по id
document.querySelector('#formDeleteUser').onsubmit = clickDeleteUser;

// при щелчке на кнопку редактирования пользователя в модальном окне
// редактируем пользователя
document.querySelector('#formEditUser').onsubmit = clickEditUser;

getPrincipal();
usersData();
rolesData();

// $('.userDeleteButton').on('click', deleteOnClick() );

// jQuery.on('click', '.userDeleteButton', deleteOnClick(){

// });
// $(".userDeleteButton").click(function ()

