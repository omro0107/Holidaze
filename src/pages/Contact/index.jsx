import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      console.log('Form submitted:', data);
      setShowModal(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Image */}
      <div className="relative h-[400px] mb-12">
        <img
          src="/images/chilling.jpg"
          alt="People relaxing"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-text text-center mb-8">
          We'd Love to Hear From You
        </h1>

        <div className="prose prose-lg mx-auto mb-12 text-text">
          <p>
            Whether you have a question, need help planning your next getaway, or simply want to share your thoughts — we're here for you.
          </p>
          <p>
            Our dedicated support team is always happy to assist and ensure your experience with Holidaze is smooth, inspiring, and stress-free.
          </p>
          <p>
            We also truly value your feedback. Your ideas and suggestions help us grow, improve, and continue creating meaningful travel experiences that feel a little more personal — just like they should.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            id="contact-name"
            label="Name"
            {...register('name')}
            error={errors.name?.message}
            fullWidth
          />

          <Input
            id="contact-email"
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            fullWidth
          />

          <div>
            <label className="block text-sm font-medium text-[#70533A] mb-1">
              Message
            </label>
            <textarea
              id="contact-message"
              {...register('message')}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Thanks for reaching out!"
      >
        <div className="p-6">
          <p className="text-lg text-[#70533A] mb-4">
            We’ve received your message and will be in touch shortly.
          </p>
          <div className="flex justify-end">
            <Button onClick={() => setShowModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
