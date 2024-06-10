
import './App.css';
import Navigation from './components/Navigation'
import React, { Component } from 'react'
import MainNews from './components/MainNews';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
 apiKey=process.env.react_app_news_api
  state={
    progress:0
  }
   setProgress=(progress)=>{
    this.setState({progress:progress})
   }
  

  render() {

    return (
      <Router>
      <div>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress} setProgress={this.setProgress}
        
      />
      <Navigation  />
      
      <Routes>
      <Route exact path="/" element={<MainNews setProgress={this.setProgress}  key="home"  pageSize={9} country="in" category="General" apiKey={this.apiKey}/>}/>
        <Route exact path="/sports" element={<MainNews setProgress={this.setProgress} key="sports"  pageSize={9} country="in" category="Sports" apiKey={this.apiKey}/>}/>
        <Route exact path="/general" element={<MainNews setProgress={this.setProgress} key="general"  pageSize={9} country="in" category="General" apiKey={this.apiKey}/>}/>
        <Route exact path="/entertainment" element={<MainNews setProgress={this.setProgress} key="entertainment"  pageSize={9} country="in" category="Entertainment" apiKey={this.apiKey}/>}/>
        <Route exact path="/business" element={<MainNews setProgress={this.setProgress} key="business"  pageSize={9} country="in" category="Business" apiKey={this.apiKey}/>}/>
        <Route exact path="/health" element={<MainNews setProgress={this.setProgress} key="Health"  pageSize={9} country="in" category="Health" apiKey={this.apiKey}/>}/>
        <Route exact path="/science" element={<MainNews setProgress={this.setProgress} key="Science"  pageSize={9} country="in" category="Science" apiKey={this.apiKey}/>}/>
        <Route exact path="/technology" element={<MainNews setProgress={this.setProgress}  key="technology" pageSize={9} country="in" category="Technology" apiKey={this.apiKey}/>}/>
        
      </Routes>
      
      </div>
      
      </Router>
    )
  }
}


