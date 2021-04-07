import { ThemeProvider } from '@material-ui/core';
import './App.css';
import { Header } from './components/Layout/Header';
import { createMuiTheme } from '@material-ui/core/styles';
import SearchContainer from './components/SearchContainer';


function App() {

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#FFFFFF',
        main: '#FFFFFF',
        dark: '#b2b2b2',
        contrastText: '#000',
      },
      secondary: {
        light: '#8bcde9',
        main: '#6EC1E4',
        dark: '#4d879f',
        contrastText: '#FFF',
      },
    },
  });
  return (
    <ThemeProvider theme={theme} >
      <div className="App">
        <Header />
        <SearchContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
