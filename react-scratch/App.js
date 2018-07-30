
const BrowserRouter = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;
const Link = window.ReactRouterDOM.Link;
const Redirect = window.ReactRouterDOM.Redirect;
const withRouter = window.ReactRouterDOM.withRouter;

let login = false;

// Router definition
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


// Home page : "https://angelodel01.github.io/react-scratch/"
// class Home extends React.Component {
//   render(){
//     // handle returning from the cognito redirect in the "Login" class
//     checkFunction();
//     removeProtected();
//      return (
//         <div>
//           <h2 id= "title">HTML Buttons</h2>
//             <Link to="/react-scratch/repo"><button className= "button">Display Repos</button></Link>
//             <Link to="/react-scratch/stock"><button className= "button">Check Stock Info</button></Link>
//             <Link to="/react-scratch/protected"><button className= "button">Protected Resource</button></Link>
//             <Link to="/react-scratch/personSearch"><button className= "button">Search Directory</button></Link>
//         </div>
//      )}
// }


class Home extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         "Authenticated": false,
      }
   }
  render(){
    checkFunction();
    removeProtected();
    if (login){
      return (
           <div id="contentItems" className="text">
           <Link to="/react-scratch/repo"><button className= "button">Display Repos</button></Link>
           <Link to="/react-scratch/stock"><button className= "button">Check Stock Info</button></Link>
           <Link to="/react-scratch/personSearch"><button className= "button">Search Directory</button></Link>
           <button className="logButton" onClick={logoutFunc}>Log out</button>
           <h1>Protected Content</h1>
           <Link to="/react-scratch/PetStore"><button className= "button">Pet Store</button></Link>

          </div>
      )
   } else{
     return (
        <div>
        <Link to="/react-scratch/login"><button className= "logButton">Login</button></Link>
          <h2 id= "title">HTML Buttons</h2>
            <Link to="/react-scratch/repo"><button className= "button">Display Repos</button></Link>
            <Link to="/react-scratch/stock"><button className= "button">Check Stock Info</button></Link>
            <Link to="/react-scratch/personSearch"><button className= "button">Search Directory</button></Link>
        </div>
     )}
  }
}


// stock page : "https://angelodel01.github.io/react-scratch/stock"
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

// repo page : "https://angelodel01.github.io/react-scratch/repo"
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

// This page mimics the functionality of the "simple search" widget on the portal
// PersonSearch page : "https://angelodel01.github.io/react-scratch/personSearch"
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

// protected page : "https://angelodel01.github.io/react-scratch/protected"
// class Protected extends React.Component {
//   render(){
//     protectedContent()
//      return (
//         <div>
//           <Link to="/react-scratch/"><button className= "button">Home</button></Link>
//         </div>
//      )}
// }

class PetStore extends React.Component {
   render() {
      protectedContent();
      return (
           <div id="contentItems" className="text">
           <Link to="/"><button className="button">Home</button></Link>
        </div>
      )
   }
}
// definition for redirection of a secure page
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

// constant for keeping track of Authentication state
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

// class definition for the login component

// class Login extends React.Component {
//   // initialize that locks the user out on first navigation
//   constructor(props){
//     super(props);
//     this.state = {redirectToReferrer: false};
//   }
//
//   // redirects to the cognito login
//   login() {
//      let client_id = "2fior6770hvto4u6kuq084j7fu";
//      let redirect_uri = "https://angelodel01.github.io/react-scratch/";
//      let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=token&` +
//      `client_id=${client_id}&redirect_uri=${redirect_uri}`;
//      window.location = loginUrl;
//    }
//
//
//   render() {
//     const { from } = this.props.location.state || { from: { pathname: "/react-scratch/" } };
//     const { redirectToReferrer } = this.state;
//
//     if (redirectToReferrer) {
//       return <Redirect to={from} />;
//     }
//
//     return (
//       this.login()
//     );
//   }
// }
class Login extends React.Component {
     login = () => {
        let client_id = "2fior6770hvto4u6kuq084j7fu";
        let redirect_uri = "http://localhost:3000/react-scratch";
        let loginUrl = `https://cognito-dev.calpoly.edu/login?response_type=token&` +
        `client_id=${client_id}&redirect_uri=${redirect_uri}`;
        window.location = loginUrl;
    }
    update(){
       console.log("inside this.update()")
       const id_token = getCookie("id_token");
       const update_url =  "https://cognito-dev.calpoly.edu/oauth2/authorize?response_type=token&client_id=2fior6770hvto4u6kuq084j7fu&redirect_uri=https://angelodel01.github.io/react-scratch/";
       if ( (id_token != "") && ((new Date(id_token.expDate) - new Date())/60000 < 30) ) {
          console.log("update_url")
          window.location = update_url;

       }
   }

  render() {
    this.update();
    return (
      this.login()
    );
  }
}

function logoutFunc(key){
   console.log("loginstate :", login)
   login = false;
   deletecook("id_token")
   const url = "https://angelodel01.github.io/react-scratch/";
   window.location = url;
}
function loginFunc(){
   const key = getCookie("id_token");
   if (key !== ""){
      login = true;
   }
   return;
}
function deletecook(key) {
   setCookie("id_token", "wiped", 0)
}



// handles an "id_token" in the url from cognito
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

  loginFunc()
  return;
}


ReactDOM.render(<App />, document.getElementById('root'));
// export default App;
