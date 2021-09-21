import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import theme from './ui/Theme';
import Header from './ui/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={()=> <div>home</div>} />
          <Route exact path="/services" component={()=> <div>services</div>} />
          <Route exact path="/customsoftware" component={()=> <div>customsoftware</div>} />
          <Route exact path="/mobileapps" component={()=> <div>mobileapps</div>} />
          <Route exact path="/websites" component={()=> <div>websites</div>} />
          <Route exact path="/revolution" component={()=> <div>revolution</div>} />
          <Route exact path="/about" component={()=> <div>about</div>} />
          <Route exact path="/contact" component={()=> <div>contact</div>} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
