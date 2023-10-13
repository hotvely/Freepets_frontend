const HospitalPost = (rank1, rank2, rank3) => {
    return (
        <div className="input-rank">
            <div className="input-center">
                <input type="text" name="rank1" id="rank1" placeholder="병원 이름을 입력해 주세요."/>
                <input type="text" name="rank2" id="rank2" placeholder="병원 주소를 입력해 주세요."/>
            </div>
            <div className="input-end">
                <input type="text" name="rank3" id="rank3" placeholder="제목을 입력해 주세요."/>
            </div>
        </div>
    )
}

export default HospitalPost;