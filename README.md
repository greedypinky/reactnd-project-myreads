# MyReads Project descriptions
 This is a bookshelf app implemented by React that allows user to select and categorize books.
 BooksAPI.js being used to save and update the book state is provided by `Udacity`.

## Main page

The main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:
* Currently Reading
* Want to Read
* Read

From each book on the shelves, user can update the selection of shelves to move the book to a different shelf.
When user clicks the "Add" button, it will navigate to the search page with the path `/search`.
The book on the search page should have the same shelf selection state as of the book that is shown on the shelves.

## Search book
User can type in search query to search the books and the books will be displayed under the search query input.
Please noted that the search terms can be found in https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md. Same as the main page, from each book of the search results, user can update the selection of shelves to move the book to a different shelf. User can click the back button to navigate to the main page `/` root url.
The books on the main page should have the same shelf selection state.

## How to install the project
* install all project dependencies with `npm install`
* start the development server with `npm start`.

 The app will be started at localhost:3001



