// import React from "react";
// import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
//
// import { searchFunction } from './stock.js'
// import { accessFunction } from './repo.js'
// import { personSearch } from './personSearch.js'

console.log(window.ReactRouterDOM);

const BrowserRouter = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;
const Link = window.ReactRouterDOM.Link;
const Redirect = window.ReactRouterDOM.Redirect;
const withRouter = window.ReactRouterDOM.withRouter;



// const App = React.createClass({
//   render: function()  {

class App extends React.Component{
   render(){
     return (
        <div>
        <header>Cal Poly</header><br></br>
        <BrowserRouter>
          <div id ="ogB">

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/stock" component={Stock} />
            <Route path="/repo" component={Repo} />
            <Route path="/protected" component={Protected} />
            <Route path="/personSearch" component={PersonSearch} />
          </div>
        </BrowserRouter>
       </div>
    )}
}

class Home extends React.Component {
  render(){
     return (
        <div>
          <h2 id= "title">HTML Buttons</h2>
            <Link to="/repo"><button className= "button">Display Repos</button></Link>
            <Link to="/stock"><button className= "button">Check Stock Info</button></Link>
            <Link to="/protected"><button className= "button">Protected Resource</button></Link>
            <Link to="/personSearch"><button className= "button">Search Directory</button></Link>
        </div>
     )}
}

class Stock extends React.Component {
  render(){
     return (
         <div id="contentItems" className="text">
            <input type="text" placeholder="Type here..." id="Input" className="textBox"></input>
            <button id="bn" onClick={searchFunction} className="button">Search Stock</button>
            <Link to="/"><button className= "button">Home</button></Link>
        </div>
     )}
}

class Repo extends React.Component {
  render(){
     return (
        <div>
            <div id="contentItems" className="text">
               <input type="text" placeholder="Type here..." id="Input" className="textBox"></input>
               <button id="bn" onClick={accessFunction} className="button">List Repos</button>
            </div>
          <Link to="/"><button className= "button">Home</button></Link>
        </div>
     )}
}

class PersonSearch extends React.Component {
  render(){
     return (
        <div>
            <div id="contentItems" className="text">
               <input type="text" placeholder="Type here..." id="searchParam" className="textBox"></input>
               <button id="bn" onClick={personSearch} className="button">Search Person</button>
            </div>
          <Link to="/"><button className= "button">Home</button></Link>
        </div>
     )}
}

class Protected extends React.Component {
  render(){
     return (
        <div>
          <Link to="/"><button className= "button">Home</button></Link>
        </div>
     )}
}

ReactDOM.render(<App />, document.getElementById('root'));
// export default App;
