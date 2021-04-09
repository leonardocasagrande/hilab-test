import { ThemeProvider } from '@material-ui/core';
import { Header } from './components/Layout/Header';
import { createMuiTheme } from '@material-ui/core/styles';
import SearchContainer from './components/SearchContainer';
import { Spinner } from './components/Spinner';
import { LoadingProvider } from './contexts/LoadingContext';
import { Route, Switch, Redirect } from 'react-router-dom';
import CreateContainer from './components/CreateContainer';
import { PostsProvider } from './contexts/PostsContext';
import UpdateContainer from './components/UpdateContainer';


const theme = createMuiTheme({
  palette: {
    secondary: {
      light: '#FFFFFF',
      main: '#FFFFFF',
      dark: '#b2b2b2',
      contrastText: '#717171',
    },
    primary: {
      light: '#8bcde9',
      main: '#6EC1E4',
      dark: '#4d879f',
      contrastText: '#FFF',
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <Header />
        <PostsProvider>
          <Switch>
            <Route path="/post/new" component={CreateContainer} />
            <Route path="/post" component={UpdateContainer} />
            <Route exact path="/" component={SearchContainer} />
            <Redirect to="/" />
          </Switch>
        </PostsProvider>
        <Spinner />
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
