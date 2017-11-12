import * as APIUtil from '../utils/api';

export const ADD_ALL_POSTS = 'ADD_ALL_POSTS'
export const ADD_POSTS = 'ADD_POSTS'
export const DELETE_POSTS = 'DELETE_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const EDIT_POST = 'EDIT_POST'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const POST_COMMENTS = 'POST_COMMENTS'
export const DELETE_COMMENTS = 'DELETE_COMMENTS'
export const GET_SINGLE_COMMENT = 'GET_SINGLE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_POSTS = 'VOTE_POSTS'
export const VOTE_POSTS_DOWN = 'VOTE_POSTS_DOWN'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const VOTE_COMMENT_DOWN = 'VOTE_COMMENT_DOWN'


export const addAllPostsActions = posts =>{
  return {
    type: ADD_ALL_POSTS,
    posts
  }
};

export const deletedPosts = deleted_posts =>{
  return {
    type: DELETE_POSTS,
    deleted_posts
  }
};

export const fetchPost = post =>{
  return {
    type: FETCH_POST,
    post
  }
};

export const editPosts = post =>{
  return {
    type: EDIT_POST,
    post
  }
};

export const fetchComments = comment =>{
  return {
    type: FETCH_COMMENTS,
    comment
  }
};

export const postComments = comment =>{
  return {
    type: POST_COMMENTS,
    comment
  }
};

export const deletedComments = comment =>{
  return {
    type: DELETE_COMMENTS,
    comment
  }
};

export const getSingleComment = comment =>{
  return {
    type: GET_SINGLE_COMMENT,
    comment
  }
};

export const editComment = comment =>{
  return {
    type: EDIT_COMMENT,
    comment
  }
};

export const votePosts = post =>{
  return {
    type: VOTE_POSTS,
    post
  }
};

export const votePostsDown = post =>{
  return {
    type: VOTE_POSTS_DOWN,
    post
  }
};

export const voteComments = comment =>{
  return {
    type: VOTE_COMMENT,
    comment
  }
};

export const voteCommentsDown = comment =>{
  return {
    type: VOTE_COMMENT_DOWN,
    comment
  }
};


//Async Thunk Reuqest

export const  fetchData = () => dispatch => (
  APIUtil
  .getAllPosts()
  .then(data =>(dispatch(addAllPostsActions(data))))
  .catch(err => (console.log(err)))
)

export const SendPost = (title,body,category,author)=> dispatch =>(
  APIUtil
  .sendPost(title,body,category,author)
  .then(data => (console.log(data)))
  .catch(err => (console.log(err)))
)

export const DeletePost = (id)=> dispatch =>(
  APIUtil
  .deletePost(id)
  .then(data =>(dispatch(deletedPosts(data))))
  .catch(err => (console.log(err)))
)

export const fetchSinglePost = (id)=> dispatch =>(
  APIUtil
  .fetchSinglePost(id)
  .then(data =>(dispatch(fetchPost(data))))
  .catch(err => (console.log(err)))
)

export const AsyncfetchComments = (id)=> dispatch =>(
  APIUtil
  .getComments(id)
  .then(data =>(dispatch(fetchComments(data))))
  .catch(err => (console.log(err)))
)

export const AsyncPostComments = (body,author,postID) =>dispatch=>(
  APIUtil
  .postComments(body,author,postID)
  .then(data =>(dispatch(postComments(data))))
  .catch(err=> (console.log(err)))
)

export const DeleteComment = (id)=> dispatch =>(
  APIUtil
  .deleteComment(id)
  .then(data =>(dispatch(deletedComments(data))))
  .catch(err => (console.log(err)))
)

export const GetSingleComment = (id)=> dispatch =>(
  APIUtil
  .getSingleComment(id)
  .then(data =>(dispatch(getSingleComment(data))))
  .catch(err => (console.log(err)))
)

export const AsycEditPost = (id,title,body)=> dispatch =>(
  APIUtil
  .editPost(id,title,body)
  .then(data =>(dispatch(editPosts(data))))
  .catch(err => (console.log(err)))
)

export const AsycEditComment = (id,body)=> dispatch =>(
  APIUtil
  .editComment(id,body)
  .then(data =>(dispatch(editComment(data))))
  .catch(err => (console.log(err)))
)

export const AsyncVotePost = (id)=> dispatch =>(
  APIUtil
  .votePost(id)
  .then(data =>(dispatch(votePosts(data))))
  .catch(err => (console.log(err)))
)

export const AsyncVotePostDown = (id)=> dispatch =>(
  APIUtil
  .votePostDown(id)
  .then(data =>(dispatch(votePostsDown(data))))
  .catch(err => (console.log(err)))
)

export const AsyncVoteComment = (id)=> dispatch =>(
  APIUtil
  .voteComment(id)
  .then(data =>(dispatch(voteComments(data))))
  .catch(err => (console.log(err)))
)

export const AsyncVoteCommentDown = (id)=> dispatch =>(
  APIUtil
  .voteCommentDown(id)
  .then(data =>(dispatch(voteCommentsDown(data))))
  .catch(err => (console.log(err)))
)
