'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useState } from 'react';

const API_URL = 'http://localhost:5029/api/auth/register';

export function SignupForm({
	className,
	...props
}: React.ComponentProps<'form'>) {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setError(null);
		setSuccess(null);

		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			setError('All fields are required.');
			return;
		}

		if (password !== confirmPassword) {
			setError('Password and Confirm Password must match.');
			return;
		}

		setIsLoading(true);

		const registerData = {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
		};

		try {
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(registerData),
			});

			const result = await response.json();

			if (!response.ok) {
				const errorMessage =
					result.message || result.title || 'Registration failed.';
				throw new Error(errorMessage);
			}

			setSuccess('Successfully registered! You can now log in.');
			setFirstName('');
			setLastName('');
			setEmail('');
			setPassword('');
			setConfirmPassword('');
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'An unknown error occurred.'
			);
			console.error('Registration Error:', err);
		} finally {
			setIsLoading(false);
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
					<h1 className="text-2xl font-bold">Create your account</h1>
					<p className="text-muted-foreground text-sm text-balance">
						Fill in the form below to create your account
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
					<FieldLabel htmlFor="firstName">First Name</FieldLabel>
					<Input
						id="firstName"
						type="text"
						placeholder="John"
						required
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</Field>

				<Field>
					<FieldLabel htmlFor="lastName">Last Name</FieldLabel>
					<Input
						id="lastName"
						type="text"
						placeholder="Doe"
						required
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</Field>

				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input
						id="email"
						type="email"
						placeholder="user@example.com"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Field>

				<Field>
					<FieldLabel htmlFor="password">Password</FieldLabel>
					<Input
						id="password"
						type="password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<FieldDescription>
						Must be at least 8 characters long.
					</FieldDescription>
				</Field>

				<Field>
					<FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
					<Input
						id="confirm-password"
						type="password"
						required
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<FieldDescription>Please confirm your password.</FieldDescription>
				</Field>

				<Field>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? 'Creating Account...' : 'Create Account'}
					</Button>
				</Field>

				<Field>
					<p className="text-muted-foreground text-sm text-center">
						Already have an account?{' '}
						<Link href="/login" className="underline underline-offset-4">
							Sign in
						</Link>
					</p>
				</Field>
			</FieldGroup>
		</form>
	);
}
