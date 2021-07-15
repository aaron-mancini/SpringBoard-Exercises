
$('form').on('submit', function(event){
    event.preventDefault();
    const title = $('#title').val();
    const rating = $('#rating').val();



    if(title.length < 3){
        return alert('Title must be longer than 2 characters!');
    }
    
    $('body').append(`<div>Title: ${title} Rating: ${rating}<button class = 'remove'>Remove</button></div>`);
});

$('body').on('click', '.remove', function(event){
    $(this).parent().remove();
});

