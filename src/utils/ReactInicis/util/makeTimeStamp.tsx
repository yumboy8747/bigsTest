// 타임스탭프 제작
function MakeTimeStamp(){
  let newTimestamp = null;
  // @ts-ignore
  newTimestamp = + new Date();
  return newTimestamp;
}

export default MakeTimeStamp;