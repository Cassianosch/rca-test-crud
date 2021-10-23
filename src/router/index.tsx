import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { TodoPage } from '../pages/app/todo';
import { PostPage } from '../pages/app/post';
import { AlbumPage } from '../pages/app/album';


const AppRoutes = (): JSX.Element => (
    <Switch>
        <Route exact path="/todo" component={TodoPage} />
        <Route exact path="/albums" component={AlbumPage} />
        <Route exact path="/posts" component={PostPage} />
        <Route>
            <Redirect to="/todo" />
        </Route>
    </Switch>
);

export const Router = (): JSX.Element => (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
);
