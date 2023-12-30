

  this directory contain components for comments;

  TextComment |
  TextComment component is responsible for adding new comment; it does so by shipping the text data that has been entered by th user, to its parent parent - CommentBar. Then CommentBar send the text to its parent - CommentContainer. What CommentContainer does is to make new comment object from the text and details of the user, then it pushes this comment object in the list of comments; this action invokes rerendering on the layout.tsx hence new comment is shown to the user. 
  