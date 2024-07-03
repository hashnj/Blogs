import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { Getdata } from "../hooks";
import { useEffect } from "react";


export const Nav = () => {
    const nav=useNavigate();
    const {user,loading}=Getdata();


    const Uicon = () => {
        return (
            
            <div className="relative">
            
                <Menu as="div" className="inline-block text-left">
                    <MenuButton className={`rounded-full mr-2 bg-yellow-200 flex justify-center text-yellow-900 w-12 h-12  items-center ${loading ? 'animate-pulse':''}`}>
                        {user?.name !== '' ? user?.name[0].toUpperCase(): <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="6" r="4" stroke="#1C274C" stroke-width="1.5"></circle> <path d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>}
                    </MenuButton>
                    <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded bg-yellow-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 pl-2 text-sm">
                                <MenuItem>
                                    {() => (
                                        <button
                                            className="group flex items-center  w-full px-2 py-2 text-sm"
                                            onClick={() => {
                                                localStorage.clear();
                                                nav('/signin')
                                                console.log('Signed out');
                                            }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l-3-3m0 0l3-3m-3 3H15" />
                                            </svg>
                                            Sign-out
                                        </button>
                                    )}
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
        );
    };
    useEffect(() => {
            const token = localStorage.getItem('token');
            const tokenExpiry = localStorage.getItem('tokenExpiry');
        if (token && tokenExpiry) {
            const now = new Date().getTime();
            if (now > parseInt(tokenExpiry)) {
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiry');
            }
        }
        if (!loading && !user) {
            const showToastTimeout = setTimeout(() => {
                toast.warn('You might want to sign in to access data', {
                    closeOnClick: false,
                    autoClose: 3000,
                    theme: 'dark',
                });
            }, 5000); // Show toast after 1 second

            const redirectTimeout = setTimeout(() => {
                nav('/signin');
            }, 8000); // Redirect after 4 seconds (3 seconds for toast + 1 second delay)

            return () => {
                clearTimeout(showToastTimeout);
                clearTimeout(redirectTimeout);
            };
        }
    }, [loading, user, nav]);

    return (
        <><ToastContainer position="bottom-right"/>
        <div className="w-full  text-yellow-200 text-4xl font-serif p-4 bg-yellow-900 flex justify-between items-center " >
            <div className="cursor-pointer" onClick={()=>nav('/')}>BloB </div>
            

            {loading ? (
                <div className="animate-pulse"><Uicon/></div>
            ) :user ? <Uicon />:
              <div className="">
            
            
                <div className="inline butt"><button onClick={()=>nav('/signup')}>signup</button></div>
                <div className="inline butt"><button onClick={()=>nav('/signin')}>signin</button></div>
            
        </div> }
        </div>
        </>
    );
};


