let navItem = document.querySelectorAll('.nav > ul > li');
let navId = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
navItem.forEach((item, i)=>{
    item.addEventListener('mouseenter', async()=>{
        if(i>0 && i<6){
            let dropdown = document.querySelector(`.nav #${navId[i]} > .lower`);
            dropdown.classList.remove('hidden');
            await gsap.to(`.nav #${navId[i]} > .lower`, {
                opacity: 1,
                duration: 0.7,
            });
        }
    });
    item.addEventListener('mouseleave', async()=>{
        if(i>0 && i<6){
            await gsap.to(`.nav #${navId[i]} > .lower`, {
                opacity: 0,
            });
            let dropdown = document.querySelector(`.nav #${navId[i]} > .lower`);
            dropdown.classList.add('hidden');
        }
    });
});