"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
}

export function RichTextEditor({ value, onChange, disabled = false, label = "Текст материала" }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false, autolink: true })],
    content: value,
    immediatelyRender: false,
    editable: !disabled,
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
    editorProps: { attributes: { class: "rich-text__content cms", "aria-label": label } },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);
  useEffect(() => { editor?.setEditable(!disabled); }, [disabled, editor]);

  const setLink = () => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const href = window.prompt("Адрес ссылки (https://…)", previous || "https://");
    if (href === null) return;
    if (!href.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    if (!/^https?:\/\//i.test(href)) {
      window.alert("Ссылка должна начинаться с http:// или https://");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  };

  return (
    <div className="rich-text">
      <div className="rich-text__toolbar" role="toolbar" aria-label="Форматирование текста">
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} disabled={disabled || !editor}>Жирный</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} disabled={disabled || !editor}>Курсив</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} disabled={disabled || !editor}>Заголовок</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} disabled={disabled || !editor}>Список</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} disabled={disabled || !editor}>Нумерация</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} disabled={disabled || !editor}>Цитата</button>
        <button type="button" onClick={setLink} disabled={disabled || !editor}>Ссылка</button>
        <button type="button" onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()} disabled={disabled || !editor}>Очистить формат</button>
        <span className="rich-text__separator" />
        <button type="button" onClick={() => editor?.chain().focus().undo().run()} disabled={disabled || !editor}>Отменить</button>
        <button type="button" onClick={() => editor?.chain().focus().redo().run()} disabled={disabled || !editor}>Повторить</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
