import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'

function initializeAndLogin() {
    const client = Stitch.initializeDefaultAppClient('slot-scraper-csdnd');
    client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
        document.getElementById('auth-status').innerHTML =
            `Logged in as anonymous user with id ${user.id}`;
    });
}

window.onload = initializeAndLogin;