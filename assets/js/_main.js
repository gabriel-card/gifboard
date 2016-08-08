var main = function() {
    var board = new Board($('section.board'));
    board.init();
    var imgFetch = new ImageFetcher(board);
    imgFetch.init();
};
$(main);
