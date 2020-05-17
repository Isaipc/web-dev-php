$(document).ready(function () {
    init();

    //SEARCH account
    $('#account-search').on('keyup', (e) => {

        const search = $('#account-search').val().trim();
        const url = 'app/account.search.php';

        $.get(url, { search }, (response) => {
            const accounts = JSON.parse(response);

            if (accounts.length > 0)
                bind(accounts);
            else {
                $('#account-grid').hide();
                $('#grid-alert').html(`No se encontrarón coincidencias`).show();
            }
        });
    });

    // SAVE account: CREATE AND UPDATE
    $('#account-form').submit(e => {
        e.preventDefault();

        const url = $('#id').val() == '' ? 'app/account.store.php' : 'app/account.edit.php';
        console.log(url);

        const postData = {
            id: id.val(),
            name: firstname.val().trim().toUpperCase(),
            lastname: lastname.val().trim().toUpperCase(),
            email: email.val().trim(),
            password: password.val(),
            dni: dni.val().trim(),
            phone: phone.val().trim(),
            zipcode: zipcode.val().trim(),
            age: age.val(),
            gender: $('input:radio[name="gender"]:checked').val(),
            address: address.val().trim(),
        };

        console.log(postData);

        if (form[0].checkValidity() === false) {
            console.log('error-de-validación');
            e.preventDefault();
            e.stopPropagation();
            form.addClass('was-validated');
        } else {
            $.post(url, postData, (response) => {
                console.log(response);
                let alertObj = {};

                if (response == 200) {
                    form.trigger('reset');
                    reset();
                    $('#account-modal').modal('hide');
                    listAll();
                    alertObj = { type: 'success', message: 'Se guardó la cuenta correctamente' };
                }
                else
                    alertObj = { type: 'danger', message: 'Se ha producido un error. ' + response };
                showAlert(alertObj);
            });
        }
    });


    // SINGLE account: SHOW / SELECT
    $(document).on('click', '.account-edit', (e) => {
        const selectedId = e.currentTarget.id;
        const url = 'app/account.show.php';

        $.get(url, { id: selectedId }, (response) => {
            const account = JSON.parse(response);

            title.html('Editar cuenta');
            id.val(account.id);
            firstname.val(account.name);
            lastname.val(account.lastname);
            email.val(account.email);
            password.val(account.password);
            dni.val(account.dni);
            phone.val(account.phone);
            zipcode.val(account.zipcode);
            age.val(account.age);
            address.val(account.address);
            $('input:radio[value="' + account.gender + '"]').prop('checked', true);
            $('#account-modal').modal();
        });
    });

    // DELETE account
    $(document).on('click', '.account-delete', (e) => {
        e.preventDefault();

        const url = 'app/account.delete.php';
        const selectedId = e.currentTarget.id;

        $.post(url, { id: selectedId }, (response) => {
            if (response == 200) {
                alertObj = { type: 'success', message: 'Se ha eliminado la cuenta correctamente' };
                listAll();
            }
            else
                alertObj = { type: 'danger', message: 'No se pudó eliminar la cuenta. ' + response };
            showAlert(alertObj);
        });
    });

    //SHOW account
    $(document).on('click', '.account-show', (e) => {
        e.preventDefault();

        const url = 'app/account.show.php';
        const selectedId = e.currentTarget.id;

        $.get(url, { id: selectedId }, (response) => {
            console.log(response);
            const account = JSON.parse(response);
            $('#id-account').html(account.id);
            $('#name-account').html(account.name);
            $('#lastname-account').html(account.lastname);
            $('#email-account').html(account.email);
            $('#password-account').html(account.password);
            $('#dni-account').html(account.dni);
            $('#phone-account').html(account.phone);
            $('#zipcode-account').html(account.zipcode);
            $('#age-account').html(account.age);
            $('#gender-account').html(account.gender);
            $('#address-account').html(account.address);
            $('#created-at-account').html(account.created_at);
            $('#updated-at-account').html(account.updated_at);
        });
    });

    // FETCH accountS: LIST
    function listAll() {
        const url = 'app/account.list.php';

        $.get(url, null, (response) => {
            const accounts = JSON.parse(response);
            if (accounts.length > 0)
                bind(accounts);
            else {
                $('#account-grid').hide();
                $('#grid-alert').html(`No hay cuentas guardadas`).show();
            }
        });
    }

    function bind(accounts) {
        let template = '';
        let i = 0;
        accounts.forEach(account => {
            template += `
                <tr>
                    <td> ${(++i)} </td>
                    <td>
                        <a href="#" class="account-show btn-link" id="${account.id}" data-toggle="modal"
                        data-target="#account-details-modal">
                            ${account.name} 
                        </a>
                    </td>
                    <td> ${account.lastname} </td>
                    <td> ${account.email} </td>
                    <td> ${account.created_at} </td>
                    <td> ${account.updated_at == null ? '' : account.updated_at} </td>
                    <td>         
                        <button id="${account.id}"
                            class="account-edit btn btn-outline-primary waves-effect btn-sm btn-rounded">
                            <i class="fa fa-pen" aria-hidden="true"></i>
                        </button>            
                    </td>
                    <td>
                        <button id="${account.id}"
                            class="account-delete btn btn-outline-danger waves-effect btn-sm btn-rounded">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>`
        });
        $('#account-grid-body').html(template);
        $('#account-grid').show();
        $('#grid-alert').hide();
    }


    //Al ocultarse el formulario
    $('#account-modal').on('hidden.bs.modal', (e) => {
        const element = e.currentTarget.id;
        reset();
    });

    //Al mostrarse el formulario
    $('#account-modal').on('show.bs.modal', function (e) {
    });

    function showAlert(alert) {
        let iClasses = alert.type == 'success' ? 'fa fa-check' : 'fa fa-times';
        let alertClasses = 'alert-' + alert.type + ' bg-' + alert.type;

        $('#alert-type').removeClass().addClass(iClasses);
        $('#alert-account').removeClass('alert-success alert-danger bg-success bg-danger');
        $('#alert-account').addClass(alertClasses);

        $('#alert-message').html(alert.message);
        $('#alert-account').fadeTo(3000, 500)
            .slideUp(500, function () {
                $("#alert-account").slideUp(500)
            });
    }

    function reset() {
        form.removeClass('was-validated');
        title.html('Nueva cuenta');
        clearItems();
    }

    function clearItems() {
        items = inputs;
        items.forEach(element => {
            element.val('');
        });
    }

    function focusItems(items) {
        items.forEach(element => {
            console.log(element);
            element.focus();
        });
    }

    function init() {
        $('#alert-account').hide();
        title = $('#title');
        id = $('#id');
        firstname = $('#name');
        lastname = $('#lastname');
        email = $('#email');
        password = $('#password');
        dni = $('#dni');
        phone = $('#phone');
        zipcode = $('#zipcode');
        age = $('#age');
        address = $('#address');
        gender = $('input:radio[name="gender"]');
        inputs = [id, firstname, lastname, email, password, dni, phone, zipcode, age, address];

        form = $('#account-form');
        id.val('');
        listAll();
    }
});