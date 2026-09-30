'use client';

import { useEffect, useState } from 'react';

function useLagosTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function update() {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Africa/Lagos',
      }).format(now);
      setTime(`(GMT+1) ${formatted}`);
    }

    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Hero() {
  const localTime = useLagosTime();

  return (
    <main className="main">
      <div className="top">
        <h1 className="headline font-serif-2">
          <div>MICHAEL</div>
          <div className='mt-1'>ONYEKWERE</div>
        </h1>

        <p className="intro ">
          Software developer based in Lagos, Nigeria — focused on thoughtful, considered app experiences.
        </p>
      </div>

      <div className="bottom">
        <div className="col">
          <div>Lagos, Nigeria</div>
          <div className="muted">{localTime}</div>
        </div>

        <div className="col">
          <div>Open for</div>
          <div>Collaborations</div>
        </div>

        {/* <div className="scroll ">SCROLL</div> */}
      </div>
    </main>
  );
}