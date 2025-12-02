'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = 'http://localhost:5029/api/auth/login';

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'form'>) {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email || !password) {
			setError('Email and Password fields are required.');
			return;
		}

		setError(null);
		setSuccess(null);
		setIsLoading(true);

		const loginData = { email, password };

		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(loginData),
			});

			const result = await response.json();

			if (!response.ok) {
				const errorMessage = result.message || result.title || 'Login failed.';
				throw new Error(errorMessage);
			}

			if (result.token) {
				localStorage.setItem('authToken', result.token);

				setSuccess('Login successful!');

				setTimeout(() => {
					router.push('/');
				}, 1500);
			} else {
				throw new Error('API response did not contain a token.');
			}
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'An unknown error occurred.'
			);
			console.error('Login Error:', err);
		} finally {
			if (!success) {
				setIsLoading(false);
			}
		}
	};

	return (
		<form
			className={cn('flex flex-col gap-6', className)}
			onSubmit={handleSubmit}
			{...props}
		>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Login to your account</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Enter your email below to log in to your account
					</p>
				</div>
				{error && (
					<div className="text-sm text-red-600 p-2 border border-red-200 bg-red-50 rounded">
						{error}
					</div>
				)}
				{success && (
					<div className="text-sm text-green-600 p-2 border border-green-200 bg-green-50 rounded">
						{success}
					</div>
				)}

				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input
						id="email"
						type="email"
						placeholder="user@example.com"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={!!success}
					/>
				</Field>

				<Field>
					<div className="flex items-center">
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<Link
							href="/password-reset"
							className="ml-auto text-sm underline-offset-4 hover:underline"
						>
							Forgot your password?
						</Link>
					</div>
					<Input
						id="password"
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						disabled={!!success}
					/>
				</Field>

				<Field>
					<Button type="submit" disabled={isLoading || !!success}>
						{isLoading
							? 'Logging In...'
							: success
							? 'Login successful!'
							: 'Login'}
					</Button>
				</Field>

				<Field>
					<p className="text-muted-foreground text-sm text-center">
						Don&apos;t have an account?{' '}
						<Link href="/register" className="underline underline-offset-4">
							Sign up
						</Link>
					</p>
				</Field>
			</FieldGroup>
		</form>
	);
}
