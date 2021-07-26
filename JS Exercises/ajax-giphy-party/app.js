console.log("Let's get this party started!");

const key = 'sHGuBLWdXmpfsOjOoGPndZMCw730ctSi';
const container = $('#container');

$('form').on('submit', function(e){
    e.preventDefault();
    const input = $('#search').val()
    async function getGif() {
        try {
            const res = await axios.get('http://api.giphy.com/v1/gifs/search', {params: {q: input, api_key: key}});
            creatGif(res.data.data[0].embed_url);
        } catch (error) {
            alert("Invalid Search Term");
        }
    }
   getGif();
   $('#search').val('');
})

function creatGif(url) { 
    const iframe = document.createElement('iframe');
    iframe.width = '240';
    iframe.height = '240';
    iframe.frameBorder = '0'
    iframe.src = url;
    container.append(iframe);
}

$('#remove').on('click', function(){
    container.text('');
})