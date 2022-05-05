import React, { useEffect, useState } from 'react'
import Link from 'next/link'

function Nav() {

    const [ navItems, setNavItems ] = useState([])

    useEffect(() => {
        getNavData()
    },[])

    async function getNavData(){
        const res  = await fetch('/api/nav')
        const data = await res.json();
        setNavItems(data)
    }

  return (
    <nav>
        <ul>
            <li>
                <a href={"/"}>Home</a>
            </li>
            {navItems.map((item,index)=>(
                <li key={index}>
                    <Link href={'/'+item.post_name}>{item.post_title}</Link>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Nav