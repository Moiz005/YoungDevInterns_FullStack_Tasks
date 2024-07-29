let submitBtn = document.querySelector('.internee-page .tasks .rows .row .btn');
let fileSubmissionForm = document.querySelector('.internee-page .tasks form');
let msg = document.querySelector('.message');
let rightPart = document.querySelector('.right .right-nav .right-part');
let dropdown = document.querySelector('.right .right-nav .right-part .dropdown');

submitBtn.addEventListener('click', ()=>{
    if(fileSubmissionForm != null){
        fileSubmissionForm.style.display = 'inline-block';
    }
    if(msg != null){
        msg.style.display = 'inline-block';
    }
});

setInterval(() => {
    if(msg != null){
        msg.style.display = 'none';
    }
}, 3000);

rightPart.addEventListener('mouseenter', ()=>{
    dropdown.style.visibility = 'visible';
    // console.log(dropdown);
});

rightPart.addEventListener('mouseleave', ()=>{
    dropdown.style.visibility = 'hidden';
});