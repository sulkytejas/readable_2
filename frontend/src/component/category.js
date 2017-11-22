import React, { Component } from 'react';
import {connect} from 'react-redux'
import Posts from './posts'
import{Link} from 'react-router-dom'
import SingleCategory from './singleCategory'
import { getCategories,getAllPosts,getPost,sendPost } from '../utils/api'
import { fetchData,SendPost,DeletePost,fetchSinglePost,AsycEditPost,AsyncVotePost,AsyncVotePostDown} from '../actions/'
import Modal from 'react-modal'
import '../App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'



class Category extends Component {
  state={
    openModal: false,
    openModalComment:false,
    categories:[],
    body:'',
    category:'react',
    title:'',
    author:'',
  }



  componentDidMount(){
    getCategories().then(res=> {return this.setState({categories:res.categories})})
    this.props.itemFetchPost()
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

  render() {
    const {categories,title,body,category,author} = this.state
    const posts = this.props.posts
    const style = {
    float:'right'
    };
    const cardStyle = {
    backgroundColor: '#B2EBF2',
    marginTop:40,
    marginBottom:40
    };

    return (
      <div className="Category">
        <div className="container">

          <div className="navigation">
            <RaisedButton label="Add Post" primary={true} style={style} onClick={()=>this.openFormModal()} />
          </div>
          {categories.map((category)=> (
          <div className="categories" key={category.name}>

            <Card title={category.name} style={cardStyle}>
              <Link to={category.path}  className="title" > <CardTitle title={category.name} /></Link>

              <Posts
                posts={posts.filter((a)=> a.category === category.name).sort((a,b)=>(b.voteScore-a.voteScore))}
                toPost = {this.props.singlePost}
                deletepost={(id)=>(this.props.itemDeletePost(id))}
                editPost = {(id,titles,bodies)=>(this.props.itemEditPost(id,titles,bodies))}
                toUpVote = {(id) => (this.props.itemVotePost(id))}
                toDownVote = {(id) => (this.props.itemVotePostDown(id))}
              />
            </Card>

          </div>
          ))
        }
        </div>
        {/* Modal for Add post */}
        <Modal
          isOpen = {this.state.openModal}
          onRequestClose = {()=>this.closeFormModal()}
          contentLabel = "Create a Post"
          className='modal'
          overlayClassName='overlay'
          >

          <h1>Create a post</h1>
          <form>

              <TextField
                hintText="Title"
                floatingLabelText="Title"
                fullWidth={true}
                onChange = {(e)=> this.setState({title:e.target.value})}
                ref={(input) => this.input = input}
              />
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

            <SelectField
              floatingLabelText="Select Category"
              value={category}
              onChange = {(e,index,value)=> this.setState({category:e.target.value})}
              >
                {categories.map((category)=> (
                  <MenuItem key={category.name} value={category.name} primaryText={category.name} />
                ))
              }
            </SelectField>

            <h2>category</h2>
            <select onChange = {(e)=> this.setState({category:e.target.value})}>
              <option value="none">None</option>
              {categories.map((category)=> (
                <option
                  key={category.name}
                  value={category.name}>
                    {category.name}
                  </option>
              ))
            }
          </select>
            {/* <button
              className="close"
              onClick={()=>this.closeFormModal()}>
              Close
            </button> */}
            <button
              className="close"
              onClick={()=>this.props.itemSendPost(title,body,category,author)}>
              Submit
            </button>

            <RaisedButton label="Close" primary={true} onClick={()=>this.closeFormModal()} />

          </form>

      </Modal>

      </div>
    );
  }
}

const mapStateToProps = ({ postState,singlePostState }) => ({ posts: postState,singlePost:singlePostState})

const mapDispatchToProps = (dispatch) => {
  return {
    itemFetchPost: (data) => dispatch(fetchData(data)),
    itemSendPost: (title,body,category,author) => dispatch(SendPost(title,body,category,author)),
    itemDeletePost: (id) => dispatch(DeletePost(id)),
    itemEditPost:(id,title,body)=>dispatch(AsycEditPost(id,title,body)),
    itemVotePost:(id)=>dispatch(AsyncVotePost(id)),
    itemVotePostDown:(id)=>dispatch(AsyncVotePostDown(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Category);
