import React, { Component } from 'react';
import {connect} from 'react-redux'
import {DeleteComment,GetSingleComment,AsycEditComment,AsyncVoteCommentDown,AsyncVoteComment} from '../actions/'
import Modal from 'react-modal';
import {Link} from 'react-router-dom'

class SingleComment extends Component{

  state={
    body:'',
    openModalComment: false
  }

  componentDidMount(){
    const id = this.props.match.params.id
    this.props.itemAddComment(id)
  }

  componentDidUpdate() {
    if (!this.state.body) {
      this.setState({ body: this.props.comments.body });
    }
  }


  openCommentModal = ()=>{
   this.setState(()=>({openModalComment: true}));
  }

  closeCommentModal = ()=>{
   this.setState(()=>({openModalComment: false}));
  }

  render(){
    const {comments} = this.props
    const{body} = this.state
    const id = this.props.match.params.id
    return(
      <div>
        <Link to={`/posts/${comments.parentId}`} className="close">Back</Link>
        <div className="singlePost">
          <h2>{comments.title}</h2>
          <p className="author">By {comments.author}</p>
          <p className="body">{comments.body}</p>
          <p className="time">{comments.timestamp}</p>
          <p className="vote">Score: {comments.voteScore}</p>
          <button className="close" onClick={()=>this.props.itemVoteComment(id)}>Like</button>
          <button className="close" onClick={()=>this.props.itemVoteCommentDown(id)}>Dislike</button>
          <button className="close" onClick={()=>this.openCommentModal()}>Edit</button>
          <Link to={`/posts/${comments.parentId}`} ><button className="close" onClick={()=>(this.props.itemDeleteComment(id))}>Delete</button></Link>

        </div>
        {/* //modal to edit Comments */}
        <Modal
          isOpen = {this.state.openModalComment}
          onRequestClose = {()=>this.closeCommentModal()}
          contentLabel = "Edit a comment"
          className='modal'
          overlayClassName='overlay'
          >
          <h1>Edit a Post</h1>
          <form>
            <h2>Body(Description)</h2>
            <input
              className='form-body'
              value={body}
              type='text'
              placeholder='Body'
              onChange = {(e)=> this.setState({body:e.target.value})}
              ref={(input) => this.input = input}
              />
            <button
              className="close"
              onClick={()=>this.closeCommentModal()}>
              Close
            </button>
            <button
              className="close"
              onClick={()=>this.props.itemEditComment(id,body)}>
              Submit
            </button>
          </form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = ({ singlePostState,singleCommentState }) =>
 ({ post: singlePostState, comments:singleCommentState})

const mapDispatchToProps = (dispatch) => {
  return {
    itemDeleteComment: (id) => dispatch(DeleteComment(id)),
    itemAddComment:(id) => dispatch(GetSingleComment(id)),
    itemEditComment:(id,body) => dispatch(AsycEditComment(id,body)),
    itemVoteComment:(id) =>dispatch(AsyncVoteComment(id)),
    itemVoteCommentDown:(id) =>dispatch(AsyncVoteCommentDown(id)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleComment);
