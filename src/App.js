import { ThemeProvider } from '@material-ui/core';
import { Header } from './components/Layout/Header';
import SearchContainer from './components/SearchContainer';
import { Spinner } from './components/Spinner';
import { LoadingProvider } from './contexts/LoadingContext';
import { Route, Switch, Redirect } from 'react-router-dom';
import CreateContainer from './components/CreateContainer';
import { PostsProvider } from './contexts/PostsContext';
import UpdateContainer from './components/UpdateContainer';
import AlertContainer from './components/AlertContainer';
import { theme } from './shared/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <Header />
        <PostsProvider>
          <AlertContainer />
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
