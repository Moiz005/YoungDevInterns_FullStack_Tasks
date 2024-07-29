let cards = document.querySelectorAll('.cards>*');
let leftArrow = document.querySelector('.testimonials .arrows .left-arrow');
let rightArrow = document.querySelector('.testimonials .arrows .right-arrow');
let testimonialCards = document.querySelectorAll('.testimonials .testimonial-cards .card');
let icons = document.querySelectorAll('.svg-icon');
let msg_svgs = document.querySelectorAll('.svg-box svg');
const sentences = ["Get a Compititive job", "On your desired domain", "Gives hands on experience"];
let currentCircle = 0;
let numLeftClicks = 0;
let numRightClicks = 0;



icons.forEach((icon)=>{
    gsap.from(icon, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
            trigger: icon,
            start: 'top 80%',
            end: 'top 90%',
            scrub: 3,
            markers: false,
        }
    });
});

gsap.to('.task-portal .floating-img', {
    x: '-5vw',
    opacity: 1,
    scrollTrigger: {
        trigger: '.floating-img',
        start: 'top 70%',
        end: 'top 60%',
        scrub: 3,
    }
});

gsap.to('.task-portal .floating-img', {
    y: 13,
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
});

gsap.to('.floating-img-2', {
    x: '0vw',
    opacity: 1,
    scrollTrigger: {
        trigger: '.floating-img-2',
        start: 'top 70%',
        end: 'top 60%',
        scrub: 3,
    }
});

gsap.to('.floating-img-2', {
    y: 13,
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
});

gsap.to('.task-portal .floating-img-3', {
    x: '-12vw',
    opacity: 1,
    scrollTrigger: {
        trigger: '.floating-img-3',
        start: 'top 70%',
        end: 'top 60%',
        scrub: 3,
    }
});

gsap.to('.task-portal .floating-img-3', {
    y: 13,
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
});

gsap.to('.floating-img-4', {
    x: '0vw',
    opacity: 1,
    scrollTrigger: {
        trigger: '.floating-img-4',
        start: 'top 70%',
        end: 'top 60%',
        scrub: 3,
    }
});

gsap.to('.floating-img-4', {
    y: 13,
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1
});

gsap.to('.floating-img-5', {
    x: '0vw',
    opacity: 1,
    scrollTrigger: {
        trigger: '.floating-img-5',
        start: 'top 70%',
        end: 'top 60%',
        scrub: 5,
    }
});

msg_svgs.forEach((msg_svg)=>{
    gsap.to(msg_svg, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            scrub: 5,
            trigger: msg_svg,
            start: 'top 80%',
            end: 'top 75%',
        }
    });
});

rightArrow.addEventListener('click', ()=>{
    if(testimonialCards.length - numRightClicks > 2){
        numRightClicks += 1;
        testimonialCards.forEach(async(card)=>{
            await gsap.to(card, {
                x: `${numRightClicks * -37}vw`,
                duration: 1,
            });
        });
    }
});

leftArrow.addEventListener('click', ()=>{
    if(numRightClicks > 0){
        numRightClicks -= 1;
        testimonialCards.forEach(async(card)=>{
            await gsap.to(card, {
                x: `${numRightClicks * -37}vw`,
                duration: 1,
            });
        });
    }
});