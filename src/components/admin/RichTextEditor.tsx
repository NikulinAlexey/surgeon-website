"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Modal from "@/components/ui/Modal";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
}

export function RichTextEditor({ value, onChange, disabled = false, label = "Текст материала" }: RichTextEditorProps) {
  const [, setRevision] = useState(0);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("https://");
  const [linkError, setLinkError] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false, autolink: true })],
    content: value,
    immediatelyRender: false,
    editable: !disabled,
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
    onTransaction: () => setRevision((current) => current + 1),
    editorProps: { attributes: { class: "rich-text__content cms", "aria-label": label } },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);
  useEffect(() => { editor?.setEditable(!disabled); }, [disabled, editor]);

  const openLink = () => {
    if (!editor) return;
    setLinkUrl((editor.getAttributes("link").href as string | undefined) || "https://");
    setLinkError("");
    setLinkOpen(true);
  };

  const saveLink = () => {
    if (!editor) return;
    if (!linkUrl.trim()) editor.chain().focus().unsetLink().run();
    else if (!/^https?:\/\//i.test(linkUrl)) {
      setLinkError("Ссылка должна начинаться с http:// или https://");
      return;
    } else editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl.trim() }).run();
    setLinkOpen(false);
  };

  const buttonState = (name: string, attributes?: Record<string, unknown>) => ({
    className: editor?.isActive(name, attributes) ? "_active" : "",
    "aria-pressed": Boolean(editor?.isActive(name, attributes)),
  });

  return (
    <>
      <div className="rich-text">
        <div className="rich-text__toolbar" role="toolbar" aria-label="Форматирование текста">
          <button type="button" title="Жирный (Ctrl+B)" {...buttonState("bold")} onClick={() => editor?.chain().focus().toggleBold().run()} disabled={disabled || !editor}>Жирный</button>
          <button type="button" title="Курсив (Ctrl+I)" {...buttonState("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()} disabled={disabled || !editor}>Курсив</button>
          <button type="button" title="Заголовок второго уровня" {...buttonState("heading", { level: 2 })} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} disabled={disabled || !editor}>Заголовок</button>
          <button type="button" title="Маркированный список" {...buttonState("bulletList")} onClick={() => editor?.chain().focus().toggleBulletList().run()} disabled={disabled || !editor}>Список</button>
          <button type="button" title="Нумерованный список" {...buttonState("orderedList")} onClick={() => editor?.chain().focus().toggleOrderedList().run()} disabled={disabled || !editor}>Нумерация</button>
          <button type="button" title="Цитата" {...buttonState("blockquote")} onClick={() => editor?.chain().focus().toggleBlockquote().run()} disabled={disabled || !editor}>Цитата</button>
          <button type="button" title="Добавить или изменить ссылку" {...buttonState("link")} onClick={openLink} disabled={disabled || !editor}>Ссылка</button>
          <button type="button" title="Очистить форматирование" onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()} disabled={disabled || !editor}>Очистить</button>
          <span className="rich-text__separator" />
          <button type="button" title="Отменить (Ctrl+Z)" onClick={() => editor?.chain().focus().undo().run()} disabled={disabled || !editor || !editor.can().undo()}>Отменить</button>
          <button type="button" title="Повторить (Ctrl+Shift+Z)" onClick={() => editor?.chain().focus().redo().run()} disabled={disabled || !editor || !editor.can().redo()}>Повторить</button>
        </div>
        <EditorContent editor={editor} />
      </div>
      <Modal id="rich-text-link" title="Ссылка" description="Адрес ссылки для выделенного текста" isOpen={linkOpen} onModalClose={() => setLinkOpen(false)} initialFocusRef={linkInputRef}>
        <form className="admin-link-form" noValidate onSubmit={(event) => { event.preventDefault(); saveLink(); }}>
          <label><span>Адрес ссылки</span><input ref={linkInputRef} type="url" value={linkUrl} onChange={(event) => { setLinkUrl(event.target.value); setLinkError(""); }} placeholder="https://example.com" aria-invalid={Boolean(linkError)} aria-describedby={linkError ? "link-error" : undefined} /></label>
          {linkError && <p id="link-error" className="admin-field-error" role="alert">{linkError}</p>}
          <div className="admin-dialog__actions"><button type="button" className="admin-button" onClick={() => setLinkOpen(false)}>Отмена</button><button type="submit" className="admin-button admin-button--primary">Сохранить ссылку</button></div>
        </form>
      </Modal>
    </>
  );
}
