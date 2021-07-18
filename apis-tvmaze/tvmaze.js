/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  
  let shows = [];
  const res = await axios.get('http://api.tvmaze.com/search/shows', {params: {q: query}});
  const showRes = res.data;
  
  for (let show of showRes){
    if(show.show.image === null) {
      shows.push(
        {
          id: show.show.id,
          name: show.show.name,
          summary: show.show.summary,
          image: 'https://tinyurl.com/tv-missing'
        }
      )
    } else {
      shows.push(
        {
          id: show.show.id,
          name: show.show.name,
          summary: show.show.summary,
          image: show.show.image.original
        }
      )
    }
  }
  return shows;
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="episodes-btn">Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  let episodes = [];
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  const episodeData = res.data;

  for (let episode of episodeData){
    episodes.push(
      {
        id: episode.id,
        name: episode.name,
        season: episode.season,
        number: episode.number
      }
    )
  }
  return episodes;
}

function populateEpisodes(episodes) {
  const $episodeList = $("#episodes-list");
  $episodeList.empty();
  for(let episode of episodes){
    let $item = $(
      `<li>${episode.name} (season ${episode.season}, number ${episode.number})</li>
      `);
      $episodeList.append($item);
  }
}

$('body').on('click', '.episodes-btn', async function(e) {
  
  const show = $(this).parent().parent();
  const episodes = await getEpisodes(show[0].dataset.showId);
  populateEpisodes(episodes);
  $("#episodes-area").show();
})
