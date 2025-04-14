import {Navbar, NavbarCollapse, NavbarLink, NavbarToggle, TextInput, Button, Dropdown, DropdownHeader ,Avatar, DropdownItem, DropdownDivider} from 'flowbite-react';
import { Link , useLocation} from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon} from 'react-icons/fa';
import { useSelector } from 'react-redux'; // For use user data

export default function Header() {
  const path = useLocation().pathname;

  const { currentUser } = useSelector((state) => state.user); // For use user data
  //state represents the entire Redux state.
  //state.user.currentUser is the specific part of the state being accessed.
  
  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowarp text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Ting's</span>Blog
      </Link>

      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
          <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={
            <Avatar 
              alt='user'
              img={currentUser.profilePicture}
              rounded
            />
          }>
          <DropdownHeader>
            <span className='block text-sm'>@{currentUser.username}</span>
            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
          </DropdownHeader>
          <Link to={'/dashboard?tab=profile'}>
            <DropdownItem>
              Profile
            </DropdownItem>
          </Link>
          <DropdownDivider />
          <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
          <Button
            className="
              bg-white text-black
              border-2 border-gray-300
              hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500
              hover:text-white hover:border-transparent
              transition-colors duration-300
              focus:ring-4 focus:ring-blue-300
              dark:border-gray-600 dark:hover:border-transparent  // 暗黑模式适配
            "
          >
            Sign In
          </Button>
        </Link>
        )}
        
        
        <NavbarToggle />
      </div>
      <NavbarCollapse>
          <NavbarLink active={path === '/'} as={'div'}>
            <Link to='/'>
              Home
            </Link>
          </NavbarLink>
          <NavbarLink active={path === '/about'} as={'div'}>

            <Link to='/about'>
              About
            </Link>
          </NavbarLink>
          <NavbarLink active={path === '/projects'} as={'div'}>
            <Link to='/projects'>
              Projects
            </Link>
          </NavbarLink>
        </NavbarCollapse>
    </Navbar>
  )
}
