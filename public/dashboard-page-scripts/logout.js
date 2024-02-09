function logout(){
    document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('city');
    sessionStorage.removeItem('picture');
    window.location.href = "/home";
}