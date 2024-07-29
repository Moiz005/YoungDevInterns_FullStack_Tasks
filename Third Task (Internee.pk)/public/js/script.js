let circle = document.querySelectorAll('.circle');
let cards = document.querySelectorAll('.cards>*');
let leftArrow = document.querySelector('.testimonials .arrows .left-arrow');
let rightArrow = document.querySelector('.testimonials .arrows .right-arrow');
let testimonialCards = document.querySelectorAll('.testimonials .testimonial-cards .card');
let icons = document.querySelector('.svg-icon');
let msg_svgs = document.querySelectorAll('.svg-box svg');
const sentences = ["Get a Compititive job", "On your desired domain", "Gives hands on experience"];
let currentCircle = 0;
let numLeftClicks = 0;
let numRightClicks = 0;

gsap.from('.cursor', {
    opacity: 0,
    repeat: -1,
    ease: 'power2.inOut',
    duration: 0.9
});

let masterTL = gsap.timeline({repeat: -1});

sentences.forEach((sen)=>{
    let tl = gsap.timeline();
    tl.to('.typed', {
        delay: 1,
        duration: 2,
        text: sen,
    })
    .to('.typed, .cursor', {opacity: 0, duration: 1})
    .set('.typed', {text: ""})
    .to('.typed, .cursor', {opacity: 1, duration: 1})
    masterTL.add(tl);
});

if(currentCircle != 1){
    circle[0].addEventListener('click', ()=>{
        circle.forEach(async(c)=>{
            await gsap.to(c, {
                backgroundColor: 'transparent',
            });
        });
        gsap.to(circle[0], {
            backgroundColor: 'white',
        });
        console.log('Click1');
        for(let i=0; i<cards.length; i+=1){
            gsap.to(cards[i], {x: '0vw', duration: 1, ease: 'power2.inOut'});
        }
        currentCircle = 1;
    });
}

if(currentCircle != 2){
    circle[1].addEventListener('click', ()=>{
        circle.forEach(async(c)=>{
            await gsap.to(c, {
                backgroundColor: 'transparent',
            });
        });
        gsap.to(circle[1], {
            backgroundColor: 'white',
        });
        for(let i=0; i<cards.length; i+=1){
            gsap.to(cards[i], {x: '-89vw', duration: 1, ease: 'power2.inOut'});
        }
        currentCircle = 2;
    });
}

if(currentCircle != 3){
    circle[2].addEventListener('click', ()=>{
        circle.forEach(async(c)=>{
            await gsap.to(c, {
                backgroundColor: 'transparent',
            });
        });
        gsap.to(circle[2], {
            backgroundColor: 'white',
        });
        for(let i=0; i<cards.length; i+=1){
            gsap.to(cards[i], {x: '-179vw', duration: 1, ease: 'power2.inOut'});
        }
        currentCircle = 3;
    });
}

gsap.from('.svg-icon', {
    y: 100,
    opacity: 0,
    scrollTrigger: {
        trigger: '.svg-icon',
        start: 'top 80%',
        end: 'top 90%',
        scrub: 3,
        markers: false,
    }
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

