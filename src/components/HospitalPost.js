const HospitalPost = ({setRank1, setRank2, setTitle}) => {

    const onChangeRank1 = (e) => {
        setRank1(e.target.value);
    }

    const onChangeRank2 = (e) => {
        setRank2(e.target.value);
    }

    const onChangeRank3 = (e) => {
        setTitle(e.target.value);
    }

    return (
        <div className="input-rank">
            <div className="input-center">
                <input type="text" name="rank1" id="rank1" placeholder="병원 이름을 입력해 주세요." onChange={onChangeRank1}/>
                <input type="text" name="rank2" id="rank2" placeholder="병원 주소를 입력해 주세요." onChange={onChangeRank2}/>
            </div>
            <div className="input-end">
                <input type="text" name="title" id="title" placeholder="제목을 입력해 주세요." onChange={onChangeRank3}/>
            </div>
        </div>
    )
}

export default HospitalPost;