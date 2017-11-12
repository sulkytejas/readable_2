import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Modal from 'react-modal';
import {fetchSinglePost,AsyncfetchComments,AsyncPostComments,DeleteComment,AsycEditPost,AsyncVotePost,AsyncVotePostDown } from '../actions/'


class SinglePost extends Component{

  state={
    openModal: false,
    openModalComment:false,
    body:'',
    author:'',
    title:'',
  }



  openFormModal = ()=>{
   this.setState(()=>({openModal: true}));
  }

  closeFormModal = ()=>{
   this.setState(()=>({openModal: false}));
  }

  openCommentModal = ()=>{
   this.setState(()=>({openModalComment: true}));
  }

  closeCommentModal = ()=>{
   this.setState(()=>({openModalComment: false}));
  }

  componentDidMount(){
    const id = this.props.match.params.id
    this.props.itemFetchSinglePost(id)
    this.props.itemFetchComment(id)
  }

  componentDidUpdate(){
    if (!this.state.body){
      this.setState({body:this.props.post.body})
    }
    if (!this.state.title){
      this.setState({title:this.props.post.title})
    }
  }

    render(){
      const {post,comments} = this.props
      const {body,author,categories,title} = this.state
      const id = this.props.match.params.id
      comments.sort((a,b) => (b.voteScore - a.voteScore))

      return(
        <div>
          <Link to={`/${post.category}`} className="close">Back</Link>
          <div className="singlePost">
            <h2>{post.title}</h2>
            <p className="author">By {post.author}</p>
            <p className="body">{post.body}</p>

            <p className="category">{post.category}</p>
            <p className="time">{post.timestamp}</p>
            <p className="vote">Score: {post.voteScore}</p>
            <button className="close" onClick={()=>this.props.itemVotePost(id)}>Like</button>
            <button className="close" onClick={()=>this.props.itemVotePostDown(id)}>Dislike</button>
            <button className="close" onClick={()=>this.openCommentModal()}>Edit</button>
          </div>
          <div className="comments">
            <button className="close" onClick={()=>this.openFormModal()}>Add Comment</button>
            {comments.map((comment)=>(
              <div className="comment" key={comment.id}>
                <Link to={'/comments/'+comment.id}><div className="description">{comment.body}</div></Link>
                <div className="authour">{comment.author}</div>
                <div className="date">{comment.timestamp}</div>
                <div className="score"> Score:{comment.voteScore}</div>
                <div>
                  <button className="close" onClick={(id)=>this.props.itemDeleteComment(comment.id)}>
                   Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* //Modal to add comments */}
          <Modal
            isOpen = {this.state.openModal}
            onRequestClose = {()=>this.closeFormModal()}
            contentLabel = "Create a Post"
            className='modal'
            overlayClassName='overlay'
            >
            <h1>Add a comment</h1>
            <form>
                <h2>Author</h2>
                <input
                  className='form-author'
                  type='text'
                  placeholder='Author'
                  onChange = {(e)=> this.setState({author:e.target.value})}
                  ref={(input) => this.input = input}
                />
              <h2>Body(Description)</h2>
              <input
                className='form-body'
                type='text'
                placeholder='Body'
                onChange = {(e)=> this.setState({body:e.target.value})}
                ref={(input) => this.input = input}
                />
              <button
                className="close"
                onClick={()=>this.closeFormModal()}>
                Close
              </button>
              <button
                className="close"
                onClick={()=> (this.props.itemPostComment(body,author,id))}>
                Submit
              </button>
            </form>

          </Modal>

          {/* //modal to edit Posts */}
          <Modal
            isOpen = {this.state.openModalComment}
            onRequestClose = {()=>this.closeCommentModal()}
            contentLabel = "Edit a comment"
            className='modal'
            overlayClassName='overlay'
            >
            <h1>Edit a Post</h1>
            <form>
              <h2>Title</h2>
              <input
                className='form-title'
                type='text'
                value={title}
                placeholder='Enter Title'
                onChange = {(e)=> this.setState({title:e.target.value})}
                ref={(input) => this.input = input}
                />
              <h2>Body(Description)</h2>
              <input
                className='form-body'
                type='text'
                placeholder='Body'
                value={body}
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
                onClick={()=>this.props.itemEditPost(id,title,body)}>
                Submit
              </button>
            </form>

          </Modal>
        </div>

      )
    }
}

const mapStateToProps = ({ singlePostState,commentState }) =>
 ({ post: singlePostState, comments:commentState})

const mapDispatchToProps = (dispatch) => {
  return {
    itemFetchSinglePost: (id) => dispatch(fetchSinglePost(id)),
    itemFetchComment: (id) => dispatch(AsyncfetchComments(id)),
    itemPostComment: (body,author,postID) => dispatch(AsyncPostComments(body,author,postID)),
    itemDeleteComment: (id) => dispatch(DeleteComment(id)),
    itemEditPost:(id,title,body)=>dispatch(AsycEditPost(id,title,body)),
    itemVotePost:(id)=>dispatch(AsyncVotePost(id)),
    itemVotePostDown:(id)=>dispatch(AsyncVotePostDown(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SinglePost);
