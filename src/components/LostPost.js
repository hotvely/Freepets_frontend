const LostPost = ({ setRank3 }) => {
  const onChangeRank3 = (e) => {
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
          onChange={onChangeRank3}
        />
      </div>
    </div>
  );
};

export default LostPost;