import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header'
import Homepage from './Pages/Homepage';
import Coinpage from './Pages/Coinpage';
import { makeStyles } from 'tss-react/mui';






function App() {


  //make styles is an callback function
  const useStyles = makeStyles()((theme) => {
    return {
      App: {
        backgroundColor: '#14161a',
        color: 'white',
        minHeight: '100vh',
      }
    }
  });


  //we create an objects
  const { classes } = useStyles();
  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path='/' Component={Homepage} />
          <Route path='/coins/:id' Component={Coinpage} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
