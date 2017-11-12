import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FontAwesome from 'react-fontawesome'
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors'
import Modal from 'react-modal'

class Posts extends Component{

  state={
    openModalComment:false,
    body:'',
    title:''
  }

  openCommentModal = ()=>{
   this.setState(()=>({openModalComment: true}));
  }

  closeCommentModal = ()=>{
   this.setState(()=>({openModalComment: false}));
  }

  // componentDidUpdate(){
  //   if (!this.state.body){
  //     this.setState({body:this.props.post.body})
  //   }
  //   if (!this.state.title){
  //     this.setState({title:this.props.post.title})
  //   }
  // }

    render(){
      const posts = this.props.posts
      const {title,body} = this.state

      return(
        <div>
          {posts.map(post=>(
            <Card key={post.id}>
            <Link to={'/posts/'+post.id}> <CardTitle title={post.title} subtitle={post.author} /></Link>
            <CardText>
              {post.body}
            </CardText>
            <CardText>
              {post.timestamp} / Score: {this.props.toPost.voteScore}
            </CardText>
            <CardActions>
              <RaisedButton label="Edit" primary={true} onClick={(id)=>this.openCommentModal()}/>
              <RaisedButton label="Delete"  secondary={true} onClick={(id)=>this.props.deletepost(post.id)} />
              <RaisedButton label="Upvote" onClick={(id)=>this.props.toUpVote(post.id)} />
              <RaisedButton label="DownVote"  backgroundColor="#000000" labelColor="#fff" onClick={(id)=>this.props.toDownVote(post.id)} />
            </CardActions>
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
                //  value={post.title}
                placeholder='Enter Title'
                 onChange = {(e)=> this.setState({title:e.target.value})}
                ref={(input) => this.input = input}
                />
              <h2>Body(Description)</h2>
              <input
                className='form-body'
                type='text'
                placeholder='Body'
                //  value={body}
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
                onClick={(id)=>this.props.editPost(post.id,title,body)}>
                Submit
              </button>
            </form>

            </Modal>
            </Card>

          ))}

        </div>
      )
    }
}

export default Posts
