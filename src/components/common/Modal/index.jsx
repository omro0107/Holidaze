import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../Button';

/**
 * Modal dialog component with support for header, footer, size options,
 * and custom close behavior.
 *
 * @component
 * @example
 * <Modal
 *   isOpen={true}
 *   onClose={() => setOpen(false)}
 *   title="Confirm Action"
 *   footer={<Button onClick={handleConfirm}>Confirm</Button>}
 * >
 *   Are you sure you want to continue?
 * </Modal>
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {function} props.onClose - Callback fired when the modal requests to close
 * @param {React.ReactNode} [props.title] - Optional modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {React.ReactNode} [props.footer] - Optional footer content (e.g., buttons)
 * @param {'sm'|'md'|'lg'|'xl'|'full'} [props.size='md'] - Width size of the modal
 * @param {boolean} [props.showClose=true] - Whether to show the close (X) icon
 * @param {boolean} [props.closeOnOverlayClick=true] - Whether clicking on the overlay should close the modal
 * @param {boolean} [props.preventClose=false] - Prevents closing via X or overlay
 * @param {string} [props.className] - Optional custom class name for modal container
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showClose = true,
  closeOnOverlayClick = true,
  preventClose = false,
  className = '',
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const handleClose = () => {
    if (!preventClose) {
      onClose();
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={closeOnOverlayClick ? handleClose : () => {}}
        aria-modal="true"
        aria-describedby={`${title ? 'modal-title' : ''}`}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`
                inline-block align-bottom bg-white rounded-lg text-left
                overflow-hidden shadow-xl transform transition-all
                sm:my-8 sm:align-middle ${sizes[size]} w-full max-h[90vh] overflow-y-auto
                ${className}
              `}
            >
              {/* Header */}
              {(title || showClose) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium text-[#70533A]"
                      id="modal-title"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {showClose && (
                      <button
                        type="button"
                        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        onClick={handleClose}
                        aria-label="Close modal"
                      >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="px-6 py-4">{children}</div>

              {/* Footer */}
              {footer && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-end space-x-3">
                    {!preventClose && (
                      <Button
                        variant="outline"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    )}
                    {footer}
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  showClose: PropTypes.bool,
  closeOnOverlayClick: PropTypes.bool,
  preventClose: PropTypes.bool,
  className: PropTypes.string,
};

export default Modal;
