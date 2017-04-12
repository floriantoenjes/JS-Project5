"use strict";

$(".desc").hide();
$(".album-list").hide();

const $album = $(`<li>
            <div class="album-wrap">
              <img class="album-art" src="https://i.scdn.co/image/23837f31d4791981db85588e57a86cf2ce5b88e3">
            </div>
            <span class="album-title">Luck of the Draw</span>
            <span class="album-artist">Bonnie Raitt</span>
          </li>`);



$(".search-form").submit(function (evt) {
    evt.preventDefault();

    const query = $("#search").val();
    $.getJSON(`https://api.spotify.com/v1/search?q=${query}&type=album`, displayAlbums);
});

function displayAlbums(data) {
    if (data.albums.items.length === 0) {
        showNoAlbumFound()
    } else {
        $.each(data.albums.items, function (index, album) {
            console.log(`${index}: ${album.name}`);
        });
    }
}

function showAlbum() {

}

function showNoAlbumFound() {
    $(".no-albums").remove();
    const query = $("#search").val();
    const $noAlbumFound = $(`<li class='no-albums'>
            <i class='material-icons icon-help'>help_outline</i>No albums found that match: ${query}.
          </li>`);

    $(".main-content").append($noAlbumFound)
}

//$(".album-list").append($album)
