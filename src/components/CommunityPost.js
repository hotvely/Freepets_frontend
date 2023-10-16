const CommunityPost = ({ setRank3 }) => {
  const onChange = (e) => {
    setRank3(e.target.value);
  };
  return (
    <div className="input-rank">
      <div className="input-end">
        <input
          type="text"
          name="rank3"
          id="rank3"
          placeholder="제목을 입력해 주세요."
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CommunityPost;
