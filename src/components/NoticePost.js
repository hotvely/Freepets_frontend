const NoticePost = ({ setTitle }) => {
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="input-rank">
      <div className="input-end">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="제목을 입력해 주세요."
          onChange={onChangeTitle}
        />
      </div>
    </div>
  );
};

export default NoticePost;
