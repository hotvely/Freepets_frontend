const NoticePost = ({ setTitle }) => {
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="input-rank">
      <div className="input-end">
        <input
          type="text"
          name="rank3"
          id="rank3"
          placeholder="제목을 입력해 주세요."
          onChange={onChangeTitle}
        />
      </div>
    </div>
  );
};

export default NoticePost;
