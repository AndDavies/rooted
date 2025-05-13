// Smooth scrolling utility with easing function

// Easing function that starts slow, speeds up, then slows down
const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with id "${elementId}" not found.`);
    return;
  }
  
  const headerOffset = 80; // Account for fixed header
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
  const startPosition = window.pageYOffset;
  const distance = offsetPosition - startPosition;
  
  const duration = 1000; // Animation duration in ms
  let start: number | null = null;
  
  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const time = Math.min(1, progress / duration);
    
    // Apply easing function
    const easedTime = easeInOutQuad(time);
    
    window.scrollTo({
      top: startPosition + distance * easedTime,
      behavior: 'auto' // We're controlling the animation manually
    });
    
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  };
  
  window.requestAnimationFrame(step);
}; 