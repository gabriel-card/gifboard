(function($, global, document, undefined) {

    function Board(element) {
        this.container = element;
    }

    Board.prototype.init = function() {
        images = this.parseImages(localStorage.getItem('gifboard_images'));
        this.renderImages(images);
    };

    Board.prototype.parseImages = function(stringImages) {
        return JSON.parse(stringImages);
    };

    Board.prototype.renderImages = function(images) {

    };

    global.Board = Board;
})(jQuery, window, document);
