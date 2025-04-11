import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4 py-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Job Board. All rights reserved. Built by <span className="font-semibold">Fariha</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
