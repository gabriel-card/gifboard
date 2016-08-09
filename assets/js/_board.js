(function($, global, document, undefined) {

    function Board(element) {
        this.container = element;
        this.father = this.container.find('div.image--father');
        this.child = this.container.find('div.image--child');
        this.images = [];
        this.childIndex = false;
        this.fatherIndex = false;
        this.config = { animationInterval: 15000 };
    }

    Board.prototype.init = function() {
        this.updateImages();
        setInterval(this.renderImages, this.config.animationInterval, this.images);
    };

    Board.prototype.parseImages = function(stringImages) {
        return JSON.parse(stringImages) || [];
    };

    Board.prototype.updateImages = function() {
        this.images = this.parseImages(localStorage.getItem('gifboard_images'));
    };

    Board.prototype.renderImages = function(images) {
        if(!images.length) {
            return console.log('no images to be displayed!');
        }
        if(this.childIndex !== false) {
            this.childIndex++;
            if(this.childIndex >= images.length) {
                this.childIndex = 0;
            }
        } else {
            this.childIndex = this.randomInt(0, images.length - 1);
        }
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
