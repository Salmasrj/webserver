async function updateUserData(){
    const usernData = sessionStorage.getItem('username');
    const usernameContainer = document.getElementById('uContainer');
    usernameContainer.textContent = usernData;

    // Find the user's city
    const cityResponse = await fetch(`/api/${usernData}/city`);
    if (!cityResponse.ok) {
        throw new Error(`HTTP error! status: ${cityResponse.status}`);
    }
    const cityData = await cityResponse.text();
    console.log(cityData);
    sessionStorage.setItem('city', cityData);

    // Find the user's profile picture path '/api/:username/profile-picture-path'
    const pictureResponse = await fetch(`/api/${usernData}/profile-picture-path`);
    if (!pictureResponse.ok) {
        throw new Error(`HTTP error! status: ${pictureResponse.status}`);
    }
    const pictureData = await pictureResponse.text();
    console.log(pictureData);
    sessionStorage.setItem('picture', pictureData);

    const imageContainer = document.getElementById('imContainer');
    imageContainer.src = pictureData;
}