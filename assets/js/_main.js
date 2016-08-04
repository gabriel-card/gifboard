$(function() {
    var board = new Board($('section.board'));
    var imageFetcher = new ImageFetcher(board);
    imageFetcher.init();
});
