import { combineReducers } from 'redux'
import {ADD_ALL_POSTS,DELETE_POSTS,FETCH_POST,FETCH_COMMENTS,POST_COMMENTS,DELETE_COMMENTS,GET_SINGLE_COMMENT,EDIT_POST,EDIT_COMMENT,VOTE_POSTS,VOTE_POSTS_DOWN,VOTE_COMMENT_DOWN,VOTE_COMMENT} from '../actions'


const InitialState =  []

function postState(state=InitialState,action){
  const {posts,deleted_posts,post} = action
  switch (action.type) {
    case ADD_ALL_POSTS:
      return posts;

    case VOTE_POSTS:
      return state.filter((a)=> a.id !== post.id).concat(post)

    case VOTE_POSTS_DOWN:
      return state.filter((a)=> a.id !== post.id).concat(post)

    case DELETE_POSTS:
      return state.filter(a=> a.id !== deleted_posts.id);

    case EDIT_POST:
    console.log(post)
      return post;

    default:
      return state

  }
}

function singlePostState(state=[],action){
  const {post} = action

  switch (action.type) {
    case FETCH_POST:
      return post;

    case EDIT_POST:
      return post;

    case VOTE_POSTS:
      return post;

    case VOTE_POSTS_DOWN:
      return post;

    default:
      return state

  }
}
function commentState(state=[],action){
  const {comment} = action

  switch (action.type) {

    case FETCH_COMMENTS:
     return comment;

    case POST_COMMENTS:
     return state.concat(comment);

    case DELETE_COMMENTS:
     return state.filter(a=> a.id !== comment.id);

    case EDIT_COMMENT:
     return comment;

    case VOTE_COMMENT:
     return state.filter((a)=> a.id !== comment.id).concat(comment)

    case VOTE_COMMENT_DOWN:
     return state.filter((a)=> a.id !== comment.id).concat(comment)

    default:
      return state
  }
}

function singleCommentState(state=[],action){
  const {comment} = action

  switch (action.type) {

    case GET_SINGLE_COMMENT:
     return comment;

    case EDIT_COMMENT:
     return comment;

    case VOTE_COMMENT:
     return comment;

    case VOTE_COMMENT_DOWN:
     return comment;


    default:
      return state
  }
}


export default combineReducers({postState,singlePostState,commentState,singleCommentState})
