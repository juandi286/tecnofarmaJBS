import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Default to false (desktop) on the server and initial client render.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This effect runs only on the client.
    const checkDevice = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Set the initial value after the component mounts.
    checkDevice();

    // Add resize listener.
    window.addEventListener('resize', checkDevice);

    // Clean up the listener on component unmount.
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []); // Empty dependency array means this effect runs once on mount.

  return isMobile;
}
