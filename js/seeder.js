$((e) => {

    url = 'app/account.list.php';
    $.get(url, null, (response) => {

        accounts = JSON.parse(response);
        if (accounts.length == 0)
            fillDummyData();
    });


});

function fillDummyData() {
    url = 'js/accounts.json';
    $.get(url, null, (response) => {
        accounts = response;
        if (accounts.length > 0)
            storeDyummyData();
    });

}

function storeDyummyData() {
    url = 'app/account.store.php';
    accounts.forEach(account => {
        $.post(url, account, (response) => {
            console.log(response);
        });
    });
    listAll();
}