describe('Board', function() {
    jasmine.getJSONFixtures().fixturesPath = 'tests/spec/fixtures';
    beforeEach(function() {
        this.board = new Board();
        this.gifsJson = getJSONFixture('gifs.json');
    });

    it('should not be falsy', function(){
        expect(this.board).toBeTruthy();
    });

    describe('json handling', function() {
        it('should call loadGifs if ajax succeeded', function() {
            spyOn($, 'ajax').and.callFake(function(e) {
                e.success({});
            });
            spyOn(this.board, 'loadGifs');

            this.board.getJson(this.board.jsonConfig);

            expect(this.board.loadGifs).toHaveBeenCalled();
        });
        it('should log error if ajax errored', function() {
            spyOn($, 'ajax').and.callFake(function(e) {
                e.error({});
            });
            spyOn(console, 'log');

            this.board.getJson(this.board.jsonConfig);

            expect(console.log).toHaveBeenCalled();
        });

        describe('loadGifs', function() {
            it('should return array of gifs',function(){
                gifs = this.board.loadGifs(this.gifsJson);
                expected = ["http://i.imgur.com/Ah3Fnc6.jpg", "http://i.imgur.com/wrdlaJW.jpg"];

                expect(gifs).toEqual(expected);
            });
        });
    });
});
