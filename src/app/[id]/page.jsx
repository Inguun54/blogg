"use client"

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { Parent } from "@/components/Home";
const Page = () =>{
    const [page, setPage] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        async function fetchArticles() {
          const response = await fetch(`https://dev.to/api/articles${pathname}`);
          const data = await response.json();
          setPage(data);
          console.log(data)
        }
    
        fetchArticles();
      }, []); 
    
    return (
 <Parent>
<div>
           <div className="page-title">{page.title}</div>
           <img className="page-cover_image"src={page.cover_image}/>
           <div className="page-tags">tags: {page.tags}</div>
           <div className="page-description">Description: {page.description}</div>
           <div className="container2">   
           <div className="page-last_comment_at">Latest comment: {page.last_comment_at}</div>
           <div className="page-comments_count">Comments: {page.comments_count}</div>
           <div className="page-positive_reactions_count">Reactions: {page.positive_reactions_count}</div>
           <div className="page-positive_reactions_count">Reading Time: {page.reading_time_minutes} minutes</div>
            </div>
           </div>
</Parent>

    )
}

export default Page;
