const MessageSkeleton = () => {
	return (
		<>
			{/* Skeleton for a message from another user */}
			<div className='flex gap-3 items-center'>
				{/* Circular skeleton for the user's profile picture */}
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				
				{/* Skeleton for the message content */}
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
					<div className='skeleton h-4 w-40'></div>
				</div>
			</div>

			{/* Skeleton for a message from the current user */}
			<div className='flex gap-3 items-center justify-end'>
				{/* Skeleton for the message content */}
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
				</div>

				{/* Circular skeleton for the user's profile picture */}
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
			</div>
		</>
	);
};

export default MessageSkeleton;
