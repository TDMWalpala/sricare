import userAvatar from '../../Assets/user-avatar.png';
import {FaMessage} from "react-icons/fa6";
import {IoIosNotifications} from "react-icons/io";


const NavbarWithoutSidebar = (user) => {
    return(
        <div className='w-full justify-end sticky'>
            <section className='row navbar w-full h-24 md:h-24 lg:h-[4.5rem] bg-white flex shadow-md'>
               
                <div className='w-full flex justify-end'>
                    <div className='w-1/12 md:w-2/12 flex items-center text-right px-12 space-x-4 lg:space-x-16'>
                        <FaMessage className='text-primary-blue-800 text-xs md:text-xl' />
                        <IoIosNotifications className='text-primary-blue-800 text-xs md:text-3xl'/>
                    </div>
                    <div className='w-2/12 py-3 text-primary-blue-800 text-right justify-end'>
                        <div className='font-normal md:font-medium text-md'>{user.name}</div>
                        <div className='text-sm'>{user.userRole}</div>
                    </div>
                    <div className='pt-3 px-6 float-right'>
                        <img className='w-12 h-12' src={userAvatar} alt='logo'/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NavbarWithoutSidebar;