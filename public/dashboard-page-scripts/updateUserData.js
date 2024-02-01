function updateUserData(){
    const usernData = sessionStorage.getItem('username');
    const usernameContainer = document.getElementById('uContainer');
    usernameContainer.textContent = usernData;
}