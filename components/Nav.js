import React, { useEffect, useState } from 'react'

function Nav() {

    const [ navItems, setNavItems ] = useState([])

    useEffect(() => {
        getNavData()
    },[])

    async function getNavData(){
        const res  = await fetch('/api/nav')
        const data = await res.json();
        // console.log(data,"data")
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
                    <a href={item.post_name}>{item.post_title}</a>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Nav