// Simple smooth scrolling using native CSS scroll-behavior

export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with id "${elementId}" not found.`);
    return;
  }
  
  // Calculate offset for fixed header
  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  
  // Use native smooth scrolling - much faster and no delay
  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth'
  });
}; 