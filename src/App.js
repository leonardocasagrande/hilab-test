import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import { Header } from './components/Navigation/Header/Header';
import { Spinner } from './components/Spinner/Spinner';
import { LoadingProvider } from './contexts/LoadingContext';
import { PostsProvider } from './contexts/PostsContext';
import AlertContainer from './components/Alerts/Alerts';
import { theme } from './shared/theme'
import { ScreenSizeProvider } from './contexts/ScreenSizeContext';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ScreenSizeProvider>
        <Header />
        <LoadingProvider>
          <PostsProvider>
            <AlertContainer />
            <Switch>
              <Route path="/post/new" component={CreatePage} />
              <Route path="/post" component={UpdatePage} />
              <Route exact path="/" component={SearchPage} />
              <Redirect to="/" />
            </Switch>
            <Spinner />
          </PostsProvider>
        </LoadingProvider>
      </ScreenSizeProvider>
    </ThemeProvider>
  );
}

export default App;
