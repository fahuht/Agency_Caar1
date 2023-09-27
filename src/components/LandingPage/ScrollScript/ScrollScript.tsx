'use client'

import React, { useEffect } from 'react';

export default function ScrollScript() {
  useEffect(() => {
    function reveal() {
      const reveals = document.querySelectorAll(".reveal");
    //   if (reveals && reveals.length > 0 && Array.isArray(reveals)) {
        for (let i = 0; i < reveals.length; i+=1) {
          const windowHeight = window.innerHeight;
          const elementTop =  reveals[i]?.getBoundingClientRect().top;
          const elementVisible = 150;
          if (elementTop && elementTop < windowHeight - elementVisible) {
             reveals[i]?.classList.add("active");
          } else {
             reveals[i]?.classList.remove("active");
          }
        }
    //   }
    }

    window.addEventListener("scroll", reveal);

    return () => {
      window.removeEventListener("scroll", reveal);
    };
  }, []); 

  return (
    <>
    </>
  );
}