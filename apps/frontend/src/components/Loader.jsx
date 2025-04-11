import { useEffect, useState } from "react";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true); // ✅ Track if the loader is visible

  useEffect(() => {
    const animation = {
      easing: {
        swing: function (progress) {
          return 0.5 - Math.cos(progress * Math.PI) / 2;
        },
      },
      animate: function (options) {
        const start = new Date();
        const id = setInterval(() => {
          const timePassed = new Date() - start;
          let progress = timePassed / options.duration;
          if (progress > 1) {
            progress = 1;
          }
          const delta = options.delta(progress);
          options.step(delta);
          if (progress === 1) {
            clearInterval(id);
          }
        }, options.delay || 10);
      },
      fadeOut: function (element, options) {
        animation.animate({
          duration: options.duration,
          delta: (progress) => animation.easing.swing(progress),
          step: function (delta) {
            element.style.opacity = 1 - delta;
          },
        });
      },
    };

    const load = document.getElementById("loading");
    if (load) {
      setTimeout(() => {
        animation.fadeOut(load, { duration: 1000 }); 
        setTimeout(() => {
          setIsLoading(false); 
        }, 1000);
      }, 2000); 
    }
  }, []);

  if (!isLoading) return null; 

  return (
    <div id="loading" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
      <div id="loading-center" role="status">
        {/* Replace the span with an inline SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            r="32"
            strokeWidth="8"
            stroke="#007bff"
            strokeDasharray="50.26548245743669 50.26548245743669"
            fill="none"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;1"
              values="0 50 50;360 50 50"
            />
          </circle>
        </svg>
      </div>
    </div>
  );
};

export default Loader;