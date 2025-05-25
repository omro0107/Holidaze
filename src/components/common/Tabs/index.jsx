import React from 'react';
import PropTypes from 'prop-types';

/**
 * Tabs component for switching between views or content sections.
 *
 * Renders a horizontal list of tab buttons. Highlights the active tab and 
 * calls `onTabChange` when a different tab is selected.
 *
 * @component
 * @example
 * const tabItems = [
 *   { id: 'details', label: 'Details' },
 *   { id: 'reviews', label: 'Reviews' },
 *   { id: 'booking', label: 'Booking' },
 * ];
 *
 * <Tabs 
 *   tabs={tabItems} 
 *   activeTab="details" 
 *   onTabChange={(id) => setActiveTab(id)} 
 * />
 *
 * @param {Object} props
 * @param {Array<{id: string, label: string}>} props.tabs - List of tab objects with unique `id` and display `label`.
 * @param {string} props.activeTab - The ID of the currently active tab.
 * @param {function} props.onTabChange - Callback when a tab is clicked. Receives the `id` of the selected tab.
 */
const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200" role="tablist">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-text hover:border-secondary-300'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default Tabs;
