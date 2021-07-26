document.addEventListener('mousemove', function(event){
    const body = document.querySelector('body');
    let x = window.innerWidth;
    let y = window.innerHeight;
    
    let r = Math.round((event.clientX / x) * 255);
    let b = Math.round((event.clientY / y) * 255);
    // console.log(b);
    body.style.backgroundColor = `rgb(${r}, 0, ${b})`
});

