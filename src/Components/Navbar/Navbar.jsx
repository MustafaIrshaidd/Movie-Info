import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import cookies from "react-cookies"

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBCollapse,
  } from 'mdb-react-ui-kit';

const Navbar = ({user,setUser}) => {
    const [showBasic, setShowBasic] = useState(false);
    const navigate=useNavigate()

    const logout=()=>{
      setUser(null);
      cookies.remove("token");
      navigate("/")
    }

    return (
        
        <MDBNavbar expand='lg' light bgColor='light'>
          
          <MDBContainer fluid style={{width:"80%"}}> 
            <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>

            <MDBNavbarToggler

              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
              onClick={() => setShowBasic(!showBasic)}
            >
              <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
    
            <MDBCollapse navbar show={showBasic}>
              <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                {user ?
                <>
                <Link to="/movies">
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current='page' href='/'>
                    Movies
                  </MDBNavbarLink>
                </MDBNavbarItem>
                </Link>
                <Link to="/movies">
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current='page' href='#'>
                    New Releases
                  </MDBNavbarLink>
                </MDBNavbarItem>
                </Link>
                </> 
                :
                <>
                <Link to="/">
                <MDBNavbarItem>
                  <MDBNavbarLink active aria-current='page' href='/'>
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem> 
                </Link>  
                </>
                }
                      
            </MDBNavbarNav>
            {user ? 
            <>
            <form className='d-flex input-group w-auto'>
              <input type='search' className='form-control' placeholder='Find a movie' aria-label='Search' />
              <MDBBtn color='primary'>Search</MDBBtn>
            </form>
            <MDBNavbarLink  onClick={logout}>Logout</MDBNavbarLink>
            </>
            :
            <Link to="/login">
              Login
            </Link>
            }
              
              
              
              
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
        
      );
}

export default Navbar