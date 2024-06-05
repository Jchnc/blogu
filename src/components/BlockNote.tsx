import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";

interface BlockNoteProps {
	onChange: (content: any) => void;
}

export const BlockNote: React.FC<BlockNoteProps> = ({ onChange }) => {
	const editor = useCreateBlockNote();
	const [documentContent, setDocumentContent] = useState<any>(null);

	const debouncedContent = useDebounce(documentContent, 1000);

	// Polling editor state as there's no `on` method for updates
	useEffect(() => {
		if (editor) {
			const interval = setInterval(async () => {
				// const content = editor.document;
				const content = await editor.blocksToHTMLLossy(editor.document);
				setDocumentContent(content);
			}, 500); // Poll every 500ms

			return () => {
				clearInterval(interval);
			};
		}
	}, [editor]);

	useEffect(() => {
		if (debouncedContent) {
			onChange(debouncedContent);
		}
	}, [debouncedContent, onChange]);

	return <BlockNoteView editor={editor} />;
};
