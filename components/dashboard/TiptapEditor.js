"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback } from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Link,
  Image,
} from "lucide-react";

const appleEase = [0.25, 0.1, 0.25, 1];

const MenuButton = ({ onClick, active, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`rounded-lg p-2 transition-all duration-200 ${
      active
        ? "bg-white/20 text-white shadow-sm"
        : "text-white/50 hover:bg-white/10 hover:text-white/80"
    }`}
  >
    {children}
  </button>
);

export default function TiptapEditor({ content, onChange, placeholder }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      ImageExtension.configure({
        inline: false,
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-[#2997FF] underline decoration-[#2997FF]/30 hover:decoration-[#2997FF]",
        },
      }),
      CodeBlockLowlight,
      Placeholder.configure({
        placeholder: placeholder || "Start writing... Type / for commands",
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[400px] px-1 py-2 text-[#E5E5E7] leading-relaxed text-[16px]",
      },
    },
  });

  const addLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl || "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter image URL:", "");
    if (url && url.trim()) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="rounded-2xl border border-white/[0.12] bg-[#1C1C1E] overflow-hidden transition-all duration-300 focus-within:border-white/20 focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-white/[0.08] bg-[#2C2C2E]/50 px-3 py-2">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </MenuButton>

        <div className="mx-1 h-5 w-px bg-white/[0.08]" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </MenuButton>

        <div className="mx-1 h-5 w-px bg-white/[0.08]" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered List"
        >
          <ListOrdered size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          <Quote size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code Block"
        >
          <Code size={16} />
        </MenuButton>

        <div className="mx-1 h-5 w-px bg-white/[0.08]" />

        <MenuButton onClick={addLink} active={editor.isActive("link")} title="Add Link">
          <Link size={16} />
        </MenuButton>
        <MenuButton onClick={addImage} active={false} title="Add Image">
          <Image size={16} />
        </MenuButton>

        <div className="mx-1 h-5 w-px bg-white/[0.08]" />

        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          active={false}
          title="Undo"
        >
          <Undo size={16} />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          active={false}
          title="Redo"
        >
          <Redo size={16} />
        </MenuButton>
      </div>

      {/* Editor Content */}
      <div className="px-4 py-3" dir="auto">
        <EditorContent editor={editor} />
      </div>

      {/* Character count */}
      <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-2 text-xs text-white/30">
        <span>
          {editor.storage.characterCount?.characters?.() || editor.getText().length} characters
        </span>
        <span className="text-white/20">
          Supports English & Bengali
        </span>
      </div>

      {/* Global styles for the editor */}
      <style jsx global>{`
        .tiptap p {
          margin: 0.5em 0;
        }
        .tiptap h1 {
          font-size: 1.8em;
          font-weight: 700;
          line-height: 1.2;
          margin: 0.8em 0 0.3em;
          color: #F5F5F7;
        }
        .tiptap h2 {
          font-size: 1.4em;
          font-weight: 700;
          line-height: 1.25;
          margin: 0.7em 0 0.3em;
          color: #F5F5F7;
        }
        .tiptap h3 {
          font-size: 1.15em;
          font-weight: 600;
          line-height: 1.3;
          margin: 0.6em 0 0.2em;
          color: #F5F5F7;
        }
        .tiptap ul,
        .tiptap ol {
          padding-left: 1.5em;
          margin: 0.5em 0;
        }
        .tiptap li {
          margin: 0.2em 0;
        }
        .tiptap blockquote {
          border-left: 3px solid #2997FF;
          padding-left: 1em;
          margin: 1em 0;
          color: #A1A1A6;
          font-style: italic;
        }
        .tiptap pre {
          background: #2C2C2E;
          border-radius: 12px;
          padding: 1em;
          margin: 1em 0;
          overflow-x: auto;
          font-family: "SF Mono", "Fira Code", monospace;
          font-size: 0.9em;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .tiptap code {
          background: #2C2C2E;
          border-radius: 4px;
          padding: 0.2em 0.4em;
          font-size: 0.9em;
          color: #FF6B6B;
        }
        .tiptap pre code {
          background: none;
          padding: 0;
          color: inherit;
        }
        .tiptap img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 1em 0;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .tiptap a {
          color: #2997FF;
          text-decoration: underline;
          text-decoration-color: rgba(41, 151, 255, 0.3);
          transition: text-decoration-color 0.2s;
        }
        .tiptap a:hover {
          text-decoration-color: #2997FF;
        }
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(255,255,255,0.2);
          pointer-events: none;
          height: 0;
        }
        /* Make editor responsive to Bengali text */
        .tiptap:lang(bn) {
          font-family: "Noto Sans Bengali", "Noto Sans", sans-serif;
        }
      `}</style>
    </div>
  );
}