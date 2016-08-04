describe('ImageFetcher', function() {
    jasmine.getJSONFixtures().fixturesPath = 'tests/spec/fixtures';
    beforeEach(function() {
        this.imageFetcher = new ImageFetcher();
        this.gifsJson = getJSONFixture('gifs.json');
    });

    it('should not be falsy', function(){
        expect(this.imageFetcher).toBeTruthy();
    });

    describe('init', function() {
        it('should call getJson', function() {
            spyOn(this.imageFetcher, 'getJson');
            this.imageFetcher.init();

            expect(this.imageFetcher.getJson).toHaveBeenCalled();
        });
    });

    describe('json handling', function() {
        it('should put gifs array in localStorage if ajax succeeded', function() {
            spyOn($, 'ajax').and.callFake(function(e) {
                e.success({});
            });
            spyOn(localStorage, 'setItem');
            this.imageFetcher.getJson(this.imageFetcher.jsonConfig);

            expect(localStorage.setItem).toHaveBeenCalled();
        });
        it('should log error if ajax errored', function() {
            spyOn($, 'ajax').and.callFake(function(e) {
                e.error({});
            });
            spyOn(console, 'log');

            this.imageFetcher.getJson(this.imageFetcher.jsonConfig);

            expect(console.log).toHaveBeenCalled();
        });
    });
});
