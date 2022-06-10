import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export const Footer = () => {

  const [ navItems, setNavItems ] = useState([])

  useEffect(() => {
      getNavData()
  },[])

  async function getNavData(){
      const res  = await fetch('/api/footer')
      const data = await res.json();
      setNavItems(data)
  }

  return (
    <footer>
        <div style={{backgroundColor:"black",color:"white", marginTop:"50px",padding:"30px 100px"}}>
          <ul>
              {navItems.map((item,index)=>(
                  <li key={index}>
                      <Link href={'/'+item.post_name}>{item.post_title}</Link>
                  </li>
              ))}
          </ul>
        </div>
    </footer>
  )
}

export default Footer;