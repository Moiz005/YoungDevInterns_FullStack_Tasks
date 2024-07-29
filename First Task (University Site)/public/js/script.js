let rightArrow = document.querySelector('.right');
let leftArrow = document.querySelector('.left');
let sliderArr = document.querySelectorAll('.slider li');
let card1 = document.querySelector('#card1');
let card2 = document.querySelector('#card2');
let card3 = document.querySelector('#card3');
let navItem = document.querySelectorAll('.nav > ul > li');
let navId = ['two', 'three', 'four', 'five', 'six'];
let header = document.querySelector('header');
let page = document.querySelector('.page-wrapper');
let scrollLaunch = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
let index = 0;

rightArrow.addEventListener('mouseenter', ()=>{
    gsap.set('.right',{
        backgroundColor: 'black',
    });
    gsap.to('.right', {
        fill: 'rgba(255, 255, 255, 0.719)',
        duration: 1,
    });
});

rightArrow.addEventListener('mouseleave', ()=>{
    gsap.set('.right',{
        backgroundColor: 'transparent',
    });
    gsap.to('.right', {
        fill: 'white',
        duration: 1,
    });
});

leftArrow.addEventListener('mouseenter', ()=>{;
    gsap.set('.left',{
        backgroundColor: 'black',
    });
    gsap.to('.left', {
        fill: 'rgba(255, 255, 255, 0.719)',
        duration: 1,
    });
});

leftArrow.addEventListener('mouseleave', ()=>{
    gsap.set('.left',{
        backgroundColor: 'transparent',
    });
    gsap.to('.left', {
        fill: 'white',
        duration: 1,
    });
});

rightArrow.addEventListener('click', async()=>{
    await gsap.to('.slider li', {
        opacity: 0,
        y: 100,
        duration: 1,
    });
    if(index+1 < sliderArr.length){
        sliderArr[index].classList.add('hidden');
        index += 1;
        sliderArr[index].classList.remove('hidden');
    }
    else{
        sliderArr[index].classList.add('hidden');
        index = 0;
        sliderArr[index].classList.remove('hidden');
    }
    await gsap.to('.slider li', {
        opacity: 1,
        y: 0,
        duration: 1,
    });
});

leftArrow.addEventListener('click', async ()=>{
    await gsap.to('.slider li', {
        opacity: 0,
        y: -100,
        duration: 1,
    });
    if(index-1 >= 0){
        sliderArr[index].classList.add('hidden');
        index -= 1;
        sliderArr[index].classList.remove('hidden');
    }
    else{
        sliderArr[index].classList.add('hidden');
        index = sliderArr.length - 1;
        sliderArr[index].classList.remove('hidden');
    }
    await gsap.to('.slider li', {
        opacity: 1,
        y: 0,
        duration: 1,
    });
});

card1.addEventListener('mouseenter', ()=>{
    gsap.to(card1, {
        y: -20,
        duration: 0.5,
    });
});

card1.addEventListener('mouseleave', ()=>{
    gsap.to(card1, {
        y: 0,
        duration: 0.5,
    });
});

card2.addEventListener('mouseenter', ()=>{
    gsap.to(card2, {
        y: -20,
        duration: 0.5,
    });
});

card2.addEventListener('mouseleave', ()=>{
    gsap.to(card2, {
        y: 0,
        duration: 0.5,
    });
});

card3.addEventListener('mouseenter', ()=>{
    gsap.to(card3, {
        y: -20,
        duration: 0.5,
    });
});

card3.addEventListener('mouseleave', ()=>{
    gsap.to(card3, {
        y: 0,
        duration: 0.5,
    });
});

navItem.forEach((item, i)=>{
    item.addEventListener('mouseenter', async()=>{
        gsap.to(`.nav>ul>#${navId[i]}>.upper`, {
            color: '#ffc107',
            duration: 0.7,
        });
        gsap.to(`.nav>ul>#${navId[i]}>.upper>svg`, {
            stroke: '#ffc107',
            duration: 0.7,
        });
        let dropdown = document.querySelector(`.nav>ul>#${navId[i]}>.lower`);
        dropdown.classList.remove('hidden');
        await gsap.to(`.nav>ul>#${navId[i]}>.lower`, {
            opacity: 1,
            duration: 0.7,
        });
    });
    item.addEventListener('mouseleave', async()=>{
        if(scrollLaunch <= 1){
            gsap.to(`.nav>ul>#${navId[i]}>.upper`, {
                color: 'white',
                duration: 0.7,
            });
            gsap.to(`.nav>ul>#${navId[i]}>.upper>svg`, {
                stroke: 'white',
                duration: 0.7,
            });
            await gsap.to(`.nav>ul>#${navId[i]}>.lower`, {
                opacity: 0,
            });
            let dropdown = document.querySelector(`.nav>ul>#${navId[i]}>.lower`);
            dropdown.classList.add('hidden');
        }
        else{
            gsap.to(`.nav #${navId[i]}`, {
                color: 'black',
                duration: 0.7,
            });
            gsap.to(`.nav #${navId[i]} svg`, {
                stroke: 'black',
                duration: 0.7,
            });
            let dropdown = document.querySelector(`.nav #${navId[i]} > .lower`);
            dropdown.classList.add('hidden');
        }
        
    });
});


window.addEventListener('scroll', (dets)=>{
    scrollLaunch = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    navItem.forEach((item, i)=>{
        if(scrollLaunch <= 1){
            gsap.to('header', {
                backgroundColor: 'transparent',
                duration: 0.7,
            });
            gsap.to('.nav > ul', {
                padding: '0px 0px',
                duration: 0.7,
            });
            gsap.to('.nav > ul > li > .upper', {
                color: 'white',
                fontSize: '0.8rem',
                duration: 0.7,
            });
            gsap.to('.nav > ul > a > li > .upper', {
                fontSize: '0.8rem',
                duration: 0.7,
            });
            gsap.to('.nav > ul > li > .upper > svg', {
                stroke: 'white',
                duration: 0.7,
            });
            let anchors = document.querySelectorAll(`.nav > ul > a > li > .upper`);
            let checks = [];
            anchors.forEach((anchor)=>{
                checks.push(anchor.classList.contains('active'));
            });
            checks.forEach((check, i)=>{
                if(check){
                    gsap.to(anchors[i], {
                        color: '#ffc107',
                        duration: 0.7,
                    });
                }
                else{
                    gsap.to(anchors[i], {
                        color: 'white',
                        duration: 0.7,
                    });
                }
            });
        }
        else{
            gsap.to('header', {
                backgroundColor: 'white',
                duration: 0.7,
            });
            gsap.to('.nav > ul', {
                padding: '0px 3em',
                duration: 0.7,
            });
            gsap.to('.nav > ul > li > .upper', {
                color: 'black',
                fontSize: '0.7rem',
                duration: 0.7,
            });
            gsap.to('.nav > ul > a > li > .upper', {
                fontSize: '0.7rem',
                duration: 0.7,
            });
            gsap.to('.nav > ul > li > .upper > svg', {
                stroke: 'black',
                duration: 0.7,
            });
            let anchors = document.querySelectorAll(`.nav > ul > a > li > .upper`);
            let checks = [];
            anchors.forEach((anchor)=>{
                checks.push(anchor.classList.contains('active'));
            });
            console.log(checks);
            checks.forEach((check, i)=>{
                if(check){
                    gsap.to(anchors[i], {
                        color: '#ffc107',
                        duration: 0.7,
                    });
                }
                else{
                    gsap.to(anchors[i], {
                        color: 'black',
                        duration: 0.7,
                    });
                }
            });
        }
    });
});