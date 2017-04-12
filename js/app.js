"use strict";

//$(".album-list").hide();


$(".search-form").submit(function (evt) {
    evt.preventDefault();

    const query = $("#search").val();
    $.getJSON(`https://api.spotify.com/v1/search?q=${query}&type=album`, displayAlbums);
});

function displayAlbums(data) {
    $(".desc").hide();
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
    console.log(album.artists)

    const $album = $(`<li>
            <div class="album-wrap">
              <img class="album-art" src="https://i.scdn.co/image/23837f31d4791981db85588e57a86cf2ce5b88e3">
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
