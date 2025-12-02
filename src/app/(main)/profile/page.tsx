'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';
import AccountForm from '@/components/Profile/AccountTab';
import PasswordForm from '@/components/Profile/PasswordTab';
import { API_BASE } from '@/lib/constants';

interface UserProfile {
	email: string;
	firstName: string | null;
	lastName: string | null;
	phoneNumber: string | null;
	avatarUrl: string | null;
	coverUrl: string | null;
	bio: string | null;
	location: string | null;
}

export default function ProfilePage() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [bio, setBio] = useState('');
	const [location, setLocation] = useState('');
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
	const [coverUrl, setCoverUrl] = useState<string | null>(null);

	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		const fetchUserData = async () => {
			const token = localStorage.getItem('authToken');
			const headers: HeadersInit = {};
			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}

			try {
				const res = await fetch(`${API_BASE}/user/me`, {
					headers: headers,
				});
				if (!res.ok) {
					throw new Error('Failed to fetch user data');
				}
				const data: UserProfile = await res.json();

				setFirstName(data.firstName || '');
				setLastName(data.lastName || '');
				setEmail(data.email || '');
				setPhoneNumber(data.phoneNumber || '');
				setBio(data.bio || '');
				setLocation(data.location || '');
				setAvatarUrl(data.avatarUrl);
				setCoverUrl(data.coverUrl);
			} catch (error) {
				console.error(error);
				alert('Could not load profile data.');
			}
		};

		fetchUserData();
	}, []);

	const handleAccountSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const updatedData = {
			firstName,
			lastName,
			phoneNumber,
			bio,
			location,
			avatarUrl,
			coverUrl,
		};

		const token = localStorage.getItem('authToken');
		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		};
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		try {
			const res = await fetch(`${API_BASE}/user/update`, {
				method: 'PATCH',
				headers: headers,
				body: JSON.stringify(updatedData),
			});

			if (!res.ok) {
				throw new Error('Failed to update profile');
			}

			const data = await res.json();

			setFirstName(data.firstName || '');
			setLastName(data.lastName || '');
			setPhoneNumber(data.phoneNumber || '');
			setBio(data.bio || '');
			setLocation(data.location || '');
			setAvatarUrl(data.avatarUrl);
			setCoverUrl(data.coverUrl);

			alert('Account information updated successfully!');
		} catch (error) {
			console.error(error);
			alert('Failed to update profile.');
		}
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const newUrl = URL.createObjectURL(e.target.files[0]);
			setAvatarUrl(newUrl);
		}
	};

	const handlePasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (newPassword !== confirmPassword) {
			alert('New passwords do not match!');
			return;
		}

		const token = localStorage.getItem('authToken');
		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		};
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		try {
			const res = await fetch(`${API_BASE}/user/password-change`, {
				method: 'PATCH',
				headers: headers,
				body: JSON.stringify({
					CurrentPassword: currentPassword,
					NewPassword: newPassword,
				}),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.message || 'Failed to change password');
			}

			setCurrentPassword('');
			setNewPassword('');
			setConfirmPassword('');
			alert('Password changed successfully!');
		} catch (error) {
			console.error(error);
			alert('Failed to change password.');
		}
	};

	return (
		<div className="mx-auto mt-20 max-w-4xl px-4 py-10">
			<h1 className="mb-8 text-3xl font-bold">Profile Management</h1>

			<Tabs defaultValue="account" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="account">Account Information</TabsTrigger>
					<TabsTrigger value="password">Change Password</TabsTrigger>
				</TabsList>

				<TabsContent value="account">
					<AccountForm
						handleAccountSubmit={handleAccountSubmit}
						avatarUrl={avatarUrl}
						handleImageChange={handleImageChange}
						firstName={firstName}
						setFirstName={setFirstName}
						lastName={lastName}
						setLastName={setLastName}
						email={email}
						phoneNumber={phoneNumber}
						setPhoneNumber={setPhoneNumber}
						location={location}
						setLocation={setLocation}
						bio={bio}
						setBio={setBio}
					/>
				</TabsContent>

				<TabsContent value="password">
					<PasswordForm
						handlePasswordSubmit={handlePasswordSubmit}
						currentPassword={currentPassword}
						setCurrentPassword={setCurrentPassword}
						newPassword={newPassword}
						setNewPassword={setNewPassword}
						confirmPassword={confirmPassword}
						setConfirmPassword={setConfirmPassword}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
