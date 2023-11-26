"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './components.module.css';
import { RxHamburgerMenu } from "react-icons/rx";

const NavBar = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const currentPath = usePathname();
    const links = [
        {label: 'Home', href: '/home'},
        {label: 'About', href: '/about'},
        {label: 'Projects', href: '/projects'}
    ];
    const style:any = styles;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
        <nav className='flex justify-between border-b mb-5 p-5 items-center bg-black relative'>
            <Link href="/home" className=' bg-black shadow-inner shadow-orange-200 rounded-full hover:shadow-black px-2 transition duration-700 p-2'> 
                <strong>Prabhat Thapa</strong>
            </Link>
            {!isMobile &&
                <ul className="flex space-x-6">
                {links.map(link => 
                <Link className={`${style.textshadow} ${currentPath===link.href ? 'text-white' : 'text-orange-400'} transition duration-1000`} key={link.href} href={link.href}>{link.label}
                </Link>)
                }
            </ul>
            }      
        </nav>
        { isMobile && <> <div className="fixed top-10 right-5 ">
                <button className='' onClick={handleToggle}>
                    <RxHamburgerMenu />
                </button>

            </div>
        <div>
            {isOpen && (
                <div className='flex before:opacity-25'>
                    <ul className="flex flex-col items-center bg-white hover:opacity-60 ease-in-out transition-opacity duration-1000 dropdown-links absolute w-full left-0">
                        {links.map(link => <Link className={`${style.textshadow} ${currentPath === link.href ? 'text-white' : 'text-orange-400'} transition duration-1000`} key={link.href} href={link.href}>{link.label}
                        </Link>)}
                    </ul>
                </div>
            )}
        </div></>
    
    }
    </>
    );
};

export default NavBar;
