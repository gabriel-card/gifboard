describe('Board', function() {
    jasmine.getJSONFixtures().fixturesPath = 'tests/spec/fixtures';
    jasmine.getFixtures().fixturesPath = 'tests/spec/fixtures';

    beforeEach(function() {
        loadFixtures('board.html');
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
        it('should set div.image--child background-image', function() {
            spyOn(this.board, 'randomInt');
            spyOn(this.board.child, 'css');
            this.board.renderImages(this.gifsJson);

            expect(this.board.randomInt).toHaveBeenCalled();
            expect(this.board.child.css).toHaveBeenCalled();
        });
        it('should set div.image--father background-image', function() {
            spyOn(this.board, 'randomInt');
            spyOn(this.board.father, 'css');
            this.board.renderImages(this.gifsJson);

            expect(this.board.randomInt).toHaveBeenCalled();
            expect(this.board.father.css).toHaveBeenCalled();
        });

        it('should never have fatherIndex and childIndex as the same int', function() {
            this.board.renderImages(this.gifsJson);
            expect(this.board.childIndex).not.toEqual(this.board.fatherIndex);
        });

        it("should set fatherIndex to 0 if it's equal or higher than image list length", function() {
            spyOn(this.board, 'randomInt').and.callFake(function() {
                return 1; // image list length = 2
            });
            this.board.renderImages(this.gifsJson);
            expect(this.board.fatherIndex).toBe(0);
        });
    });
});
