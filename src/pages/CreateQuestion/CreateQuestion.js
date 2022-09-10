import React from "react";
import axios from "axios";
import "./DetailQuestion.css";
import { TagsInput } from "react-tag-input-component";

function Question({ user }) {
  const [title, setTitle] = React.useState("");
  const [description, setdescription] = React.useState("");
  const [error, setError] = React.useState("");
  const [tags, setTags] = React.useState(["json"]);

  const onChangeTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  const onChangeQuestion = (e) => {
    const value = e.target.value;
    setdescription(value);
  };
  const submitForm = async (e) => {
 
    console.log(tags);
    e.preventDefault();

    try {
      const res = await axios({
        url: "http://localhost:8080/api/questions",
        method: "POST",
        data: { title, description, tags },
      });
      if (res.data.success) {
        alert("Create question successful");
        setTitle("");
        setdescription("");

      } else {
        setError(res.data.data);
      }
    } catch (err) {
      setError("loi roi");
    }
  };

 
  return (
    <div className="form__addQuestion">
      <form className="form__Question" onSubmit={(e) => e.preventDefault()}>
        <div className="header__Question">
          <h3>Title</h3>
          <input
            className="form-control"
            value={title}
            onChange={onChangeTitle}
            placeholder="Input your question"
          ></input>
        </div>
        <div className="body__Question">
          <h3>Question</h3>
          <p>
            Include all the information someone need to answer your question
          </p>
          <textarea
            className="text_area"
            value={description}
            onChange={onChangeQuestion}
            rows="5"
            cols="108"
          >
            Bạn đang xem tag html textarea, là text có thể nhập được văn bản, và
            có thể chứa rất nhiều dòng...
          </textarea>
        </div>
        <div className="footer__Question">
          <h3>Tags</h3>
          <p>add to tag</p>
          <TagsInput
        value={tags}
        onChange={setTags}
        name="fruits"
        placeHolder="enter fruits"
      />
          <button className="Add_Question" label="Add Question" onClick={submitForm}>
            <p>Add question</p>
          </button>
        </div>
      </form>
    </div>
  );
}
export default Question;
