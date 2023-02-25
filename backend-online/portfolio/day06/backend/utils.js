export function getToday() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const today = `${yyyy}-${mm}-${dd}`;
  return today;
}

export function checkAllTrue(Obj) {
  let objName = {
    username: "이름",
    jumin1: "주민번호",
    jumin2: "주민번호",
    site: "좋아하는 사이트",
    pw: "비밀번호",
  };

  for (let key in Obj) {
    if (!key) {
      console.log(`${objName[key]} 입력란을 확인해주세요`);
      return false;
    }
    return true;
  }
}
