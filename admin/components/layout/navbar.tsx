import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { GET_PROFILE_USE } from '@/utils/constants/endpoints';
interface UserDetails {
  _id: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  img: string;
}
const Navbar = () => {
  const [details, setDetails] = useState<UserDetails>();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(GET_PROFILE_USE, {
          withCredentials: true,
        });
        setDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile()

  }, []);
  return (
    <div className="col-md-3 left_col menu_fixed">
          <div className="left_col scroll-view">
            <div className="navbar nav_title border-0">
              <a  style={{display: 'flex'}} href="index.html" className="site_title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="34.875px" height="46.938px" viewBox="0 0 34.875 46.938" enable-background="new 0 0 34.875 46.938">
                  <polyline fill="none" stroke="#C9AB81" stroke-miterlimit="10" points="0.5,0.003 0.5,36.438 22.875,36.438 "></polyline>
                  <polyline fill="none" stroke="#C9AB81" stroke-miterlimit="10" points="6.5,5.003 6.5,41.438 28.875,41.438 "></polyline>
                  <polyline fill="none" stroke="#C9AB81" stroke-miterlimit="10" points="12.5,10.003 12.5,46.438 34.875,46.438 "></polyline>
                </svg>
                 <span>Moonlit Vintage</span>
              </a>
            </div>

            <div className="clearfix"></div>

            <div className="profile clearfix">
              <div className="profile_pic">
                <Image src={`/${details?.img}`} width={100} height={100} alt="..." className="img-circle profile_img" />
              </div>
              <div className="profile_info">
                <span>Welcome,</span>
                <h2>{details?.name}</h2>
              </div>
            </div>

            <br />

            <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
  <div className="menu_section">
    <h3 className="text-lg font-semibold">General</h3>
    <ul className="nav side-menu">
      <li>
        <Link href="/" legacyBehavior>
            <a className="flex items-center justify-between">
            <i className="fa fa-home mr-2"></i> Home 
            </a>
        </Link>
      </li>
      <li>
        <Link href="/user" legacyBehavior>
            <a className="flex items-center justify-between">
            <i className="fa fa-users mr-2"></i> User
            </a>
        </Link>
      </li>
      <li>
        <Link href="/booking" legacyBehavior>
            <a className="flex items-center justify-between">
            <i className="fa fa-desktop mr-2"></i> Booking 
            </a>
        </Link>
      </li>
      <li>
        <Link href="/table" legacyBehavior>
          <a className="flex items-center justify-between">
            <i className="fa fa-table mr-2"></i> Tables 
          </a>
        </Link>
      </li>
      <li>
      <Link href="/dish" legacyBehavior>
          <a className="flex items-center justify-between">
            <i className="fa fa-cutlery mr-2"></i> Dish 
          </a>
        </Link>
      </li>
      <li>
      <Link href="/chef" legacyBehavior>
          <a className="flex items-center justify-between">
            <i className="fa fa-user mr-2"></i> Chef 
          </a>
        </Link>
      </li>
      <li>
      <Link href="/news" legacyBehavior>
          <a className="flex items-center justify-between">
            <i className="fa fa-newspaper-o mr-2"></i> news 
          </a>
        </Link>
      </li>
    </ul>
  </div>
</div>


            <div className="sidebar-footer hidden-small">
              <a data-toggle="tooltip" data-placement="top" title="Settings">
                <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Lock">
                <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
              </a>
              <a data-toggle="tooltip" data-placement="top" title="Logout" href="login.html">
                <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
              </a>
            </div>
          </div>
        </div>
  )
}

export default Navbar
