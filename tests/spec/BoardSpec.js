describe('Board', function() {
    jasmine.getJSONFixtures().fixturesPath = 'tests/spec/fixtures';
    jasmine.getFixtures().fixturesPath = 'tests/spec/fixtures';

    beforeEach(function() {
        this.dom = loadFixtures('board.html');
        this.board = new Board($('section.board'));
        this.imageFetcher = new ImageFetcher(this.board);
        this.gifsJson = getJSONFixture('gifs.json');

        this.imageFetcher.init();
    });

    it('should not be falsy', function(){
        expect(this.board).toBeTruthy();
    });

    describe('init', function(){
        it('should get images from localStorage and call parseImages with it as arg then pass to renderImages', function(){
            var self = this;
            spyOn(this.board, 'parseImages');
            spyOn(this.board, 'renderImages');
            spyOn(localStorage, 'getItem').and.callFake(function() {
                return JSON.stringify(self.gifsJson);
            });
            this.board.init();

            expect(localStorage.getItem).toHaveBeenCalled();
            expect(this.board.parseImages).toHaveBeenCalledWith(localStorage.getItem());
            expect(this.board.renderImages).toHaveBeenCalled();
        });
    });

    describe('parseImages', function() {
        it('should return an array of images', function() {
            res = this.board.parseImages('["http://i.imgur.com/Ah3Fnc6.jpg", "http://i.imgur.com/wrdlaJW.jpg"]');
            expected = this.gifsJson;

            expect(res).toEqual(expected);
        });
    });

    describe('renderImages', function() {
        it('should set div.board background-image as ');
    });
});
