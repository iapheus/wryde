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
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

interface AccountFormProps {
	handleAccountSubmit: (e: React.FormEvent) => void;
	avatarUrl: string | null;
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	firstName: string;
	setFirstName: (value: string) => void;
	lastName: string;
	setLastName: (value: string) => void;
	email: string;
	phoneNumber: string;
	setPhoneNumber: (value: string) => void;
	location: string;
	setLocation: (value: string) => void;
	bio: string;
	setBio: (value: string) => void;
}

export default function AccountTab({
	handleAccountSubmit,
	avatarUrl,
	handleImageChange,
	firstName,
	setFirstName,
	lastName,
	setLastName,
	email,
	phoneNumber,
	setPhoneNumber,
	location,
	setLocation,
	bio,
	setBio,
}: AccountFormProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Account Information</CardTitle>
				<CardDescription>
					Update your profile picture, name, contact, and personal details.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleAccountSubmit} className="space-y-6">
					<div className="flex items-center space-x-6">
						<div className="relative h-20 w-20 overflow-hidden rounded-full border">
							<Image
								src={avatarUrl || 'https://avatar.iran.liara.run/public'}
								alt="Profile Picture"
								fill
								className="object-cover"
							/>
						</div>
						<div className="grid gap-1.5">
							<Label htmlFor="picture">Upload New Photo</Label>
							<Input
								id="picture"
								type="file"
								onChange={handleImageChange}
								accept="image/*"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="grid gap-2">
							<Label htmlFor="firstName">First Name</Label>
							<Input
								id="firstName"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="lastName">Last Name</Label>
							<Input
								id="lastName"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" value={email} disabled />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="phoneNumber">Phone Number</Label>
							<Input
								id="phoneNumber"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="location">Location</Label>
						<Input
							id="location"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="bio">Bio (About You)</Label>
						<Textarea
							id="bio"
							rows={3}
							value={bio}
							onChange={(e) => setBio(e.target.value)}
						/>
					</div>

					<Button type="submit" className="w-full sm:w-auto">
						Update Information
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
