


export function getInitials(strin:string){
    const splitt= strin.split(" ");
    let first=splitt[0][0], second=splitt[1][0];
    let initials=first + second
    return initials;
}