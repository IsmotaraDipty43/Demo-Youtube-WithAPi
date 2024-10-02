function getTimeString(time){
    const hour =parseInt( time/3600);
    let remainingS = time%3600;
    const min = parseInt (remainingS/60);
     remainingS = remainingS%60;
     return `${hour} hour ${min} minute ${remainingS} second ago`

}
console.log(getTimeString(7865));