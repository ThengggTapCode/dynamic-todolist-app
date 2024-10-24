let signedInState = false;
let userList = [];

const auth = document.querySelector('.auth');
const signInPage = document.querySelector('.signin-page');
const signUpPage = document.querySelector('.signup-page');
const app = document.querySelector('.app');

// sign in
const signIn = () => {
    let username = document.getElementById('username').value.toLowerCase();
    let password = document.getElementById('password').value.toLowerCase();

    const usernameInputMessage = document.querySelector('.signin-username');
    const passwordInputMessgae = document.querySelector('.signin-password');

    usernameInputMessage.style.display = 'none';
    passwordInputMessgae.style.display = 'none';

    if (username === '') {
        usernameInputMessage.innerText = "Please don't leave this field empty";
        usernameInputMessage.style.display = 'block';
        return
    }
    if (password === '') {
        passwordInputMessgae.innerText = "Please don't leave this field empty";
        passwordInputMessgae.style.display = 'block';
        return;
    }

    let listUser = JSON.parse(localStorage.getItem('userList'));

    for (let user of listUser) {
        if (username === user.username) {
            if (password === user.password) {
                signedInState = true;

                saveSignedInState(signedInState);
                checkSignedInState(signedInState);
                return;
            }
            passwordInputMessgae.innerText = 'The password is incorrect';
            passwordInputMessgae.style.display = 'block';
        } else {
            usernameInputMessage.innerText = 'Username not found';
            usernameInputMessage.style.display = 'block';
        }
    }
    return;
}

// sign up
const signUp = () => {
    let username = document.getElementById('new-username').value.toLowerCase();
    let password = document.getElementById('new-password').value.toLowerCase();
    let confirmPassword = document.getElementById('confirm-password').value.toLowerCase();

    const usernameInputMessage = document.querySelector('.signup-username');
    const passwordInputMessage = document.querySelector('.signup-password');
    const confirmPasswordInputMessage = document.querySelector('.confirm-password');

    if (username === '') {
        usernameInputMessage.innerText = "Please don't leave this field empty";
        usernameInputMessage.style.display = 'block';
        return;
    }
    if (password === '') {
        passwordInputMessage.innerText = "Please don't leave this field empty";
        passwordInputMessage.style.display = 'block';
        return;
    }
    if (confirmPassword === '') {
        confirmPasswordInputMessage.innerText = "Please don't leave this field empty";
        confirmPasswordInputMessage.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        confirmPasswordInputMessage.innerText = "The confirmed password didn't match!";
        confirmPasswordInputMessage.style.display = 'block';
        return;
    }

    if (localStorage.getItem('userList')) {
        let listUser = JSON.parse(localStorage.getItem('userList'));
        console.log(typeof (listUser, listUser));

        for (let user of listUser) {
            if (username === user.username) {
                usernameInputMessage.innerText = 'Username is already exist!';
                usernameInputMessage.style.display = 'block';
                return;
            }
        }
    }

    let userInfo = {
        username: username,
        password: password
    };
    userList.push(userInfo);
    signedInState = true;

    saveUserList(userList);
    saveSignedInState(signedInState);

    checkSignedInState(signedInState);
    return;
}

// sign out
const signOut = () => {
    signedInState = false;

    saveSignedInState(signedInState);
    checkSignedInState(signedInState);
    return;
}

// redirect to sign in
const redirectToSignIn = () => {
    auth.style.display = 'block';
    signInPage.style.display = 'block';
    signUpPage.style.display = 'none';
    app.style.display = 'none';

    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    return;
}

// redirect to sign up
const redirectToSignUp = () => {
    auth.style.display = 'block';
    signInPage.style.display = 'none';
    signUpPage.style.display = 'block';
    app.style.display = 'none';

    document.getElementById('new-username').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';
    return;
}


const showPasswordBtn = document.querySelectorAll('.show-password');

showPasswordBtn.forEach(button => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;

        if (input.type === 'password') {
            input.type = 'text';
            return;
        }
        input.type = 'password';
        return;
    });
});

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            if (signInPage.style.display !== 'none') {
                signIn();
                return;
            }
            if (signUpPage.style.display !== 'none') {
                signUp();
                return;
            }
            return;
        }
    })
})
const checkSignedInState = (state) => {
    auth.style.display = 'none';
    signInPage.style.display = 'none';
    signUpPage.style.display = 'none';
    app.style.display = 'none';

    if (state) {
        app.style.display = 'block';
        return;
    }
    auth.style.display = 'block';
    signInPage.style.display = 'block';
    return;
}
const saveSignedInState = (state) => {
    localStorage.setItem('signedInState', JSON.stringify(state));
    return;
}

const saveUserList = (list) => {
    localStorage.setItem('userList', JSON.stringify(list));
    return;
}

if (localStorage.getItem('signedInState'))
    signedInState = JSON.parse(localStorage.getItem('signedInState'));

if (localStorage.getItem('userList'))
    userList = JSON.parse(localStorage.getItem('userList'));

checkSignedInState(signedInState);