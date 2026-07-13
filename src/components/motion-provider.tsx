"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionProvider({children}:{children:React.ReactNode}){
  const pathname=usePathname();
  useEffect(()=>{
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements=document.querySelectorAll("main > section, main > footer, .menu-item, .values article");
    if(reduce)return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const element=entry.target as HTMLElement;
      element.animate(
        [{opacity:0,transform:"translateY(32px)"},{opacity:1,transform:"translateY(0)"}],
        {duration:700,easing:"cubic-bezier(.2,.7,.2,1)",fill:"both"}
      );
      observer.unobserve(element);
    }),{threshold:.08,rootMargin:"0px 0px -45px"});
    elements.forEach(el=>observer.observe(el));
    return()=>observer.disconnect();
  },[pathname]);
  return <>{children}</>;
}
