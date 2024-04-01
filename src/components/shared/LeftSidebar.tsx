import { sidebarLinks } from "@/constant";
import { useUserContext } from "@/context/AuthContext"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { INavLink } from "types";
import { Button } from "../ui/button";


function LeftSidebar() {
 const {user}=useUserContext();
 const {pathname}=useLocation();
 let navigate = useNavigate();


 const handleLogot=()=>{
    localStorage.removeItem("cookieFallback");
    navigate('/sign-in')
    }
     
  return (
    <nav className='leftsidebar'>
        <div className="flex flex-col gap-11">
        <Link to={'/'} className='flex gap-3 items-center'>
                <img
                src="/assets/images/logo.svg"
                alt='logo'
                width={170}
                height={360}
                />
        </Link>

        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                 <img
                    src={ user.imageUrl|| "/assets/images/profile.png"}
                    alt='profile'
                    className='h-14 w-14 rounded-full'
                    />
                    <div className="flex flex-col">
                        <p className="body-bold">
                            {user.name}
                        </p>
                        <p className="text-light-3 small-regular">
                            @{user.username}
                        </p>
                    </div>
        </Link>
        <ul className="flex flex-col gap-1">
            {sidebarLinks.map((item:INavLink)=>{
                const isActive=pathname==item.route;
                return (
                    <li key={item.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'} `}>
                        <NavLink to={item.route} className="flex gap-4 items-center p-4">
                            <img
                            src={item.imgURL}
                            alt={item.label}
                            className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                            />
                            {item.label}

                        </NavLink>
                    </li>
                )
            })}

        </ul>

        <Button onClick={handleLogot} variant={'ghost'} className='shad-button_ghost'>
                <img
                src='/assets/icons/logout.svg'
                alt='logout'
                />
                <p className="small-medium lg:base-medium">Logout</p>
        </Button>


        </div>

    </nav>
  )
}

export default LeftSidebar