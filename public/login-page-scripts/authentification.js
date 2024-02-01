async function login(e) {
    e.preventDefault();
    const uname = document.getElementById("username-field").value;
    const pword = document.getElementById("password-field").value;

    const url = "/api/login";
    const data = "username="+uname+"&password="+pword

    const response = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    if (response.status == 200){
        const sessionToken = await response.text();
        document.cookie = "sessionToken="+sessionToken; 
        window.location.href = "/dashboard";
        return;
    }
    else if (response.status != 200){
        displayErrorMessage("Wrong username or password");
        return;
    }
    console.log(sessionToken)
}

function displayErrorMessage(message) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.textContent = message;
    errorContainer.style.color = 'red';
}