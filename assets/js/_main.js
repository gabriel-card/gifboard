var main = function() {
    var board = new Board($('section.board'));
    var imgFetch = new ImageFetcher(board);
    imgFetch.init();
};
$(main);
