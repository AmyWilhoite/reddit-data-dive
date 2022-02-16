# Reddit Data Dive

## Overview

For our first project, our team conceived and executed a design that solves a real-world problem by integrating data received from multiple server-side API requests. The server-side APIs used in the project were Reddit and Wikipedia.  The first was to search for a topic of interest to see the hottest posts on that particular topic within the last month.  The second was to look up word(s) from the Reddit post title to obtain more information on that topic from Wikipedia.

By working collaboratively, we learned agile development methodologies and implemented feature and bug fixes using git branch workflow and pull requests.

## User Story

```md
AS A curious Reddit user
I WANT to enter a keyword(s) that interests me
SO THAT I can see three Reddit posts with this term by using an advanced filter to narrow results, as well as search on Wikipedia for more information on words in any of the posts' titles
```

## Acceptance Criteria

```md
GIVEN I am using a search engine to search Reddit posts and obtain more information about them
WHEN I open the application
THEN I am presented with a search form to enter search criteria
WHEN I enter search criteria
THEN I am presented with the top hottest Reddit posts of the last month as a default
WHEN I use the advanced filters
THEN I can narrow my search to specify category, scope, sorting criteria, timespan and the top 10 subreddits
WHEN I view the Reddit posts
THEN I can see the username, title of the post, number of comments, number of upvotes and number of downvotes, and an image if there is one
WHEN I select words in the title
THEN I am presented with a tooltip giving more information on that word(s) from Wikipedia (title, snippet, and original URL)
WHEN I hover over the selected word(s) 
THEN I am given three seconds to read the tooltip and potentially click on the Wikipedia URL of the original source
WHEN I enter search criteria
THEN it is saved in local storage
WHEN I refresh the page
THEN the saved keywords persist
WHEN I click on the button of a recent search term
THEN I am reconnected to Reddit to retrieve the most up-to-date information on that topic
```
## Picture of Deployed Application [placeholder]

![A user searches for a Reddit topic and is presented with 3 posts based on an advanced filtering mechanism.](./assets/images/RedditDataDive.png)

## Website of Deployed Application

https://amywilhoite.github.io/reddit-data-dive/




