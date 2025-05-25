import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../hooks/useAuth';
import useFormValidation from '../../hooks/useFormValidation';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/Header/Navigation';
import Footer from '../../components/Footer';

/**
 * Login page component.
 *
 * Renders a login form with email and password inputs, validating
 * user input with Yup schema and react-hook-form.
 * 
 * On successful form submission, calls the login function from the AuthContext.
 * Displays images on the left side for large screens for visual appeal.
 * Shows error messages for validation and authentication failures.
 * 
 * Uses:
 * - react-hook-form for form state management and validation
 * - yup for schema validation via yupResolver
 * - useAuth custom hook for authentication context
 * - Tailwind CSS for styling and layout
 * 
 * @component
 * @returns {JSX.Element} Login form page
 */
const Login = () => {
  const { login } = useAuth();
  const { loginSchema } = useFormValidation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema()),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      setError('submit', {
        type: 'manual',
        message: err.message || 'Failed to login',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F2EADF]">
      <Header />
      <div className="flex-grow flex flex-col">
        <main className="flex flex-1">
          {/* Left side - Images */}
          <div className="hidden lg:flex lg:w-2/5 pl-4 pr-12 py-8 flex-col">
            {/* Top image (floating) */}
            <div className="relative w-full h-1/2 mb-4 rounded-lg overflow-hidden">
              <img
                src="/images/floating.jpg"
                alt="Floating venue"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0"></div>
            </div>
            {/* Bottom row with two images */}
            <div className="flex gap-4 h-1/2">
              <div className="relative w-1/2 rounded-lg overflow-hidden">
                <img
                  src="/images/sunset.jpg"
                  alt="Beautiful sunset"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0"></div>
              </div>
              <div className="relative w-1/2 rounded-lg overflow-hidden">
                <img
                  src="/images/bathroom.jpg"
                  alt="Luxurious bathroom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0"></div>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full lg:w-3/5 flex items-center justify-center p-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
              <div className="mb-10">
                <h2 className="text-center text-3xl font-heading font-bold text-text mb-3">
                  Hello Again, Explorer
                </h2>
                <p className="text-center text-sm text-secondary-600">
                  First time here?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
                  >
                    Sign up to get started
                  </Link>
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <Input
                    id="email"
                    label="Email address"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    required
                    autoComplete="email"
                    className="w-full transition-all duration-200 focus:ring-primary-500 focus:border-primary-500 py-3 px-4 text-base"
                  />

                  <Input
                    id="password"
                    label="Password"
                    type="password"
                    {...register('password')}
                    error={errors.password?.message}
                    required
                    autoComplete="current-password"
                    className="w-full transition-all duration-200 focus:ring-primary-500 focus:border-primary-500 py-3 px-4 text-base"
                  />
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
                    Sign in
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-sm text-center">
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
