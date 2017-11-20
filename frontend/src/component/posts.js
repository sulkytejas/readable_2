import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FontAwesome from 'react-fontawesome'
import FontIcon from 'material-ui/FontIcon';
import {blue500, red500, greenA200} from 'material-ui/styles/colors'
import Modal from 'react-modal'
import TextField from 'material-ui/TextField'

class Posts extends Component{

  state={
    openModalComment:false,
    body:'',
    title:'',
    id:''
  }

  openCommentModal = (post) => {
    console.log('post', post);
    this.setState(() => ({
        openModalComment: true,
        id: post ? post.id : '',
        body: post ? post.body : '',
        title: post ? post.title : ''
    }));
}

closeCommentModal = () => {
  this.setState(() => ({
      openModalComment: false,
      id: '',
      body: '',
      title: ''
  }));
}

    render(){
      const posts = this.props.posts
    const { id, title, body } = this.state

      return(
        <div>
          {posts.map(post=>(
            <Card key={post.id}>
            <Link to={'/posts/'+post.id}> <CardTitle title={post.title} subtitle={post.author} /></Link>
            <CardText>
              {post.body}
            </CardText>
            <CardText>
              {post.timestamp} / Score: {post.voteScore}
            </CardText>
            <CardText>
            Comments #:{post.commentCount}
            </CardText>
            <CardActions>
              <RaisedButton label="Edit" primary={true} onClick={()=>this.openCommentModal(post)}/>
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

              <TextField
                hintText="Body"
                floatingLabelText="Body"
                fullWidth={true}
                onChange = {(e)=> this.setState({body:e.target.value})}
                ref={(input) => this.input = input}
              />
              <TextField
                hintText="Title"
                floatingLabelText="Title"
                fullWidth={true}
                onChange = {(e)=> this.setState({title:e.target.value})}
                ref={(input) => this.input = input}
              />
              <button
                className="close"
                onClick={()=>this.closeCommentModal()}>
                Close
              </button>
              <button
                className="close"
                onClick = {() => this.props.editPost(id, title, body)}>
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
