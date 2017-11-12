import React, { Component } from 'react';
import {connect} from 'react-redux'
import { getCategories } from '../utils/api'
import { fetchData,DeletePost } from '../actions/'
import Posts from './posts'
import{Link} from 'react-router-dom'
import {history} from 'history'

class SingleCategory extends Component{
  state={
    categories:[],
  }

  componentDidMount(){
    getCategories().then(res=> {return this.setState({categories:res.categories})})
    this.props.itemFetchPost()
  }

    render(){
      const category = this.props.match.params.category
      const {posts} = this.props
      posts.sort((a,b) => (b.voteScore - a.voteScore))
      return(
      <div>
        <div className="categories" key={category.name}>
          <Link to='/' className="close">Back</Link>
          <Posts
            posts={posts.filter((a)=> a.category === category)}
            deletepost={(id)=>(this.props.itemDeletePost(id))}/>
        </div>
      </div>
      )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    itemFetchPost: (data) => dispatch(fetchData(data)),
    itemDeletePost: (id) => dispatch(DeletePost(id)),
  }
}

const mapStateToProps = ({ postState }) => ({ posts: postState})

export default connect(mapStateToProps,mapDispatchToProps)(SingleCategory);
