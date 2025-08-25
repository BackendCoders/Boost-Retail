/** @format */

import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function DescriptionTab() {
	const [content, setContent] = useState('');

	return (
		<div className='p-4 bg-gray-100 rounded-lg border w-full'>
			<label className='block font-semibold mb-2'>Description</label>
			<Editor
				apiKey='your-tinymce-api-key' // free key from https://www.tiny.cloud
				value={content}
				onEditorChange={(newValue) => setContent(newValue)}
				init={{
					height: 400,
					menubar: false, // remove top menubar if you only want toolbar
					plugins: [
						'advlist autolink lists link image charmap preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table help wordcount',
					],
					toolbar: `
            undo redo | cut copy paste | formatselect | bold italic underline strikethrough |
            alignleft aligncenter alignright alignjustify |
            bullist numlist outdent indent | link image table |
            forecolor backcolor | removeformat | fullscreen | code
          `,
					toolbar_mode: 'wrap', // ensures toolbar wraps instead of overflowing
					content_style:
						'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
				}}
			/>
		</div>
	);
}
