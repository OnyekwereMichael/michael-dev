'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function useLagosTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function update() {
      const formatted = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Africa/Lagos',
      }).format(new Date());
      setTime(`(GMT+1) ${formatted}`);
    }

    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const EASE = [0.22, 0.85, 0.32, 1] as const;

export default function Hero() {
  const localTime = useLagosTime();
  const reduce = useReducedMotion();

  // Builds one animated element: where it starts, and when it plays in the sequence
  const reveal = (from: { x?: number | string; y?: number | string }, delay: number, duration = 1.2) => ({
    initial: { opacity: 0, ...(reduce ? {} : from) },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: {
      duration: reduce ? 0.4 : duration,
      delay,
      ease: EASE,
      opacity: { duration: reduce ? 0.4 : duration * 0.6, delay, ease: 'easeOut' as const },
    },
  });

  return (
    <main className="main">
      <div className="top">
        <h1 className="headline font-serif-2">
          {/* 1. first name slides in from the right */}
          <motion.span className="headline-line" {...reveal({ x: '50vw' }, 0.2)}>
            MICHAEL
          </motion.span>
          {/* 2. surname follows */}
          <motion.span className="headline-line" {...reveal({ x: '50vw' }, 0.5)}>
            ONYEKWERE
          </motion.span>
        </h1>

        {/* 3. intro slides in from the left (short travel so it never crosses the name) */}
        <motion.p className="intro" {...reveal({ x: -70 }, 1.1, 1)}>
          Software developer based in Lagos, Nigeria, building thoughtful web & mobile apps alongside intelligent AI agents.
        </motion.p>
      </div>

      <div className="bottom">
        {/* 4. bottom columns rise up, one after the other */}
        <motion.div className="col" {...reveal({ y: 60 }, 1.5, 1)}>
          <div>Lagos, Nigeria</div>
          <div className="muted">{localTime}</div>
        </motion.div>

        <motion.div className="col" {...reveal({ y: 60 }, 1.7, 1)}>
          <div>Open for</div>
          <div>Collaborations</div>
        </motion.div>
      </div>
    </main>
  );
}