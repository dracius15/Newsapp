import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';

export default class mainNews extends Component {
  

  constructor(props){
    super(props);
    this.state={
        articles: [],
        loading: true,
        page: 1,
        
    }

    
    
  }

  

  async componentDidMount(){
    this.props.setProgress(0);
    let url=`https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=ca3c6685c9af4ee9a72a01d87d0fc6ac&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData= await data.json();
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.props.setProgress(100);
  }

  handleNextClick = async ()=>{
    
    let url=`https://newsapi.org/v2/top-headlines?&q=${this.props.q}country=${this.props.country}&category=${this.props.category}&apiKey=ca3c6685c9af4ee9a72a01d87d0fc6ac&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData= await data.json();
    
    this.setState({
      page:this.state.page +1,
      articles:parsedData.articles,
      loading:false
    })
  
  }
  handlePrevClick = async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=ca3c6685c9af4ee9a72a01d87d0fc6ac&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData= await data.json();
    
    this.setState({
      page:this.state.page - 1,
      articles:parsedData.articles,
      loading:false
    })
  }
  fetchMoreData = async () => {  
    this.props.setProgress(10)
    this.setState({page:this.state.page+1})
    let url=`https://newsapi.org/v2/top-headlines?&country=${this.props.country}&category=${this.props.category}&apiKey=ca3c6685c9af4ee9a72a01d87d0fc6ac&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData= await data.json();
    
    this.setState({
        totalResults:parsedData.totalResults,
      articles:this.state.articles.concat(parsedData.articles),
      loading:false
    })
    this.props.setProgress(100)
  };

  render() {
    return (
     
      <>
        <div className="container my-3">
        <h1 className='text-center'>NewsMonkey - Top {this.props.category} Headlines </h1>
        </div>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
                <div className="container my-3">
        <div className="row">
        { this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title ? element.title : ""} description={element.description} imageurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
          />
          </div>
        })}
          
        </div>
        </div>
        
        </InfiniteScroll>
       </>

       
       
    )
  }
}


