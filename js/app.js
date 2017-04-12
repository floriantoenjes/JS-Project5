"use strict";

$(".search-form").submit(function (evt) {
    evt.preventDefault();

    const query = $("#search").val();

    // Send AJAX Album Search Request to Spotify API
    $.getJSON(`https://api.spotify.com/v1/search?q=${query}&type=album`, displayAlbums);
});

function displayAlbums(data) {
    $(".album-list li").remove()
    $(".no-albums").remove();

    if (data.albums.items.length === 0) {
        displayNoAlbumsFound();
    } else {
        $.each(data.albums.items, function (index, album) {
            displayAlbum(album);
        });
    }
}

function displayAlbum(album) {
    const $album = $(`<li>
            <div class="album-wrap">
              <img class="album-art" src="${album.images[0].url}">
            </div>
            <span class="album-title">${album.name}</span>
            <span class="album-artist">${album.artists[0].name}</span>
          </li>`);

    $(".album-list").append($album)
}

function displayNoAlbumsFound() {

    const query = $("#search").val();
    const $noAlbumFound = $(`<li class='no-albums'>
            <i class='material-icons icon-help'>help_outline</i>No albums found that match: ${query}.
          </li>`);

    $(".main-content").append($noAlbumFound)
}
