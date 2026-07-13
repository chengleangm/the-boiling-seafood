"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionProvider({children}:{children:React.ReactNode}){
  const pathname=usePathname();
  useEffect(()=>{
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements=document.querySelectorAll("main > section, main > footer, .menu-item, .values article");
    if(reduce){elements.forEach(el=>el.classList.add("motion-visible"));return}
    elements.forEach(el=>el.classList.add("motion-ready"));
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("motion-visible");observer.unobserve(entry.target)}}),{threshold:.08,rootMargin:"0px 0px -45px"});
    elements.forEach(el=>observer.observe(el));
    return()=>observer.disconnect();
  },[pathname]);
  return <>{children}</>;
}
