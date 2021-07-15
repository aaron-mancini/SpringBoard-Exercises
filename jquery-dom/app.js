$( window ).on('load', function() {return console.log("Let's get ready to party with jQuery!")});

$('article img').addClass('image-center');

$('article p').last().remove();

let random = Math.floor(Math.random() * 100);

$('h1').css('font-size', `${random}px`);

$('li').last().append('<li>I like puppies!</li>');

$('aside').children().remove();
$('aside').html('<p>Sorry for that list.</p>');

$('.mb-5').on('click', function() {
    const red = $('.form-control').eq(0).val()
    const blue = $('.form-control').eq(1).val()
    const green = $('.form-control').eq(2).val()
    console.log(`${red}, ${blue}, ${green}`);
    return $('body').css('background-color', `rgb(${red}, ${blue}, ${green})`);
})

$('img').on('click', () => event.target.remove());
