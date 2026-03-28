import React, { ReactNode, useCallback, useEffect, useState } from 'react';

/** Mirrors @jmacera/back-to-top-component options; implemented locally to avoid a second React copy (CRA + nested deps). */
export interface BackToTopProps {
  threshold?: number;
  smooth?: boolean;
  className?: string;
  icon?: ReactNode;
  text?: string;
  bottom?: number;
  right?: number;
  ariaLabel?: string;
  onClick?: () => void;
}

const BackToTop: React.FC<BackToTopProps> = ({
  threshold = 300,
  smooth = true,
  className = '',
  icon,
  text = '',
  bottom = 32,
  right = 32,
  ariaLabel = 'Back to top',
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const updateVisibility = useCallback(() => {
    setIsVisible(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, [updateVisibility]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
    onClick?.();
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={className}
      style={{ bottom: `${bottom}px`, right: `${right}px` }}
      aria-label={ariaLabel}
    >
      {icon ?? <span aria-hidden>↑</span>}
      {text ? <span className="back-to-top-text">{text}</span> : null}
    </button>
  );
};

export default BackToTop;
