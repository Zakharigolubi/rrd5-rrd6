import { Route, BrowserRouter, useParams } from 'react-router-dom'
import './App.css'
import {
  Link,
  Redirect,
  Switch
} from 'react-router-dom/cjs/react-router-dom.min'

const users = [0, 1, 2, 3, 4]

const AppLayout = () => {
  return (
    <>
      <h1>App Layout</h1>
    </>
  )
}

const UsersLayout = () => {
  return (
    <>
      <h1>Users Layout</h1>
      <Link to='/'>Home Page</Link>
    </>
  )
}

const HomePage = () => {
  return (
    <>
      <Link to='/users'>Users List Page</Link>
      <h1>Home Page</h1>
    </>
  )
}

const UsersListPage = () => {
  return (
    <>
      <UsersLayout />
      <h1>Users List Page </h1>
      <ul>
        {users.map((userId) => (
          <li key={userId}>
            <Link to={`/users/${userId}/profile`}>{`User-${userId}`}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

const UserPage = () => {
  const params = useParams()

  return (
    <>
      <UsersLayout />
      <h1>User Page</h1>
      <ul>
        <li>
          <Link to='/users'>Users List Page</Link>
        </li>
        <li>
          <Link to={`/users/${params.userId}/edit`}>Edit User Page</Link>
        </li>
      </ul>
      <p>userId:{params.userId}</p>
    </>
  )
}

const EditPage = () => {
  const params = useParams()

  const nextUserId = (+params.userId + 1) % 5

  return (
    <>
      <UsersLayout />
      <h3>Edit User Page</h3>
      <ul>
        <li>
          <Link to={`/users/${params.userId}/profile`}>Profile User Page</Link>
        </li>
        <li>
          <Link to={`/users/${nextUserId}/profile`}>Another User Page</Link>
        </li>
        <li>
          <Link to='/users'>Users List Page</Link>
        </li>
      </ul>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />

      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/users' exact component={UsersListPage} />
        <Route path='/users/:userId/profile' component={UserPage} />
        <Route path='/users/:userId/edit' component={EditPage} />
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  )
}

export default App
