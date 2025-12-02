'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PasswordFormProps {
	handlePasswordSubmit: (e: React.FormEvent) => void;
	currentPassword: string;
	setCurrentPassword: (value: string) => void;
	newPassword: string;
	setNewPassword: (value: string) => void;
	confirmPassword: string;
	setConfirmPassword: (value: string) => void;
}

export default function PasswordTab({
	handlePasswordSubmit,
	currentPassword,
	setCurrentPassword,
	newPassword,
	setNewPassword,
	confirmPassword,
	setConfirmPassword,
}: PasswordFormProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Password Change</CardTitle>
				<CardDescription>
					Use a strong password for your security.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handlePasswordSubmit} className="space-y-4">
					<div className="grid gap-2">
						<Label htmlFor="currentPassword">Current Password</Label>
						<Input
							id="currentPassword"
							type="password"
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="newPassword">New Password</Label>
						<Input
							id="newPassword"
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="confirmPassword">Confirm New Password</Label>
						<Input
							id="confirmPassword"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<Button type="submit">Update Password</Button>
				</form>
			</CardContent>
		</Card>
	);
}
