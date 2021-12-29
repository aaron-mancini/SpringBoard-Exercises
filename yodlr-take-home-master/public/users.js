$.ajax({
    url: "http://localhost:3000/users",
    success: (data) => {
        for (let user of data) {
            createUser(user);
        }
        
    }
});

function createUser(user) {
    $(".users").append(`<tr>
                            <td>${user.id}</td>
                            <td>${user.firstName}</td>
                            <td>${user.lastName}</td>
                            <td>${user.email}</td>
                            <td>${user.state}</td>
                        </tr>                        
    `) 
}