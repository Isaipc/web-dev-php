$(document).ready(function () {
    // $('#account-panel').hide();
    $('#account-grid-panel').hide();
    $('#account-search-panel').hide();
    $('#accountId').val('');

    fetchAll();

    $('#account-search').on('keyup', (e) => {
        const name = $('#account-search').val().trim();
        const url = 'app/account.search.php';

        $.get(url, { name }, (response) => {
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
            id: $('#accountId').val(),
            name: $('#name').val().trim(),
            lastname: $('#lastname').val().trim(),
            email: $('#email').val().trim(),
            password: $('#password').val(),
            dni: $('#dni').val().trim(),
            phone: $('#phone').val().trim(),
            zipcode: $('#zipcode').val().trim(),
            age: $('#age').val(),
            gender: $('input[name="gender"]:checked').val(),
            address: $('#address').val().trim(),
        };

        console.log(postData);
        
        form = $('#account-form');
        if (form[0].checkValidity() === false) {
            console.log('error-de-validación');
            e.preventDefault();
            e.stopPropagation();
            form.addClass('was-validated');
        }else {
            console.log('subido');
            $.post(url, postData, (response) => {
                console.log(response);
                form.trigger('reset');
                fetchAll();
            });

            form.removeClass('was-validated');

            $('#accountId').val('');
        }
    });


    // SINGLE account: SHOW / SELECT
    $(document).on('click', '.account-item', (e) => {
        const id = e.currentTarget.id;
        const url = 'app/account.single.php';

        $.get(url, { id }, (response) => {
            const account = JSON.parse(response);

            $('#accountId').val(account.id);
            $('#accountName').val(account.name);
            $('#accountDesc').val(account.description);

            $('#accountName').focus();
            $('#accountDesc').focus();
        });
    });

    // DELETE account
    $(document).on('click', '.account-delete', (e) => {
        e.preventDefault();

        const url = 'app/account.delete.php';
        const id = e.currentTarget.id;

        $.post(url, { id }, (response) => {
            console.log(response);
            fetchaccounts();
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
                        <a href="#" class="account-item" id="${account.id}">
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
                            class="account-delete btn btn-outline-danger waves-effect btn-sm btn-rounded">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>`
        });

        $('#account-grid-body').html(template);
    }
});