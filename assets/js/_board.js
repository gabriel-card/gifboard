(function($, global, document, undefined) {

    function Board(element) {
        this.container = element;
        this.father = this.container.find('div.image--father');
        this.child = this.container.find('div.image--child');
        this.childIndex = false;
        this.fatherIndex = false;
    }

    Board.prototype.init = function() {
        images = this.parseImages(localStorage.getItem('gifboard_images'));
        this.renderImages(images);
    };

    Board.prototype.parseImages = function(stringImages) {
        return JSON.parse(stringImages);
    };

    Board.prototype.renderImages = function(images) {
        this.childIndex = this.randomInt(0, images.length - 1);
        this.fatherIndex = this.childIndex + 1;
        if(this.fatherIndex >= images.length) {
            this.fatherIndex = 0;
        }

        this.child.css('background-image', 'url(' + images[this.childIndex] + ')');
        this.father.css('background-image', 'url(' + images[this.fatherIndex] + ')');
    };

    Board.prototype.randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    global.Board = Board;
})(jQuery, window, document);
