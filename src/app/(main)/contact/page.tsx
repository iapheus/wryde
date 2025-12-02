'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { API_BASE } from '@/lib/constants';

type Status = {
	message: string;
	type: 'success' | 'error' | null;
};

export default function ContactPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [statusMessage, setStatusMessage] = useState<Status>({
		message: '',
		type: null,
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatusMessage({ message: '', type: null });
		setIsLoading(true);

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		};

		try {
			const res = await fetch(`${API_BASE}/contact`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify({ name, email, subject, message }),
			});

			if (!res.ok) {
				const errorData = await res.json().catch(() => ({}));
				const errorMessage = errorData.message || 'Failed to send message';
				throw new Error(errorMessage);
			}

			setStatusMessage({
				message: 'Message sent successfully! We will get back to you soon.',
				type: 'success',
			});

			setName('');
			setEmail('');
			setSubject('');
			setMessage('');
		} catch (error) {
			console.error(error);
			setStatusMessage({
				message:
					'An error occurred while sending the message. Please try again.',
				type: 'error',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const getStatusClasses = (type: Status['type']) => {
		switch (type) {
			case 'success':
				return 'bg-green-100 border-green-400 text-green-700';
			case 'error':
				return 'bg-red-100 border-red-400 text-red-700';
			default:
				return '';
		}
	};

	return (
		<div className="mx-auto mt-20 max-w-2xl px-4 py-10">
			<Card>
				<CardHeader>
					<CardTitle>Contact Us</CardTitle>
					<CardDescription>
						Please fill out the form below and we will get back to you.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						{statusMessage.type && statusMessage.message && (
							<div
								className={`p-3 rounded-md border text-sm ${getStatusClasses(
									statusMessage.type
								)} transition-opacity duration-300`}
								role={statusMessage.type === 'error' ? 'alert' : 'status'}
							>
								{statusMessage.message}
							</div>
						)}

						{isLoading && (
							<div className="text-center text-sm text-gray-500">
								Sending message...
							</div>
						)}

						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div className="grid gap-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Your Name"
									required
									disabled={isLoading}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="your.email@example.com"
									required
									disabled={isLoading}
								/>
							</div>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="subject">Subject</Label>
							<Input
								id="subject"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
								placeholder="How can we help?"
								required
								disabled={isLoading}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="message">Message</Label>
							<Textarea
								id="message"
								rows={5}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Your message..."
								required
								disabled={isLoading}
							/>
						</div>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? 'Sending...' : 'Send Message'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
