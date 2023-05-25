import React, { useEffect, useState } from 'react'

function Apitesting() {

    const [apidata, setapidata]= useState([])
    const [isFetching, setIsFetching] = useState(false);
    let [page, setpage]= useState(0)
    async function get(){
        const data= await fetch(`https://internship-service.onrender.com/videos?page=${page}`);
        const json= await data.json();
        setapidata([...apidata,...json.data.posts])
        console.log(page)
        
      }
      console.log(apidata)
    useEffect(()=>{
      
        get();
    },[])

    function handleScroll() {
        if (
          window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight
        )

        
          return;
        setIsFetching(true);
      }
      function getMorePosts() {
        setTimeout(() => {
          setpage(page+1)
          get();
          setIsFetching(false);
        }, 2000);
      }
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
     
      useEffect(() => {
        if (!isFetching) return;
        getMorePosts();
      }, [isFetching]);
        
  return (
    <div>
        <div>
        {apidata?.map((i,c)=>{
                return <h2 style={{margin:'50px'}} key={c}>{c} {i.creator.handle}</h2>
            })}
        </div>
    </div>
  )
}

export default Apitesting