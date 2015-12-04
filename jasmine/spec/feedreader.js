/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    // I had to increase the timeout to be huge because the replacement api (superfeedr)
    // sometime takes a long time to complete
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 45000;

    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('should not have a non-empty URL object', function() {
           allFeeds.forEach(function(singleFeed) {
               expect(singleFeed.url).toBeDefined();
               expect(singleFeed.url.length).not.toBe(0);
           }, this);
        });

        it('should have a defined non-empty name', function() {
           allFeeds.forEach(function(singleFeed) {
               expect(singleFeed.name).toBeDefined();
               expect(singleFeed.name.length).not.toBe(0);
           }, this);
        });
    });

    describe('The menu', function() {

        it('should be hidden by default', function() {
           var hiddenMenu = $('.menu-hidden .menu');
           expect(hiddenMenu.length).toBe(1);
        });

        it('should be shown when clicked and hidden when clicked again.', function() {
           var menuIcon = $('.menu-icon-link');
           var theActualMenu = $('.menu');
           // to verify visibility we look at the parents nodes for the presence of any element with the class .menu-hidden
           expect(theActualMenu.parents('.menu-hidden').length).toBe(1);
           menuIcon.trigger('click');
           expect(theActualMenu.parents('.menu-hidden').length).toBe(0);
           menuIcon.trigger('click');
           expect(theActualMenu.parents('.menu-hidden').length).toBe(1);
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
               done();
            });
        });

        it('should have at least one entry available', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        var feedSelector = '.feed .entry';
        var previousEntries = [];
        var newEntries = [];

        var oldTimeout;

        beforeAll(function() {
           oldTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
           jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
        });

        // load one feed, then when that's done read in the entries, then load in the second feed and read those entries
        beforeEach(function(done) {
            loadFeed(0, function() {
                var previousVal = $(feedSelector);
                previousVal.each(function() {
                    previousEntries.push($(this).html());
                });
                loadFeed(1, function() {
                    var newVal = $(feedSelector);
                    newVal.each(function() {
                        newEntries.push($(this).html());
                    });

                    // since the second feed has been loaded and processed, now we can move forward with the spec
                    done();
                });
            });
        });

        it('should actually result in content changing', function(done) {
            // look at the values retrieved, they should not be the same
            newEntries.forEach(function(value, index) {
                expect(value === previousEntries[index]).toBe(false);
            });
            done();
        });

        afterAll(function() {
           jasmine.DEFAULT_TIMEOUT_INTERVAL = oldTimeout;
        });
    });

    // below are specs for features that can be added in the future, but are not yet implemented; thus they will fail
    // Later on we'll have a social media "Share" functionality added for each RSS entry
    describe('Share feed entry', function() {

        beforeAll(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('dialog should pop up when the share functinality is activated', function() {
             var shareWindow = $('.share-dialog');
             expect(shareWindow.parents('.share-hidden').length).toBe(1);
             var feedEntryShare = $('.feed .entry .share')[0];
             feedEntryShare.trigger('click');
             expect(shareWindow.parents('.share-hidden').length).toBe(0);
        });

        it('should have at least one social network option available in the backend', function() {
            var shareItem = new ShareHelper();
            expect(shareItem.socialNetworks.length).toBeGreaterThan(0);
        });
    });
}());
