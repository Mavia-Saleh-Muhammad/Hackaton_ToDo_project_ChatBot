'use client';

/**
 * Signup Page (T087, T090)
 * Flagship UI sign-up page with premium visual system.
 *
 * Features:
 * - Centered card layout with rounded-3xl
 * - Shadow-xl with dark mode support
 * - Consistent spacing (48px major rhythm)
 * - Form validation with visual error states
 * - Password strength requirements
 * - Dark mode support
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validation
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter');
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter');
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError('Password must contain at least one number');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      await signup(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4 py-12">
      {/* Theme toggle in corner */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Main card */}
      <div
        className="
          w-full max-w-md
          bg-white dark:bg-slate-800
          rounded-3xl
          p-8 sm:p-10
          shadow-xl dark:shadow-2xl
          border border-slate-100 dark:border-slate-700
          animate-scale-in
        "
      >
        {/* Header */}
        <div className="text-center mb-10">
          {/* Logo placeholder */}
          <div
            className="
              w-16 h-16 mx-auto mb-6
              bg-gradient-to-br from-indigo-500 to-indigo-600
              rounded-2xl
              flex items-center justify-center
              shadow-lg
            "
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Create your account
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Start managing your tasks today
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Error message */}
          {error && (
            <div
              className="
                p-4 rounded-xl
                bg-rose-50 dark:bg-rose-950/20
                border border-rose-200 dark:border-rose-800
                animate-fadeInUp
              "
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Input fields */}
          <div className="space-y-5">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => email && validateEmail(email)}
              error={emailError}
              required
              disabled={isLoading}
              placeholder="you@example.com"
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => password && validatePassword(password)}
              error={passwordError}
              required
              disabled={isLoading}
              placeholder="Create a strong password"
              helperText="Min 8 chars, with uppercase, lowercase, and number"
              autoComplete="new-password"
            />
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </div>

          {/* Footer link */}
          <div className="text-center pt-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="
                  font-medium text-indigo-600 dark:text-indigo-400
                  hover:text-indigo-700 dark:hover:text-indigo-300
                  transition-colors duration-200
                "
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
