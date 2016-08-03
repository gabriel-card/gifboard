(function($, global, document, undefined) {
    var jsonConfig = {
        url: '/gifs.json',
        remainingCallTime: 30000
    };

    function Board() {
        this.jsonConfig = jsonConfig;
    }

    Board.prototype.init = function() {
        this.getJson(this.jsonConfig);
    };

    Board.prototype.getJson = function(config) {
        var self = this;
        $.ajax({
            url: config.url,
            dataType: 'json',
            success: function(data) {
                self.loadGifs(data);
            },
            error: function(error) {
                console.log(error);
            },
            timeout: config.remainingCallTime
        });
    };

    Board.prototype.loadGifs = function(data) {
        var gifs = [];
        $.each(data, function(i, item) {
            gifs.push(item);
        });
        return gifs;
    };

    global.Board = Board;
})(jQuery, window, document);
