$(document).ready(function () {

    console.log(name);
    init();    

    $('#account-search').on('keyup', (e) => {
        const search = $('#account-search').val().trim();
        const url = 'app/account.search.php';

        $.get(url, { search }, (response) => {
            console.log(response);
            const accounts = JSON.parse(response);
            bind(accounts);
        });
    });

    // SAVE account: CREATE AND UPDATE
    $('#account-form').submit(e => {
        e.preventDefault();

        const url = $('#accountId').val() == '' ? 'app/account.store.php' : 'app/account.edit.php';
        console.log(url);

        const postData = {
            id: accountId.val(),
            name: firstname.val().trim(),
            lastname: lastname.val().trim(),
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

        form = $('#account-form');
        if (form[0].checkValidity() === false) {
            console.log('error-de-validación');
            e.preventDefault();
            e.stopPropagation();
            form.addClass('was-validated');
        } else {
            console.log('subido');
            $.post(url, postData, (response) => {
                console.log(response);
                form.trigger('reset');
                fetchAll();
            });

            form.removeClass('was-validated');
            $('#account-panel').modal('hide');
            $('#accountId').val('');
            title.html('Nueva cuenta');
        }
    });


    // SINGLE account: SHOW / SELECT
    $(document).on('click', '.account-edit', (e) => {
        const id = e.currentTarget.id;
        const url = 'app/account.show.php';

        $.get(url, { id }, (response) => {
            const account = JSON.parse(response);
            console.log(account);

            title.html('Editar cuenta');
            accountId.val(account.id);
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
            
            $('#account-modal').modal({
                focus: true,
                show: true
            });

            const inputs = [accountId, firstname, lastname, email, password, dni, phone, zipcode, age, address, gender];
        });
    });

    // DELETE account
    $(document).on('click', '.account-delete', (e) => {
        e.preventDefault();

        const url = 'app/account.delete.php';
        const id = e.currentTarget.id;

        $.post(url, { id }, (response) => {
            console.log(response);
            fetchAll();
        });
    });

    //SHOW account
    $(document).on('click', '.account-show', (e) => {
        e.preventDefault();

        const url = 'app/account.show.php';
        const id = e.currentTarget.id;

        $.get(url, { id }, (response) => {
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
    function fetchAll() {
        $.ajax({
            url: 'app/account.list.php',
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                const accounts = response;

                if (accounts.length > 0)
                    bind(accounts);
                else
                    $('#account-grid').html(`
                        <div class="card-body">
                            <div class="alert alert-warning" role="alert">
                                <i class="fas fa-info-circle"></i>
                                <strong>No hay cuentas guardadas</strong>
                            </div>
                        </div>
                    `);
            },
            error: (e) => {
                console.log(e);
            }
        });
    }

    function bind(accounts) {
        let template = '';

        accounts.forEach(account => {
            template += `
                <tr>
                    <td>
                        <a href="#" class="account-show btn-link" id="${account.id}" data-toggle="modal"
                        data-target="#account-details-modal">
                            ${account.name} 
                        </a>
                    </td>
                    <td> ${account.lastname} </td>
                    <td> ${account.phone} </td>
                    <td> ${account.email} </td>
                    <td> ${account.created_at} </td>
                    <td> ${account.updated_at} </td>
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
    }

    $('#account-modal').on('show.bs.modal', function (e) {
        const element = e.currentTarget.id;
        console.log(e);
        if(element == '#btn-add')
            console.log('wow!');
        else
            console.log('sorry :C');
    });
    
    function reset(){
        title.html('Nueva cuenta');
    }
    function setValue(items){
        items.forEach(element => {
            console.log(element);
        });
    }
    
    function clearItems(items){
        items.forEach(element => {
            console.log(element);
            element.val('');
        });
    }
    
    function focusItems(items){
        items.forEach(element => {
            console.log(element);
            element.focus();
        });
    }

    function init(){
        title = $('#title');
        accountId = $('#accountId');
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

        accountId.val('');
        fetchAll();
    }
});