# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


## How to run

1. Clone or fork this repo
2. Download a local copy
3. Open index.html with your browser

Note that the superfeedr library had to be dropped in for the tests to pass, as the Google feed API was deprecated.

The Jasmine spec test will run. Note: it may take a while to complete due to issues with the google feed replacement API.
The timeout had to be increased to huge numbers becasue of seemingly random delays.

## Future features

I wrote two tests to be the start of a social media sharing functionality.

One test checks to see if the share window pops up when the share button is invoked.

One test checks the backend to make sure there's at least 1 social network programmed in.

More could be written, but the feed reader could use a refactor to be MVC so the tests could be written toward that direction.
