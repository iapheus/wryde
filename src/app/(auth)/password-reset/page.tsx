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
import React from 'react';

export default function PasswordResetForm({
	className,
	...props
}: React.ComponentProps<'form'>) {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="w-full max-w-sm">
				<form
					className={cn('flex w-full flex-col gap-6', className)}
					{...props}
				>
					<FieldGroup>
						<div className="flex flex-col items-center gap-1 text-center">
							<h1 className="text-2xl font-bold">Reset Your Password</h1>
							<p className="text-muted-foreground text-sm text-balance">
								Enter your registered email address. We will send you a reset
								link.
							</p>
						</div>

						<Field>
							<FieldLabel htmlFor="email">Email Address</FieldLabel>
							<Input
								id="email"
								type="email"
								placeholder="user@example.com"
								required
							/>
							<FieldDescription>
								The reset link will be sent to this address.
							</FieldDescription>
						</Field>

						<Field>
							<Button type="submit" className="w-full">
								Send Reset Link
							</Button>
						</Field>

						<Field>
							<Link
								href="/login"
								className="text-sm text-center text-primary underline-offset-4 hover:underline block"
							>
								Back to login
							</Link>
						</Field>
					</FieldGroup>
				</form>
			</div>
		</div>
	);
}
