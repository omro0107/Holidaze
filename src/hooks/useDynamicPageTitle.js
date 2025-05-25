import { useEffect } from 'react';

/**
 * Custom hook for setting dynamic page titles
 * @param {string} baseTitle - The base title for the page
 * @param {Object} options - Options for title generation
 * @param {string} options.dynamicPart - Dynamic part of the title (e.g., venue name)
 * @param {boolean} options.isLoading - Whether content is loading
 */
const useDynamicPageTitle = (baseTitle, options = {}) => {
  const { dynamicPart, isLoading } = options;

  useEffect(() => {
    let title = 'Holidaze';

    if (isLoading) {
      title = `Loading... | Holidaze`;
    } else if (dynamicPart) {
      title = `${dynamicPart} | Holidaze`;
    } else if (baseTitle) {
      title = `${baseTitle} | Holidaze`;
    }

    document.title = title;

    return () => {
      document.title = 'Holidaze';
    };
  }, [baseTitle, dynamicPart, isLoading]);
};

export default useDynamicPageTitle;
