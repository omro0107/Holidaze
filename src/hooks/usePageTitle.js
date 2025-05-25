import { useEffect } from 'react';

/**
 * Custom hook to set page title with consistent format
 * @param {string} title - The page-specific title
 */
const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | Holidaze` : 'Holidaze';
  }, [title]);
};

export default usePageTitle;
