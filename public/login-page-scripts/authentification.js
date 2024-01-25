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

    const sessionToken = await response.text();


    console.log(sessionToken)


}