const BrowserRouter = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;
const Link = window.ReactRouterDOM.Link;
const Redirect = window.ReactRouterDOM.Redirect;

class App extends React.component{
  render(){
    return(
      <div>
        <header>Angelo De Laurentis</header><br></br>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </div>
    )
  }
}

class Home extends React.component{
  render(){
    return(
      <div>
        <header>Angelo De Laurentis</header><br></br>
      </div>
    )
  }
}
