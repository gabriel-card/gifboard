$(function() {
    var board = new Board($('div.board'));
    var imageFetcher = new ImageFetcher(board);
    imageFetcher.init();
});
