import { Outlet } from 'react-router'
import Nav from '../components/Nav'

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen relative'>
      <Nav />
      <main className="grow w-full flex flex-col text-blue-tertiary">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  )
}

export default Layout
