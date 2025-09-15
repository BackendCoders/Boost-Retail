/** @format */

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ImageReorder = ({ images, setImages }) => {
	const handleDragEnd = (result) => {
		if (!result.destination) return;

		const newImages = Array.from(images);
		const [movedImage] = newImages.splice(result.source.index, 1);
		newImages.splice(result.destination.index, 0, movedImage);

		setImages(newImages);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable
				droppableId='images'
				direction='horizontal'
			>
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className='grid grid-cols-5 gap-2'
					>
						{images.map((img, index) => (
							<Draggable
								key={img.id}
								draggableId={img.id}
								index={index}
							>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className='border rounded overflow-hidden flex items-center justify-center bg-light p-1'
									>
										<img
											src={img.url}
											alt={`thumb-${index}`}
											className='h-14 object-contain'
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default ImageReorder;
