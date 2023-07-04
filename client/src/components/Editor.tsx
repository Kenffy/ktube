import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

const formats = [
  "bold",
  "italic",
  "underline",
  "blockquote",
  "list",
  "bullet",
  "link",
];

type editorProps = {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
};

export const Editor = ({ body, setBody }: editorProps) => {
  return (
    <div className="editor_ctn">
      <ReactQuill
        className="rq_editor"
        theme="snow"
        value={body}
        placeholder="Enter your text here."
        modules={modules}
        formats={formats}
        onChange={setBody}
      />
    </div>
  );
};
