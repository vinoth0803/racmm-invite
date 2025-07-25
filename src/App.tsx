import React, { useState, useEffect } from 'react';
import logo1 from './assets/mm_logo.webp';
import logo2 from './assets/herrisein5.webp';
import vibeMusic from './assets/powerhouse-vibe.mp3';
import poster from './assets/mm-invite.webp';

function App() {
  const [showInitial, setShowInitial] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showPoster, setShowPoster] = useState(false);
  const [bgAudio] = useState(new Audio(vibeMusic));
  useEffect(() => {
  bgAudio.load(); // preload
}, []);


  // Create beep sound effect
  const playBeep = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  // Create air horn sound effect
  const playAirHorn = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Two frequencies for richer air horn sound
    oscillator1.frequency.value = 220;
    oscillator2.frequency.value = 440;
    oscillator1.type = 'sawtooth';
    oscillator2.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
    
    oscillator1.start(audioContext.currentTime);
    oscillator2.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.8);
    oscillator2.stop(audioContext.currentTime + 0.8);
  };

  const handleCTAClick = () => {
  setShowInitial(false);

  // Defer countdown to idle time to reduce input delay
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      setCountdown(5);
    });
  } else {
    setTimeout(() => setCountdown(5), 50); // fallback
  }
};


  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      playBeep();
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      playAirHorn();
      setTimeout(() => {
        setCountdown(null);
        setShowPoster(true);
        bgAudio.loop = true;
      bgAudio.volume = 0.5;// Set volume to a reasonable level
      // Attempt to play audio after a short delay to ensure user interaction
      
      bgAudio.play().catch(err => {
        console.error("Autoplay failed:", err);
      });
      }, 1000);
    }
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 relative overflow-hidden font-poppins">
      {/* Animated Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-b from-transparent via-purple-300/20 to-transparent animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              width: '2px',
              height: `${100 + Math.random() * 200}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {showInitial && (
          <div className="text-center animate-fade-in">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-yellow-400 via-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-8 tracking-wide">
              You're Happily Invited
            </h1>

            {/* Organization Details */}
            <div className="space-y-3 mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Rotaract Club of Madras Millennia
              </h2>
              <p className="text-lg md:text-xl text-purple-200 italic">
                Sponsored by Rotary Club of Chennai Hallmark - RID 3234
              </p>
              <h3 className="text-xl md:text-2xl font-medium text-white border-t border-b border-purple-400 py-4 mt-6">
                Club Installation Ceremony
              </h3>
            </div>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-purple-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join us for an unforgettable evening of celebration and new beginnings.
            </p>

            {/* CTA Button */}
            <button
              onClick={handleCTAClick}
              className="group relative px-8 py-4 bg-purple-600 text-white font-semibold text-lg rounded-full 
                       transition-all duration-300 hover:bg-white hover:text-purple-600 
                       transform hover:scale-105 active:scale-95 shadow-2xl
                       before:absolute before:inset-0 before:rounded-full before:border-2 
                       before:border-rose-400 before:animate-round-border"
            >
              <span className="relative z-10">Click Me to Launch</span>
            </button>
          </div>
        )}

        {/* Countdown Display */}
        {countdown !== null && (
          <div className="text-center animate-bounce-in">
            <div className="text-8xl md:text-9xl font-bold text-white animate-pulse-scale">
              {countdown}
            </div>
            <p className="text-2xl text-purple-200 mt-4">Get Ready...</p>
          </div>
        )}

        {/* Event Poster */}
        {showPoster && (
          <div className="text-center animate-slide-up">
            <div className="max-w-md mx-auto">
              {/* Main Card Container */}
              <div className="bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-3xl shadow-2xl p-8 border-4 border-purple-300">
                {/* Header with Star Icon */}
                <div className="text-center mb-6">
                  <div className="flex justify-center items-center gap-4 mb-4">
    <img src={logo1} alt="Herrisein Logo" className="h-12 rounded-full bg-gray-200" />
    <img src={logo2} alt="MM Logo" className="h-12 rounded-full" />
  </div>
                  <h1 className="text-xl font-bold text-gray-800 mb-2">
                    Rotaract Club of Madras Millennia
                  </h1>
                  <h2 className="text-lg font-semibold text-gray-700 mb-1">
                    Installation Ceremony 2025
                  </h2>
                  <p className="text-gray-600 text-sm mb-1">Sunday, August 3rd, 2025</p>
                  <p className="text-gray-600 text-sm mb-1">9:30 AM - 12:00 PM</p>
                  <p className="text-gray-600 text-sm font-medium mb-1">Government Higher Secondary School, Velachery</p>
                </div>

                {/* Event Poster Placeholder */}
                <div className="mb-6">
  <img
    src={poster}
    alt="Event Poster"
    className="rounded-2xl shadow-xl border-4 border-purple-300 w-full max-w-full object-contain max-h-[600px]"
  />
</div>

                {/* Footer Quote */}
                <div className="text-center">
                  <p className="text-gray-600 text-sm italic">
                    "Celebrating Leadership, Friendship, and Service"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { transform: translateY(-20px) translateX(20px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes round-border {
          0% { 
            border-color: transparent transparent transparent rose-400;
            transform: rotate(0deg);
          }
          25% { 
            border-color: rose-400 transparent transparent transparent;
            transform: rotate(90deg);
          }
          50% { 
            border-color: transparent rose-400 transparent transparent;
            transform: rotate(180deg);
          }
          75% { 
            border-color: transparent transparent rose-400 transparent;
            transform: rotate(270deg);
          }
          100% { 
            border-color: transparent transparent transparent rose-400;
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }

        .animate-pulse-scale {
          animation: pulse-scale 1s ease-in-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-round-border {
          animation: round-border 2s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default App;