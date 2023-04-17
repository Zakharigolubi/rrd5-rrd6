import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  Outlet,
  NavLink,
  useParams
} from 'react-router-dom'
import './App.css'

const users = [0, 1, 2, 3, 4]

const AppLayout = () => {
  return (
    <>
      <h1>App Layout</h1>
      <Outlet />
    </>
  )
}

const UsersLayout = () => {
  return (
    <>
      <h1>Users Layout</h1>
      <Outlet />
    </>
  )
}

const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <NavLink to='/users'>Users List Page</NavLink>
    </>
  )
}

const UsersListPage = () => {
  return (
    <>
      <NavLink to='/'>Home Page</NavLink>

      <h1>Users List Page </h1>
      <ul>
        {users.map((userId) => (
          <li key={userId}>
            <NavLink
              to={`/users/${userId}/profile`}
            >{`User-${userId}`}</NavLink>
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
      <h1>User Page</h1>
      <ul>
        <li>
          <NavLink to='/users'>Users List Page</NavLink>
        </li>
        <li>
          <NavLink to={`/users/${params.userId}/edit`}>Edit User Page</NavLink>
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
      <h3>Edit User Page</h3>
      <ul>
        <li>
          <NavLink to={`/users/${params.userId}/profile`}>
            Profile User Page
          </NavLink>
        </li>
        <li>
          <NavLink to={`/users/${nextUserId}/profile`}>
            Another User Page
          </NavLink>
        </li>
        <li>
          <NavLink to='/users'>Users List Page</NavLink>
        </li>
      </ul>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/users' element={<UsersLayout />}>
            <Route index element={<UsersListPage />} />
            <Route path=':userId'>
              <Route path='profile' element={<UserPage />} />
              <Route path='edit' element={<EditPage />} />
              <Route
                path='*'
                element={<Navigate to='/users/:userId/profile' />}
              />
            </Route>
          </Route>
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
