'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { API_BASE } from '@/lib/constants';

interface Category {
	id: string;
	name: string;
}

interface User {
	id: string;
	firstName: string;
}

async function fetchCategories(): Promise<Category[]> {
	const res = await fetch(`${API_BASE}/blog/category`);
	if (!res.ok) {
		throw new Error('Failed to fetch categories');
	}
	return res.json();
}

async function fetchUserId(): Promise<string> {
	const token = localStorage.getItem('authToken');
	if (!token) {
		throw new Error('Authentication token not found.');
	}

	const headers: HeadersInit = {
		Authorization: `Bearer ${token}`,
	};

	const res = await fetch(`${API_BASE}/user/me`, { headers });
	if (!res.ok) {
		throw new Error('Failed to fetch user ID');
	}
	const user: User = await res.json();
	return user.id;
}

export default function AddNewBlogPostPage() {
	const router = useRouter();

	const [title, setTitle] = useState('');
	const [summary, setSummary] = useState('');
	const [content, setContent] = useState('');
	const [language, setLanguage] = useState<string>('en');
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
	const [authorId, setAuthorId] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
	const [isAuthorLoading, setIsAuthorLoading] = useState(true);

	useEffect(() => {
		const loadInitialData = async () => {
			try {
				const [categoriesData, userId] = await Promise.all([
					fetchCategories(),
					fetchUserId(),
				]);
				setCategories(categoriesData);
				setAuthorId(userId);
			} catch (error) {
				console.error('Error loading initial data:', error);
				alert('Failed to load required data.');
			} finally {
				setIsCategoriesLoading(false);
				setIsAuthorLoading(false);
			}
		};
		loadInitialData();
	}, []);

	const handleCategoryChange = (categoryId: string, checked: boolean) => {
		setSelectedCategoryIds((prev) =>
			checked ? [...prev, categoryId] : prev.filter((id) => id !== categoryId)
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title || !content || !authorId) {
			alert(
				'Please fill in all required fields and ensure user data is loaded.'
			);
			return;
		}

		setIsLoading(true);

		const postData = {
			AuthorId: authorId,
			Title: title,
			Content: content,
			Summary: summary,
			Language: language,
		};

		try {
			const token = localStorage.getItem('authToken');
			const headers: HeadersInit = {
				'Content-Type': 'application/json',
			};

			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}

			const response = await fetch(`${API_BASE}/blog/add`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(postData),
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`API submission failed: ${errorText}`);
			}

			alert('Your blog post has been successfully submitted for approval!');
			router.push('/blog');
		} catch (error) {
			console.error('Error publishing post:', error);
			alert(
				`Publishing failed. Please try again. ${
					error instanceof Error ? error.message : ''
				}`
			);
		} finally {
			setIsLoading(false);
		}
	};

	const isFormDisabled = isLoading || isAuthorLoading;

	return (
		<div className="mx-auto max-w-4xl mt-16 px-6 py-10">
			<h1 className="mb-8 text-4xl font-extrabold text-gray-900">
				Create New Blog Post
			</h1>

			<Card>
				<CardHeader>
					<CardTitle>Post Details</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid gap-2">
							<Label htmlFor="postTitle">Title *</Label>
							<Input
								id="postTitle"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
								disabled={isFormDisabled}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="summary">
								Short Summary (Optional, Max 150 Characters)
							</Label>
							<Textarea
								id="summary"
								rows={2}
								value={summary}
								onChange={(e) => setSummary(e.target.value)}
								maxLength={150}
								disabled={isFormDisabled}
							/>
						</div>

						<div className="grid gap-4 sm:grid-cols-2">
							<div className="grid gap-2">
								<Label>Category</Label>
								{isCategoriesLoading ? (
									<p className="text-sm text-gray-500">Loading categories...</p>
								) : (
									<div className="flex flex-wrap gap-x-4 gap-y-2 p-2 border rounded-md max-h-32 overflow-y-auto">
										{categories.map((category) => (
											<div
												key={category.id}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={`cat-${category.id}`}
													checked={selectedCategoryIds.includes(category.id)}
													onCheckedChange={(checked) =>
														handleCategoryChange(category.id, !!checked)
													}
													disabled={isFormDisabled}
												/>
												<Label
													htmlFor={`cat-${category.id}`}
													className="font-normal cursor-pointer"
												>
													{category.name}
												</Label>
											</div>
										))}
									</div>
								)}
							</div>
							<div className="grid gap-2">
								<Label htmlFor="language">Language</Label>
								<Select
									onValueChange={setLanguage}
									defaultValue={language}
									disabled={isFormDisabled}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select Language" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="en">English</SelectItem>
										<SelectItem value="tr">Turkish</SelectItem>
										<SelectItem value="de">German</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="postContent">Content *</Label>
							<Textarea
								id="postContent"
								rows={15}
								value={content}
								onChange={(e) => setContent(e.target.value)}
								required
								disabled={isFormDisabled}
							/>
						</div>

						<Button type="submit" className="w-full" disabled={isFormDisabled}>
							{isLoading
								? 'Publishing...'
								: isAuthorLoading
								? 'Loading User...'
								: 'Publish Post'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
