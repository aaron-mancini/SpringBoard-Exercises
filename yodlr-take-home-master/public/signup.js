$(".user-form").on('submit', function(evt) {
    evt.preventDefault();
    const fName = $('#fName').val()
    const lName = $('#lName').val()
    const email = $('#email').val()
    const state = $('#state').val()
    
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/users",
        data: { email: email,
                firstName: fName,
                lastName: lName,
                state: state}
    })
})