// import React from "react";
// import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
//
// import { searchFunction } from './stock.js'
// import { accessFunction } from './repo.js'
// import { personSearch } from './personSearch.js'

// console.log(window.ReactRouterDOM);

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
            <Route exact path="/react-scratch/" component={Home} />
            <Route path="/react-scratch/stock" component={Stock} />
            <Route path="/react-scratch/repo" component={Repo} />
            <Route path="/react-scratch/login" component={Login} />
            <PrivateRoute path="/react-scratch/protected" component={Protected} />
            <Route path="/react-scratch/personSearch" component={PersonSearch} />
          </div>
        </BrowserRouter>
       </div>
    )}
}

class Home extends React.Component {
  render(){
    checkFunction();
    removeProtected();
     return (
        <div>
          <h2 id= "title">HTML Buttons</h2>
            <Link to="/react-scratch/repo"><button className= "button">Display Repos</button></Link>
            <Link to="/react-scratch/stock"><button className= "button">Check Stock Info</button></Link>
            <Link to="/react-scratch/protected"><button className= "button">Protected Resource</button></Link>
            <Link to="/react-scratch/personSearch"><button className= "button">Search Directory</button></Link>
        </div>
     )}
}

class Stock extends React.Component {
  render(){
     return (
         <div id="contentItems" className="text">
            <input type="text" placeholder="Type here..." id="Input" className="textBox"></input>
            <button id="bn" onClick={searchFunction} className="button">Search Stock</button>
            <Link to="/react-scratch/"><button className= "button">Home</button></Link>
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
          <Link to="/react-scratch/"><button className= "button">Home</button></Link>
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
          <Link to="/react-scratch/"><button className= "button">Home</button></Link>
        </div>
     )}
}

class Protected extends React.Component {
  render(){
    protectedContent()
     return (
        <div>
          <Link to="/react-scratch/"><button className= "button">Home</button></Link>
        </div>
     )}
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/react-scratch/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {redirectToReferrer: false};
  }

  // state : {
  //   redirectToReferrer: false
  // };

  // login = () => {
  //   fakeAuth.authenticate(() => {
  //     this.setState({ redirectToReferrer: true });
  //   });
  // };

  login() {
     let client_id = "2fior6770hvto4u6kuq084j7fu";
     let redirect_uri = "https://angelodel01.github.io/react-scratch/";
     let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=token&` +
     `client_id=${client_id}&redirect_uri=${redirect_uri}`;
     window.location = loginUrl;
   }


  render() {
    const { from } = this.props.location.state || { from: { pathname: "/react-scratch/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    // <div>
    //   <p>You must log in to view the page at {from.pathname}</p>
    //   <button className="button" onClick={this.login}>Log in</button>
    // </div>


    return (
      this.login()
    );
  }
}


function checkFunction(){
  console.log("window.location.hash :", window.location.hash)
  let keyUrl = window.location.hash.substring(1);
  if (keyUrl.includes("id_token")){
    var id_tokenVal = keyUrl.substring("id_token=".length, keyUrl.indexOf("&"))
    var exprIndex = keyUrl.indexOf("expires_in") + "expires_in=".length
    var exprVal = keyUrl.substring(exprIndex, keyUrl.indexOf("&", exprIndex))
    console.log("expiration time : ", exprVal);
    setCookie("id_token", id_tokenVal, exprVal);
    window.location = "https://angelodel01.github.io/react-scratch/"
  }

  const key = getCookie("id_token");
  if (key !== ""){
    Auth.authenticate(() => {
         Login.State = { redirectToReferrer: true };
       });
  }
  return;
}


ReactDOM.render(<App />, document.getElementById('root'));
// export default App;
