'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users } from 'lucide-react';

export function TokenChat() {
	return (
		<Card className='bg-gray-800/50 border-gray-700'>
			<CardHeader className='pb-3'>
				<CardTitle className='text-white text-lg flex items-center'>
					<MessageCircle className='w-5 h-5 mr-2 text-green-400' />
					KRYPT chat
				</CardTitle>
				<div className='flex items-center text-sm text-gray-400'>
					<Users className='w-4 h-4 mr-1' />1 member
				</div>
			</CardHeader>
			<CardContent>
				<Button className='w-full bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'>
					Join chat
				</Button>
			</CardContent>
		</Card>
	);
}
