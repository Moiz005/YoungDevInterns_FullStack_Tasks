let loginPage = document.querySelector('.login-page');
if(document.querySelector('.login-page .message') != null){
    let message = document.querySelector('.login-page .message');
    setTimeout(() => {
        message.remove();
    }, 5000);
}