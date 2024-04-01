
import { Link, useNavigate} from 'react-router-dom';
import { Button } from '../ui/button';
import { useUserContext } from '@/context/AuthContext';


const Topbar = () => {
  let navigate = useNavigate();
  const {user}=useUserContext()

  const handleLogot=()=>{
    localStorage.removeItem("cookieFallback");
    navigate('/sign-in')
    }
     


  return (
    <section className='topbar'>
        <div className='flex-between py-4 px-5'>
            <Link to={'/'} className='flex gap-3 items-center'>
                <img
                src="/assets/images/logo.svg"
                alt='logo'
                width={130}
                height={320}
                />
            </Link>
            <div className='flex gap-4'>
                <Button onClick={handleLogot} variant={'ghost'} className='shad-button_ghost'>
                <img
                src='/assets/icons/logout.svg'
                alt='logout'
                />
                </Button>
                <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                    <img
                    src={ user.imageUrl|| "/assets/images/profile.png"}
                    alt='profile'
                    className='h-8 w-8 rounded-full'
                    />
                </Link>

            </div>
        </div>
    </section>
  )
}

export default Topbar;