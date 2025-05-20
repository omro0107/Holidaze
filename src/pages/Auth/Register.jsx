import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthContext';
import useFormValidation from '../../hooks/useFormValidation';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/Header/Navigation';
import Footer from '../../components/Footer';

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { registerSchema } = useFormValidation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema()),
    defaultValues: {
      venueManager: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const transformedData = {
        name: data.name,
        email: data.email,
        password: data.password,
        venueManager: data.venueManager || false,
      };

      if (data.avatar) {
        transformedData.avatar = {
          url: data.avatar,
          alt: `${data.name}'s avatar`
        };
      }

      await registerUser(transformedData);
      navigate('/login', {
        state: { message: 'Registration successful! Please log in.' },
      });
    } catch (err) {
      setError('submit', {
        type: 'manual',
        message: err.message || 'Failed to register',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F2EADF]">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="mb-10">
            <h2 className="text-center text-3xl font-heading font-bold text-gray-900 mb-3">
              New Here? Welcome Aboard
            </h2>
            <p className="text-center text-sm text-gray-600">
              Been here before?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {/* Form Fields */}
            <div className="space-y-6">
              <Input
                id="register-name"
                label="Name"
                type="text"
                {...register('name')}
                error={errors.name?.message}
                required
                autoComplete="name"
                className="w-full transition-all duration-200 focus:ring-primary-500 focus:border-primary-500 py-3 px-4 text-base"
              />

              <Input
                id="register-email"
                label="Email address"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                required
                autoComplete="email"
                className="w-full transition-all duration-200 focus:ring-primary-500 focus:border-primary-500 py-3 px-4 text-base"
              />

              <Input
                id="register-password"
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password?.message}
                required
                autoComplete="new-password"
                className="w-full transition-all duration-200 focus:ring-primary-500 focus:border-primary-500 py-3 px-4 text-base"
              />

              <Input
                id="register-avatar"
                label="Avatar URL"
                type="url"
                {...register('avatar')}
                error={errors.avatar?.message}
                placeholder="https://example.com/avatar.jpg"
                className="w-full transition-all duration-200 focus:ring-primary-500 focus:border-primary-500 py-3 px-4 text-base"
              />
            </div>

            {/* Venue Manager Checkbox */}
            <div className="flex items-center py-4 px-4 rounded-lg bg-white/5 border border-gray-200/10">
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="venueManager"
                    type="checkbox"
                    {...register('venueManager')}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 
                             focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-[#F2EADF]
                             transition-all duration-200 cursor-pointer"
                  />
                </div>
                <div className="ml-3">
                  <label
                    htmlFor="venueManager"
                    className="text-sm font-medium text-gray-900 cursor-pointer select-none"
                  >
                    Register as a venue manager
                  </label>
                  <p className="text-xs text-gray-600 mt-1">
                    Get access to create and manage venue listings
                  </p>
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="text-red-600 text-sm text-center">
                {errors.submit.message}
              </div>
            )}

            <div>
              <Button
                type="submit"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
                className="transform transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] py-3"
              >
                Create account
              </Button>
            </div>
          </form>

          <div className="mt-8 text-xs text-center text-gray-600">
            By creating an account, you agree to our{' '}
            <a
              href="#"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="#"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
