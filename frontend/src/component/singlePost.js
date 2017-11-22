import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Modal from 'react-modal';
import {fetchSinglePost,AsyncfetchComments,AsyncPostComments,AsyncVoteComment,AsyncVoteCommentDown,AsycEditComment,DeleteComment,AsycEditPost,AsyncVotePost,AsyncVotePostDown,DeletePost } from '../actions/'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import TextField from 'material-ui/TextField'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

class SinglePost extends Component{

  state={
    openModal: false,
    openModalComment:false,
    openModalCommentEdit:false,
    body:'',
    author:'',
    title:'',
    ids:''
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

  openCommentModalEdit = (comment)=>{
    console.log('comment',comment)
   this.setState(()=>({
     openModalCommentEdit: true,
     ids: comment ? comment.id : '',
     body: comment ? comment.body : ''

   }));
  }

  closeCommentModalEdit = ()=>{
   this.setState(()=>({
     openModalCommentEdit: false,
     id: '',
     body: '',
   }));
  }


  componentDidMount(){
    const id = this.props.match.params.id
    this.props.itemFetchSinglePost(id)
    this.props.itemFetchComment(id)
  }

  componentDidUpdate(){
    // if (!this.state.body){
    //   this.setState({body:this.props.post.body})
    // }
    // if (!this.state.title){
    //   this.setState({title:this.props.post.title})
    // }
  }

    render(){
      const {post,comments} = this.props
      const {body,author,categories,title,ids} = this.state
      const id = this.props.match.params.id
      comments.sort((a,b) => (b.voteScore - a.voteScore))
      const style = {
        paddingRight: 40,
      };

      if (!post.title){
        return(
          <div>
            <h1>The post has been deleted</h1>
          </div>
        )
      } else{
        return(
          <div>
            <Link to={`/`} className="close">Back</Link>
            <div className="singlePost">
              <h2>{post.title}</h2>
              <p className="author">By {post.author}</p>

             <Card>
              <CardHeader
                title={post.category}
                subtitle={post.timestamp}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText>
                {post.body}
              </CardText>
              <CardText>
                Score: {post.voteScore}
              </CardText>
              <CardActions>
                <FlatButton label="UpVote" onClick={()=>this.props.itemVotePost(id)}/>
                <FlatButton label="DownVote" onClick={()=>this.props.itemVotePostDown(id)} />
                <FlatButton label="Edit" onClick={()=>this.openCommentModal()} />
                <Link to="/"><FlatButton label="Delete" onClick={()=>(this.props.itemDeletePost(post.id))} /></Link>
              </CardActions>
            </Card>

            </div>
            <div className="comments">
              <Toolbar>
                <ToolbarGroup firstChild={true}>
                  <ToolbarTitle text="Add a comment" style={style} />
                  <FloatingActionButton >
                      <ContentAdd onClick={()=>this.openFormModal()}/>
                   </FloatingActionButton>
                </ToolbarGroup>

              </Toolbar>
              {comments.map((comment)=>(
                <Card key={comment.id}>
                  <Link to={'/'+post.category+'/comments/'+comment.id}> <CardTitle title={comment.body} subtitle={comment.author} /></Link>

                  <CardText>
                    {comment.timestamp} / Score: {comment.voteScore}
                  </CardText>

                  <CardActions>
                    <RaisedButton label="Edit" primary={true} onClick={()=>this.openCommentModalEdit(comment)}/>
                    <RaisedButton label="Delete"  secondary={true} onClick={(id)=>this.props.itemDeleteComment(comment.id)} />
                    <RaisedButton label="Upvote" onClick={()=>this.props.itemVoteComment(comment.id)} />
                    <RaisedButton label="DownVote"  backgroundColor="#000000" labelColor="#fff" onClick={()=>this.props.itemVoteCommentDown(comment.id)}  />
                  </CardActions>
                  {/* //modal to edit Comments */}
                  <Modal
                    isOpen = {this.state.openModalCommentEdit}
                    onRequestClose = {()=>this.closeCommentModalEdit()}
                    contentLabel = "Edit a comment"
                    className='modal'
                    overlayClassName='overlay'
                    >
                    <h1>Edit a Post</h1>
                    <form>
                      <TextField
                        hintText="Body"
                        floatingLabelText="Body"
                        value={body}
                        fullWidth={true}
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
                        onClick={()=>this.props.itemEditComment(ids,body)}>
                        Submit
                      </button>
                    </form>
                  </Modal>
              </Card>


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
                <TextField
                  hintText="Author"
                  floatingLabelText="Author"
                  fullWidth={true}
                  onChange = {(e)=> this.setState({author:e.target.value})}
                  ref={(input) => this.input = input}
                />
                <TextField
                  hintText="Body"
                  floatingLabelText="Body"
                  fullWidth={true}
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
                  <TextField
                    hintText="Enter Title"
                    floatingLabelText="Title"
                    value={title}
                    fullWidth={true}
                    onChange = {(e)=> this.setState({title:e.target.value})}
                    ref={(input) => this.input = input}
                  />
                  <TextField
                    hintText="Body"
                    floatingLabelText="Body"
                    value={body}
                    fullWidth={true}
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
}

const mapStateToProps = ({ singlePostState,commentState }) =>
 ({ post: singlePostState, comments:commentState})

const mapDispatchToProps = (dispatch) => {
  return {
    itemFetchSinglePost: (id) => dispatch(fetchSinglePost(id)),
    itemFetchComment: (id) => dispatch(AsyncfetchComments(id)),
    itemPostComment: (body,author,postID) => dispatch(AsyncPostComments(body,author,postID)),
    itemDeleteComment: (id) => dispatch(DeleteComment(id)),
    itemDeletePost: (id) => dispatch(DeletePost(id)),
    itemEditPost:(id,title,body)=>dispatch(AsycEditPost(id,title,body)),
    itemVotePost:(id)=>dispatch(AsyncVotePost(id)),
    itemVotePostDown:(id)=>dispatch(AsyncVotePostDown(id)),
    itemEditComment:(id,body) => dispatch(AsycEditComment(id,body)),
    itemVoteComment:(id) =>dispatch(AsyncVoteComment(id)),
    itemVoteCommentDown:(id) =>dispatch(AsyncVoteCommentDown(id)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SinglePost);
