import React from 'react'
import styles from '../css/FaveGatesMenu.module.css';
import logo from '../../assets/logo.svg'

export default function Header() {
    return (
        // <nav class="navbar navbar-expand  bg-body-tertiary">
        //     <div class="container-fluid">
        // <a class="navbar-brand" href="#">
        //     <img alt="Quokka" src={logo} />
        //     Quokka
        // </a>
        //         <div class="collapse navbar-collapse" id="navbarNavDropdown">
        //             <ul class="navbar-nav">
        //                 <li class="nav-item">
        //                     <a class="nav-link active" aria-current="page" href="/CircuitBuilder">Circuit Builder</a>
        //                 </li>
        //                 <li class="nav-item">
        //                     <a class="nav-link" href="/About">About</a>
        //                 </li>
        //                 <li class="nav-item">
        //                     <a class="nav-link" href="/Setup">Setup</a>
        //                 </li>

        //             </ul>
        //         </div>


        //         <div class="d-flex">
                    // <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                    //     <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    //     <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    // </svg>
        //         </div>




        //     </div>




        // </nav>
        <nav class="navbar bg-body-tertiary ">
            <div class="container-fluid">
                <a class="navbar-brand" href="/About">
                    <img alt="Quokka" src={logo} /> Quokka   
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/CircuitBuilder">Circuit Builder</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href="/About">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href="/Setup">Setup</a>
                            </li>
                            <li class="nav-item">

                                <a class="nav-link active" href="/Setup">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg> */}
                                      Account</a>
                            </li>

                        </ul>

                    </div>
                </div>
            </div>
        </nav>






    )
}